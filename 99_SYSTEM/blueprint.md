---
title: 0x Vaults Blueprint
type: system
status: active
tags: [system, blueprint, schema]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[99_SYSTEM]]"
---

# 0x Vaults System Blueprint

## Vault Root

`D:/0x Vaults/`

## Folder Hierarchy

| Folder | Purpose |
|--------|---------|
| `00_INDEX.md` | Root routing file — one read orients any agent |
| `AGENTS.md` | Cross-agent read/write rules |
| `01_IDENTITY/` | Global user identity + per-agent identities |
| `01_IDENTITY/agents/` | Per-agent identity notes |
| `02_PROJECTS/` | Active projects (clear end state) |
| `03_AREAS/` | Ongoing areas of responsibility |
| `04_RESOURCES/` | Reference material (read mostly) |
| `05_ARCHIVE/` | Inactive/completed projects and areas |
| `06_LOGS/` | Agent write-back: session logs, decisions, updates |
| `07_TEMPLATES/` | Note templates |
| `08_SKILLS/` | Reusable agent procedures & workflows |
| `09_TOOLS/` | Tool references, configs, command catalogs |
| `99_SYSTEM/` | System files: blueprint, schema, changelog |

## YAML Frontmatter Schema

```yaml
---
title: "<Note Title>"
type: identity | project | area | resource | archive | log | template | skill | tool | system
status: active | planning | stalled | completed | archived
tags: []
last_updated: "YYYY-MM-DD"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
---
```

## Linking Convention

- All internal links use `[[wikilinks]]`.
- Every note links back to `[[00_INDEX]]` in `related` frontmatter.
- No duplicate notes without updating `00_INDEX.md`.

## Agent Identity Files

- `01_IDENTITY/user.md` — Global user identity, preferences, standing instructions
- `01_IDENTITY/agents/hermes.md` — Hermes agent identity, capabilities, access rules

## Skill & Tool Usage

Agents use what they need from `08_SKILLS/` and `09_TOOLS/` to complete tasks, then document usage in `06_LOGS/`.

## Access Mode

Direct file read/write on disk. No middleware.

## Changelog

- 2026-11-22: Initial blueprint created. Vault structure, index, agent rules, identity files, templates, skill, and tool catalog built.

## Links

- [[00_INDEX]]
- [[AGENTS.md]]
- [[99_SYSTEM]]

---