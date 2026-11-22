# AGENTS.md — Cross-Agent Read/Write Rules

Mandatory read for every agent before any read or write operation in this vault.

## Core Principles

1. **One shared brain.** All agents read from and write to the same vault. No siloed context.
2. **Human in the Loop (HITL).** No agent may create, edit, patch, delete, move, or rename any file in this vault without explicit user approval first. Read-only access requires no approval.
3. **Context Accounting & Execution Logging.** Before acting, every agent must count all loaded context files (chars, words, tokens) and, after acting, write a full execution report to `[[06_LOGS]]` using `[[07_TEMPLATES/agent-log-template]]`. Token usage must be measured via API telemetry (`usage.prompt_tokens` / `usage.completion_tokens`) or a named tokenizer (e.g., `cl100k_base`, `o200k_base`) — never guessed or left as `0`.
   - **Backfill Rule:** `tokens_output` must be filled in as the agent's final tool call after the response is generated, and `tokens_total` recomputed as `tokens_input + tokens_output`.
4. **Read before acting.** Always read [[00_INDEX]], your agent identity, and relevant notes before starting a task.
5. **Write back after acting.** Every session ends with a log entry in [[06_LOGS]] and updates to any affected notes.
6. **Frontmatter required.** Every note must carry the standard YAML frontmatter (see [[00_INDEX]]).
7. **Wikilinks only.** Use `[[wikilinks]]` for all internal references. No bare paths.
8. **No duplicates.** Before creating a new note, search existing notes. Link instead of duplicating.

## Security Policy

All agents must also abide by [[10_SECURITY/security-policy]], which defines the HITL approval workflow, what actions require user sign-off, and enforcement rules.

## Approval Workflow (HITL)

```
1. Agent proposes — states exactly which file(s) will change and what the change is
2. User reviews — approves, rejects, or requests changes
3. Agent executes — only after explicit "approve" or "go ahead" from the user
4. Agent logs — writes the approved change to [[06_LOGS]] with the approval reference
```

## Agent Workflow

```
1. Read [[00_INDEX]] for orientation
2. Read [[01_IDENTITY/user]] for global user context
3. Read your agent note under [[01_IDENTITY/agents/]]
4. Pull a skill from [[08_SKILLS]] and/or tool from [[09_TOOLS]] as needed
5. Execute the task
6. Write session log to [[06_LOGS]]
7. Update any affected notes (frontmatter, links, status)
```

## Skill & Tool Usage

- **Skills** (`08_SKILLS/`): Reusable procedures agents follow to complete task types. Pick the skill that matches the task.
- **Tools** (`09_TOOLS/`): Tool references, configs, and command catalogs. Agents invoke what they need from here.
- Agents use what they need from skills and tools to complete tasks — no restriction, just documentation of what was used in the session log.

## Default Operating Loop

Agents wire the 8 always-on skills into normal execution:

| Phase | Skills (in order) | Purpose |
|-------|-------------------|---------|
| **Before Acting** | `context-router` → `clarify-before-acting` → `task-decomposer` | Orient, resolve ambiguity, plan with HITL checkpoints |
| **Before System/Browse** | `machine-control-and-tooling` → `context-router` | Discover tools, search fast, browse safely, execute with HITL gates |
| **Before Responding** | `self-critic-verifier` → `vault-curator` *(when proposing a HITL write)* | Verify grounding/links, enforce curation, obtain HITL |
| **After Completing** | `distill-and-compress` → `post-task-reflector` → `session-handoff` *(when needed)* | Extract takeaways, capture lessons, snapshot state |

## Identity Files

- `01_IDENTITY/user.md` — Global user identity, preferences, standing instructions
- `01_IDENTITY/agents/hermes.md` — Hermes agent identity, role, capabilities
- Future agents: add their own `.md` under `01_IDENTITY/agents/`

## Status Values

- `active` — Currently being worked on
- `planning` — Not yet started, but planned
- `stalled` — Blocked or paused
- `completed` — Finished
- `archived` — Moved to [[05_ARCHIVE]]

## Violation Handling

If an agent breaks these rules (missing frontmatter, no log write-back, duplicate notes), any other agent may correct the issue and log the correction in [[06_LOGS]].

---