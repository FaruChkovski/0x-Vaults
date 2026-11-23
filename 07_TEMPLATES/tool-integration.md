---
title: Tool Integration Template
type: template
status: active
tags: [template, tool-integration, setup, readiness]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[07_TEMPLATES]]"
  - "[[09_TOOLS]]"
  - "[[10_SECURITY/security-policy]]"
---

# Tool Integration Template

## Purpose

Standard clean structure for integrating a new tool, skill, or plugin into the vault. A tool **must not** be added to any vault catalog until:

1. A tool picking evaluation passes (see `[[07_TEMPLATES/tool-picking]]`)
2. The tool is installed and set up on this machine
3. A working smoke test has been run and its output captured
4. HITL approval has been obtained for adding it to the vault

## Integration Steps (in order)

### Step 1 — Tool Picking Evaluation

Complete `[[07_TEMPLATES/tool-picking]]` and record the decision.

- **Decision:** `<ADOPT / REJECT / HOLD>`
- **Evaluation file:** `[[<path-to-picking-eval>]]`

If decision is not `ADOPT`, stop here.

### Step 2 — Install and Set Up

Record the exact install commands and paths used:

| Field | Value |
|-------|-------|
| Install command | `<exact command>` |
| Install path | `<where it was installed>` |
| Config files created | `<paths>` |
| Env vars set | `<VAR_NAME>=<value>` |

### Step 3 — Smoke Test

Run a minimal real command and capture the output:

| Test | Command | Expected Output | Actual Output | Pass/Fail |
|------|---------|-----------------|---------------|-----------|
| Version | `<tool> --version` | | | |
| Smoke | `<minimal real command>` | | | |

Attach screenshot or copy output if available.

**Smoke Test Verdict:** `<pass / fail>`

If fail, do not proceed.

### Step 4 — HITL Approval

Create an approval file under `[[10_SECURITY/hitl-approvals/]]`:

| Field | Value |
|-------|-------|
| Approver | user |
| Action | tool-integration |
| Tool | `<tool-name>` |
| Timestamp | `<YYYY-MM-DD HH:MM:SS>` |
| Source | chat |

Approval file: `[[<path-to-approval>]]`

### Step 5 — Add to Vault Catalog

Only after all previous steps pass:

- Add entry to `[[09_TOOLS/catalog]]` (or `[[09_TOOLS/plugins]]` for external plugins)
- Create tool note under `[[09_TOOLS/]]` using this template's structure
- Link from `[[00_INDEX]]` if a new top-level note is created
- Document the integration in `[[06_LOGS/]]`

## Tool Note Structure

When creating a tool note under `09_TOOLS/`, use this frontmatter:

```yaml
---
title: "<Tool Name>"
type: tool
status: active
tags: [tool, <domain>, <runtime>]
last_updated: "YYYY-MM-DD"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[09_TOOLS]]"
  - "[[10_SECURITY/security-policy]]"
---
```

Required sections:
- **Purpose** — what the tool does
- **Install** — exact install command + path
- **Configure** — env vars, config files, credentials
- **Invoke** — how agents call it (terminal command, Hermes tool, etc.)
- **Smoke Test** — last known working command + output
- **Readiness** — `verified: yes` with date, or `pending`
- **Links** — `[[00_INDEX]]`, `[[09_TOOLS]]`, `[[10_SECURITY/security-policy]]`

## Readiness States

| State | Meaning |
|-------|---------|
| `pending` | Tool picked but not yet installed/tested |
| `verified` | Tool installed, smoke-tested, and working on this machine |
| `deprecated` | Tool no longer works or has been removed |

## Links

- [[00_INDEX]]
- [[07_TEMPLATES]]
- [[09_TOOLS]]
- [[10_SECURITY/security-policy]]

---
