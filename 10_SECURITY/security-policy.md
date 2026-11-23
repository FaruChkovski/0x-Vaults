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

## Enforcement

Any agent that writes to the vault without prior user approval is in violation of this policy. Corrections are logged in `06_LOGS/` and reported to the user.

## Links

- [[00_INDEX]]
- [[AGENTS.md]]
- [[06_LOGS]]

---