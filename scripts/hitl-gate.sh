#!/usr/bin/env bash
# HITL Gate — blocks git commit/push without a recorded human approval.
#
# Usage:
#   scripts/hitl-gate.sh <commit|push> <approval-reference>
#
# An approval reference is the path to a file under
# 10_SECURITY/hitl-approvals/ that records:
#   - approver: who approved (e.g. "user")
#   - action: what was approved (e.g. "git commit" or "git push")
#   - files: which files or operation scope
#   - timestamp: when approval was given
#   - source: where approval came from (e.g. "chat", "hmit interface")
#
# The gate succeeds only if:
#   1. The approval reference file exists under 10_SECURITY/hitl-approvals/
#   2. Its `action` matches the requested operation (commit or push)
#   3. It has a non-empty `approver` and `timestamp`
#
# On success it exits 0 and the git operation proceeds.
# On failure it prints a message and exits 1, blocking the operation.

set -euo pipefail

OPERATION="${1:-}"
APPROVAL_REF="${2:-}"
HITL_DIR="10_SECURITY/hitl-approvals"

if [[ -z "$OPERATION" ]]; then
  echo "HITL GATE: missing operation (commit|push)" >&2
  exit 1
fi

if [[ "$OPERATION" != "commit" && "$OPERATION" != "push" ]]; then
  echo "HITL GATE: invalid operation '$OPERATION' (use commit or push)" >&2
  exit 1
fi

if [[ -z "$APPROVAL_REF" ]]; then
  echo "HITL GATE: no approval reference provided for $OPERATION" >&2
  echo "  Provide a path under $HITL_DIR/ as the second argument." >&2
  exit 1
fi

# Normalize: approval ref must live under the hitl-approvals dir
case "$APPROVAL_REF" in
  "$HITL_DIR"/*|"$HITL_DIR")
    ;;
  *)
    echo "HITL GATE: approval reference '$APPROVAL_REF' is not under $HITL_DIR/" >&2
    exit 1
    ;;
esac

if [[ ! -f "$APPROVAL_REF" ]]; then
  echo "HITL GATE: approval file not found: $APPROVAL_REF" >&2
  echo "  Create it under $HITL_DIR/ before running $OPERATION." >&2
  exit 1
fi

# Parse simple key: value fields from the approval file
approver=$(grep -i '^approver:' "$APPROVAL_REF" | head -1 | sed 's/^[^:]*:[[:space:]]*//' | tr -d '"')
action=$(grep -i '^action:' "$APPROVAL_REF" | head -1 | sed 's/^[^:]*:[[:space:]]*//' | tr -d '"')
timestamp=$(grep -i '^timestamp:' "$APPROVAL_REF" | head -1 | sed 's/^[^:]*:[[:space:]]*//' | tr -d '"')

if [[ -z "$approver" ]]; then
  echo "HITL GATE: approval file missing 'approver': $APPROVAL_REF" >&2
  exit 1
fi

if [[ -z "$action" ]]; then
  echo "HITL GATE: approval file missing 'action': $APPROVAL_REF" >&2
  exit 1
fi

if [[ -z "$timestamp" ]]; then
  echo "HITL GATE: approval file missing 'timestamp': $APPROVAL_REF" >&2
  exit 1
fi

if [[ "$action" != "$OPERATION" ]]; then
  echo "HITL GATE: approval is for '$action', not '$OPERATION': $APPROVAL_REF" >&2
  exit 1
fi

echo "HITL GATE: approved by '$approver' at $timestamp for $OPERATION ($APPROVAL_REF)"
exit 0
