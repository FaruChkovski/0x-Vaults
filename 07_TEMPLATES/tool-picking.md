---
title: Tool Picking Template
type: template
status: active
tags: [template, tool-picking, evaluation, readiness]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[07_TEMPLATES]]"
  - "[[09_TOOLS]]"
  - "[[10_SECURITY/security-policy]]"
---

# Tool Picking Template

## Purpose

Evaluate a candidate tool/skill/plugin **before** it is added to the vault. Every tool must be confirmed as runnable on this machine, have its API/credentials confirmed (or be free/no-key), and be set up and working before it enters the vault catalog.

## Naming Convention

`tool-picking-<tool-name>.md` — saved in `06_LOGS/` or `09_TOOLS/` during evaluation, then referenced from the tool catalog.

## 1. Tool Identification

| Field | Value |
|-------|-------|
| Tool Name | `<name>` |
| Type | `skill` | `external-plugin` | `cli-tool` | `web-service` | `obsidian-plugin` |
| Source | `<repo URL or package name>` |
| License | `<MIT / Apache 2.0 / proprietary / ...>` |
| Evaluated By | hermes |
| Evaluation Date | `YYYY-MM-DD` |

## 2. Machine Runnable Check

| Check | Question | Result (pass/fail/na) | Evidence |
|-------|----------|----------------------|----------|
| OS compatibility | Does it run on Windows 11? | | |
| Runtime available | Python/Node/etc. installed and version matches? | | |
| Hardware required | GPU/VRAM/RAM/disk within this machine's limits? | | |
| Install path | Where will it be installed? | | |
| Install command | Exact command to install | | |

**Machine Runnable Verdict:** `<pass / fail>`

## 3. API / Credential Check

| Check | Question | Result (pass/fail/na) | Evidence |
|-------|----------|----------------------|----------|
| API key required | Does the tool need an API key/token? | | |
| Credential configured | Is the key already set up on this machine? | | |
| Env var name | Which env var holds the credential? | | |
| Free tier available | Is there a no-cost tier that suffices? | | |
| Paid required | Is payment required for the intended use? | | |

**API/Credential Verdict:** `<pass / fail / free / paid>`

## 4. Functional Test

| Test | Step | Result (pass/fail) | Output captured |
|------|------|-------------------|-----------------|
| Install | Run install command | | |
| Version check | `<tool> --version` returns expected version | | |
| Smoke test | Run a minimal real command | | |
| Output | Tool produces expected output on disk or stdout | | |

**Functional Verdict:** `<pass / fail>`

## 5. Integration Decision

| Question | Answer |
|----------|--------|
| Can this machine run it? | `<yes / no>` |
| Are credentials/API available (or is it free)? | `<yes / no / n/a>` |
| Is it set up and working? | `<yes / no>` |
| Should it enter the vault? | `<yes / no>` |
| Reason | `<one sentence>` |

**Decision:** `<ADOPT / REJECT / HOLD>`

- `<ADOPT>` — all checks pass, proceed to tool integration template
- `<REJECT>` — does not meet requirements, do not add to vault
- `<HOLD>` — missing dependency or credential, revisit later

## Links

- [[00_INDEX]]
- [[07_TEMPLATES]]
- [[09_TOOLS]]
- [[10_SECURITY/security-policy]]

---
