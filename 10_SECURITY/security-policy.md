---
title: Security Policy
type: system
status: active
tags: [security, policy, hitl, governance]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[AGENTS.md]]"
---

# Security Policy — 0x Vaults

All agents must abide by this policy before any read or write operation in the vault.

## Rule 1 — Human in the Loop (HITL)

**No agent may edit, write, create, patch, or delete any file in this vault without explicit user approval first.**

### What requires approval

|| Action | Approval Required ||
||--------|-------------------||
|| Create a new note | ✅ Yes ||
|| Edit or patch an existing note | ✅ Yes ||
|| Delete a note | ✅ Yes ||
|| Move or rename a note | ✅ Yes ||
|| Update frontmatter | ✅ Yes ||
|| Add or remove wikilinks | ✅ Yes ||
|| **`git commit`** | ✅ Yes — user must approve before every commit ||
|| **`git push`** | ✅ Yes — user must approve before every push to remote ||
|| Read-only access | ❌ No (agents may read freely) ||
|| Save an incident log or security alert to [[06_LOGS]] or [[10_SECURITY]] | ✅ Yes ||
|| **Post-push log report** | ✅ Yes — after every push, a session log must be written to [[06_LOGS]] ||

### Approval workflow

1. **Agent proposes** — states exactly what file(s) will change and what the change is.
2. **User reviews** — approves, rejects, or requests changes.
3. **Agent executes** — only after explicit "approve" or "go ahead" from the user.
4. **Agent logs** — writes the approved change to `06_LOGS/` with the approval reference.

## Rule 2 — No Silent Edits

Every vault modification must be:
- Pre-approved by the user
- Documented in `06_LOGS/`
- Reflected in `00_INDEX.md` if a new note is created

## Rule 3 — Identity & Access

- All agents operate under their identity note in `01_IDENTITY/agents/`
- Agents must read `AGENTS.md` and this policy before acting
- Direct file read/write on disk — no middleware bypasses this rule

### HITL Gate (technical enforcement)

Git operations are enforced by local hooks in `.githooks/`:

- **`.githooks/pre-commit`** — runs `scripts/hitl-gate.sh commit <approval-file>` before every commit
- **`.githooks/pre-push`** — runs `scripts/hitl-gate.sh push <approval-file>` before every push

Each gate requires a valid approval file under `10_SECURITY/hitl-approvals/` that records:
- `approver` — who approved (e.g. `user`)
- `action` — `commit` or `push` (must match the operation)
- `timestamp` — when approval was given
- `files` — which files or scope
- `source` — where approval was given (e.g. `chat`)

Without a valid approval file, the git operation is blocked (exit 1).

To enable hooks locally:

```bash
cp .githooks/pre-commit .git/hooks/pre-commit
cp .githooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-commit .git/hooks/pre-push
```

### Policy enforcement (agent-level)

Any agent that writes to the vault without prior user approval is in violation of this policy. Corrections are logged in `06_LOGS/` and reported to the user.

## Rule 4 — Tool Readiness Before Vault Entry

No tool, skill, plugin, or external service may be added to any vault catalog (`09_TOOLS/`, `08_SKILLS/`, `[[09_TOOLS/plugins]]`) until all of the following are confirmed:

1. **Tool Picking Evaluation** — `[[07_TEMPLATES/tool-picking]]` completed with decision `ADOPT`
2. **Machine Runnable** — confirmed installable and runnable on this Windows 11 machine
3. **API / Credential** — API key available, or tool is free/no-key required
4. **Working Smoke Test** — a minimal real command has been run and output captured (see `[[07_TEMPLATES/tool-integration]]`)
5. **HITL Approval** — user approval recorded under `[[10_SECURITY/hitl-approvals/]]` for adding the tool to the vault

### Tool Readiness States

| State | Meaning | Can Enter Vault? |
|-------|---------|------------------|
| `pending` | Picked but not yet installed/tested | ❌ No |
| `verified` | Installed, smoke-tested, working on this machine | ✅ Yes |
| `deprecated` | No longer works or has been removed | ❌ No |

Every tool note under `09_TOOLS/` must carry a `readiness` field reflecting its current state.

## Rule 5 — No Silent Tool Adds

Tools must not be added to catalogs, indexes, or skill folders without:
- A completed tool picking evaluation
- A passing smoke test on this machine
- A HITL approval file
- An entry in the session log (`06_LOGS/`)

## Links

- [[00_INDEX]]
- [[AGENTS.md]]
- [[06_LOGS]]

---