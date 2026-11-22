---
title: Tool Catalog
type: tool
status: active
tags: [tool, catalog, reference]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[09_TOOLS]]"
---

# Tool Catalog — 0x Vaults

Agents use what they need from here to complete tasks. Each entry documents what the tool is, how to invoke it, and when to use it.

## File System Tools

| Tool | Purpose | How to Invoke | When to Use |
|------|---------|---------------|-------------|
| write_file | Create/overwrite a file | Hermes `write_file` | New notes, templates, index files |
| patch | Targeted edit in existing file | Hermes `patch` | Fix frontmatter, update links, edit content |
| read_file | Read a file's contents | Hermes `read_file` | Review existing notes before editing |
| search_files | Search file contents or names | Hermes `search_files` | Find existing notes, avoid duplicates |
| terminal | Run shell commands | Hermes `terminal` | Create directories, git, builds, installs |

## Agent Tools

| Tool | Purpose | How to Invoke | When to Use |
|------|---------|---------------|-------------|
| skill_manage | Create, patch, delete skills | Hermes `skill_manage` | Add new agent skills/tools |
| memory | Save/recall persistent facts | Hermes `memory` | Cross-session facts, user preferences |
| delegate_task | Spawn subagents | Hermes `delegate_task` | Parallel reasoning subtasks |

## Web Tools

| Tool | Purpose | How to Invoke | When to Use |
|------|---------|---------------|-------------|
| web_search | Search the web | Hermes `web_search` | Research, find references |
| web_extract | Extract page content | Hermes `web_extract` | Read full pages, PDFs |
| browser_exec | Drive a real web browser | Hermes `browser_exec` | Interactive sites, logins, automation |

## External Agent Hosts

| Tool | Purpose | How to Invoke | When to Use |
|------|---------|---------------|-------------|
| herdr | Local agent host — runs Claude Code, Codex, any agent in `herdr-core` | `curl -fsSL https://releases.herdr.dev/app/install.sh \| sh` (macOS/Linux) or `irm https://herdr.dev \| iex` (Windows PowerShell) | Run persistent agents that survive window closes; manage via `hc` CLI |

## Usage Rule

Agents pull what they need from skills (`08_SKILLS`) and tools (`09_TOOLS`) for each task, then document usage in the session log (`06_LOGS`).

## Links

- [[00_INDEX]]
- [[09_TOOLS]]
- [[AGENTS.md]]

---