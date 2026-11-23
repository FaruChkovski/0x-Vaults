#!/bin/bash
# =============================================================================
# HITL Gate — Human-in-the-Loop approval validator for git commit/push
# =============================================================================
# Usage: scripts/hitl-gate.sh <commit|push> <approval-file-path>
#
# Validates that an approval file exists under 10_SECURITY/hitl-approvals/
# with the required fields and matching action. Exits 0 if approved,
# exits 1 if blocked.
#
# Approval file format (JSON):
#   {
#     "approver": "user",
#     "action": "commit",           # or "push"
#     "timestamp": "2026-11-24T00:00:00Z",
#     "files": "02_PROJECTS/elonas-toys-website/app.js",
#     "source": "chat"
#   }
# =============================================================================

set -euo pipefail

ACTION="${1:-}"
APPROVAL_FILE="${2:-}"

if [ -z "$ACTION" ] || [ -z "$APPROVAL_FILE" ]; then
  echo "HITL GATE ERROR: Usage: hitl-gate.sh <commit|push> <approval-file>"
  exit 1
fi

if [ "$ACTION" != "commit" ] && [ "$ACTION" != "push" ]; then
  echo "HITL GATE ERROR: Invalid action '$ACTION'. Must be 'commit' or 'push'."
  exit 1
fi

if [ ! -f "$APPROVAL_FILE" ]; then
  echo "HITL GATE ERROR: Approval file not found: $APPROVAL_FILE"
  echo "HITL GATE: Create a valid approval file under 10_SECURITY/hitl-approvals/ first."
  exit 1
fi

# Check required fields exist in the approval file
for field in approver action timestamp files source; do
  if ! grep -q "\"$field\"" "$APPROVAL_FILE" 2>/dev/null; then
    echo "HITL GATE ERROR: Approval file missing required field: $field"
    exit 1
  fi
done

# Extract and validate action matches
FILE_ACTION=$(grep -o '"action"[[:space:]]*:[[:space:]]*"[^"]*"' "$APPROVAL_FILE" 2>/dev/null | head -1 | sed 's/.*"action"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')
if [ "$FILE_ACTION" != "$ACTION" ]; then
  echo "HITL GATE ERROR: Approval action '$FILE_ACTION' does not match requested action '$ACTION'."
  exit 1
fi

APPROVER=$(grep -o '"approver"[[:space:]]*:[[:space:]]*"[^"]*"' "$APPROVAL_FILE" 2>/dev/null | head -1 | sed 's/.*"approver"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')
SOURCE=$(grep -o '"source"[[:space:]]*:[[:space:]]*"[^"]*"' "$APPROVAL_FILE" 2>/dev/null | head -1 | sed 's/.*"source"[[:space:]]*:[[:space:]]*"//' | sed 's/"$//')

echo "HITL GATE: APPROVED"
echo "HITL GATE:   approver : $APPROVER"
echo "HITL GATE:   action   : $ACTION"
echo "HITL GATE:   source   : $SOURCE"
echo "HITL GATE:   file     : $APPROVAL_FILE"

exit 0
