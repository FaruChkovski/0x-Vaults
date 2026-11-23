---
title: HITL Approval Records
type: system
status: active
tags: [security, hitl, approvals, audit]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[10_SECURITY/security-policy]]"
  - "[[AGENTS.md]]"
---

# HITL Approval Records

## Purpose

Stored record of every human approval for `git commit` and `git push` operations in the 0x Vaults repo. Each approval is a file in this directory that the `scripts/hitl-gate.sh` gate verifies before allowing the git operation to proceed.

## Approval File Format

Each approval file must contain:

```yaml
approver: user
action: commit          # or: push
timestamp: 2026-11-23 HH:MM:SS
files: <file paths or "all">
source: chat            # where the approval was given
```

## Workflow

1. **Agent proposes** — states which files will change and what the operation is
2. **User approves** — user says "yes" / "approve" / "go ahead" in chat
3. **Agent creates approval file** — writes a file under `10_SECURITY/hitl-approvals/` recording the approval
4. **Gate enforces** — `scripts/hitl-gate.sh` verifies the approval file before `git commit` or `git push` proceeds
5. **Agent logs** — writes the approved change to `06_LOGS/` with the approval reference

## Enforcement

Git hooks (`.githooks/pre-commit` and `.githooks/pre-push`) invoke `scripts/hitl-gate.sh` before each operation. Without a valid approval file, the operation is blocked.

To enable hooks locally:

```bash
cp .githooks/pre-commit .git/hooks/pre-commit
cp .githooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-commit .git/hooks/pre-push
```

## Links

- [[00_INDEX]]
- [[10_SECURITY/security-policy]]
- [[AGENTS.md]]
- [[scripts/hitl-gate.sh]]

---
