---
title: Obsidian Plugins Catalog
type: tool
status: active
tags: [tool, obsidian, plugins, catalog]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[09_TOOLS]]"
---

# Obsidian Plugins Catalog — 0x Vaults

Community plugins installed and how they support agent workflows in 0x Vaults.

## Installed Plugins

### Templater
- **Author:** silentvoid13
- **Version:** 6.2M
- **Purpose:** Create and use dynamic templates
- **Agent use case:** Auto-inject standard YAML frontmatter when agents create new notes in `02_PROJECTS`, `06_LOGS`, `08_SKILLS`, etc. Ensures every new note follows the schema without manual effort.

### Dataview
- **Author:** blacksmithgu
- **Version:** 0.5.3M
- **Purpose:** Run advanced queries over your vault
- **Agent use case:** Query notes by frontmatter — list all `type: project` with `status: active`, find all logs by `agent_owner: hermes`, surface stalled tasks, etc. Turns the vault into a queryable database for agents.

### QuickAdd
- **Author:** chhoumann
- **Version:** 2.3M
- **Purpose:** Quickly add new notes or content to your vault
- **Agent use case:** Fast capture of session logs, decisions, and updates without navigating folders. Agents can append to `06_LOGS` or create project notes on the fly.

### Periodic Notes
- **Author:** Liam Cain
- **Version:** 808k
- **Purpose:** Manage your daily, weekly, and monthly notes
- **Agent use case:** Auto-generate dated agent session notes (daily/weekly) that link back to `06_LOGS` and `00_INDEX`. Good for time-boxed agent work tracking.

## Plugin-to-Folder Mapping

| Plugin | Primary Vault Folder |
|--------|---------------------|
| Templater | `07_TEMPLATES/` |
| Dataview | All folders (read queries) |
| QuickAdd | `06_LOGS/`, `02_PROJECTS/` |
| Periodic Notes | `06_LOGS/` (dated session notes) |

## Usage Rule

Agents should leverage these plugins where they reduce friction: Templater for consistent frontmatter, Dataview for status checks, QuickAdd for fast logging, Periodic Notes for time-boxed sessions. All plugin-created notes must still follow the AGENTS.md rules (frontmatter, wikilinks, log write-back).

## Links

- [[00_INDEX]]
- [[09_TOOLS]]
- [[AGENTS.md]]

---