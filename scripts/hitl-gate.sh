#!/usr/bin/env bash
# HITL Gate — nonce-based challenge/response system for git commit and push.
#
# Two modes:
#
#   1. hitl-gate.sh challenge <commit|push>
#      Generates a one-time nonce, writes a pending challenge file under
#      10_SECURITY/hitl-approvals/pending/, prints the nonce to stdout.
#      The agent presents this nonce to the user in chat and waits for
#      explicit confirmation ("approve", "go ahead", etc.).
#
#   2. hitl-gate.sh verify <commit|push> <approval-file>
#      Verifies that the approval file:
#        * exists under 10_SECURITY/hitl-approvals/
#        * action matches the requested operation (commit|push)
#        * approver is "user" (not the agent)
#        * status is "approved"
#        * nonce matches a pending, unused challenge
#      On success: marks the nonce as used, exits 0.
#      On failure: prints error, exits 1 (git hook blocks the operation).
#
# The git hooks (.githooks/pre-commit, .githooks/pre-push) call "verify"
# with the HITL_APPROVAL environment variable. They never call "challenge".
#
# Workflow:
#   1. Agent runs:  scripts/hitl-gate.sh challenge commit   → gets nonce ABC123
#   2. Agent asks user in chat: "Commit HITL nonce ABC123 — approve?"
#   3. User says "approve" (or similar) in chat
#   4. Agent writes approval file with approver=user, status=approved, nonce=ABC123
#   5. Agent runs:  HITL_APPROVAL=<file> git commit -m "..."   → gate verifies, commit proceeds
#
# The agent CANNOT self-approve: it can create pending challenges, but it
# cannot mark them "approved" without the user confirming the nonce in chat.

set -euo pipefail

MODE="${1:-}"
HITL_DIR="10_SECURITY/hitl-approvals"
PENDING_DIR="${HITL_DIR}/pending"
USED_DIR="${HITL_DIR}/used"

mkdir -p "$PENDING_DIR" "$USED_DIR"

now() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }
gen_nonce() { date -u +"%s%N" | sha256sum | cut -c1-16; }

# Parse a simple key: value field from a file
get_field() {
  local file="$1" key="$2"
  grep -i "^${key}:" "$file" 2>/dev/null | head -1 | sed 's/^[^:]*:[[:space:]]*//' | tr -d '"' | tr -d "'"
}

case "$MODE" in

  challenge)
    OPERATION="${2:-}"
    if [[ "$OPERATION" != "commit" && "$OPERATION" != "push" ]]; then
      echo "HITL CHALLENGE: usage: $0 challenge <commit|push>" >&2
      exit 1
    fi

    NONCE="$(gen_nonce)"
    CHALLENGE_FILE="${PENDING_DIR}/${OPERATION}-${NONCE}.json"

    cat > "$CHALLENGE_FILE" <<TXT
operation: ${OPERATION}
nonce: ${NONCE}
status: pending
created_at: $(now)
used: false
TXT

    echo "HITL_CHALLENGE: ${OPERATION}"
    echo "NONCE: ${NONCE}"
    echo "FILE: ${CHALLENGE_FILE}"
    echo ""
    echo "Present this nonce to the user in chat and wait for explicit confirmation."
    echo "After the user confirms, write an approval file with approver=user, status=approved, nonce=${NONCE}"
    echo "Then run: HITL_APPROVAL=<approval-file> git commit/push"
    ;;

  verify)
    OPERATION="${2:-}"
    APPROVAL_REF="${3:-}"

    if [[ "$OPERATION" != "commit" && "$OPERATION" != "push" ]]; then
      echo "HITL VERIFY: usage: $0 verify <commit|push> <approval-file>" >&2
      exit 1
    fi

    if [[ -z "$APPROVAL_REF" ]]; then
      echo "HITL VERIFY BLOCKED: no approval reference provided." >&2
      echo "  Set HITL_APPROVAL=<approval-file> before git commit/push." >&2
      exit 1
    fi

    case "$APPROVAL_REF" in
      "$HITL_DIR"/*|"$HITL_DIR") ;;
      *)
        echo "HITL VERIFY BLOCKED: approval reference '$APPROVAL_REF' is not under $HITL_DIR/" >&2
        exit 1
        ;;
    esac

    if [[ ! -f "$APPROVAL_REF" ]]; then
      echo "HITL VERIFY BLOCKED: approval file not found: $APPROVAL_REF" >&2
      exit 1
    fi

    APPROVER="$(get_field "$APPROVAL_REF" approver)"
    ACTION="$(get_field "$APPROVAL_REF" action)"
    STATUS="$(get_field "$APPROVAL_REF" status)"
    NONCE="$(get_field "$APPROVAL_REF" nonce)"

    if [[ -z "$APPROVER" ]]; then
      echo "HITL VERIFY BLOCKED: approval file missing 'approver': $APPROVAL_REF" >&2
      exit 1
    fi

    if [[ "$APPROVER" != "user" ]]; then
      echo "HITL VERIFY BLOCKED: approver is '$APPROVER', must be 'user': $APPROVAL_REF" >&2
      exit 1
    fi

    if [[ -z "$ACTION" ]]; then
      echo "HITL VERIFY BLOCKED: approval file missing 'action': $APPROVAL_REF" >&2
      exit 1
    fi

    if [[ "$ACTION" != "$OPERATION" ]]; then
      echo "HITL VERIFY BLOCKED: approval is for '$ACTION', not '$OPERATION': $APPROVAL_REF" >&2
      exit 1
    fi

    if [[ "$STATUS" != "approved" ]]; then
      echo "HITL VERIFY BLOCKED: status is '$STATUS', must be 'approved': $APPROVAL_REF" >&2
      exit 1
    fi

    if [[ -z "$NONCE" ]]; then
      echo "HITL VERIFY BLOCKED: approval file missing 'nonce': $APPROVAL_REF" >&2
      exit 1
    fi

    # Find the pending challenge matching this nonce and operation
    CHALLENGE_FILE="${PENDING_DIR}/${OPERATION}-${NONCE}.json"
    if [[ ! -f "$CHALLENGE_FILE" ]]; then
      echo "HITL VERIFY BLOCKED: no pending challenge for nonce '${NONCE}' and operation '${OPERATION}'" >&2
      echo "  The user must confirm this nonce in chat before the agent creates the approval." >&2
      exit 1
    fi

    CHALLENGE_STATUS="$(get_field "$CHALLENGE_FILE" status)"
    CHALLENGE_USED="$(get_field "$CHALLENGE_FILE" used)"

    if [[ "$CHALLENGE_STATUS" != "pending" ]]; then
      echo "HITL VERIFY BLOCKED: challenge nonce '${NONCE}' is not pending (status: ${CHALLENGE_STATUS})" >&2
      exit 1
    fi

    if [[ "$CHALLENGE_USED" == "true" ]]; then
      echo "HITL VERIFY BLOCKED: challenge nonce '${NONCE}' has already been used" >&2
      exit 1
    fi

    # Mark the challenge as used (consume the nonce)
    sed -i 's/^used: false$/used: true/' "$CHALLENGE_FILE"
    sed -i 's/^status: pending$/status: consumed/' "$CHALLENGE_FILE"
    mv "$CHALLENGE_FILE" "${USED_DIR}/${OPERATION}-${NONCE}.json" 2>/dev/null || true

    echo "HITL VERIFY: approved by user at $(now) for $OPERATION (nonce: ${NONCE}, file: $APPROVAL_REF)"
    exit 0
    ;;

  *)
    echo "HITL GATE: usage: $0 <challenge|verify> ..." >&2
    exit 1
    ;;
esac
