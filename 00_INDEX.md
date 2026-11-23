# 00_INDEX — Root Routing

Welcome to **0x Vaults**. This is the single shared brain for all AI agents.
Any agent can read this file to orient itself in one pass.

## Top-Level Folders

| Folder | Purpose |
|--------|---------|
| [[01_IDENTITY]] | Global user identity + per-agent identities |
| [[02_PROJECTS]] | Active projects (clear end state) |
| [[03_AREAS]] | Ongoing areas of responsibility (no end state) |
| [[04_RESOURCES]] | Reference material (read mostly) |
| [[05_ARCHIVE]] | Inactive/completed projects and areas |
| [[06_LOGS]] | Agent write-back: session logs, decisions, updates |
| [[07_TEMPLATES]] | Note templates (identity, project, decision, log) |
| [[08_SKILLS]] | Reusable agent procedures & workflows |
| [[09_TOOLS]] | Tool references, configs, command catalogs |
| [[10_SECURITY]] | Security policies and protocols (HITL, prompt injection defense) |
| [[99_SYSTEM]] | System files: blueprint, schema, changelog |

## Agent Entry Points

- [[AGENTS.md]] — Cross-agent read/write rules (mandatory read before any write)
- [[01_IDENTITY/agents/hermes]] — Hermes agent identity & standing instructions
- [[06_LOGS]] — Where agents write session logs and decisions after acting

## Skills

| Skill | Purpose |
|-------|---------|
| [[08_SKILLS/humanizer]] | Makes AI-written text sound human without changing meaning |
| [[08_SKILLS/context-router]] | Retrieve minimal, high-signal context first |
| [[08_SKILLS/clarify-before-acting]] | Pause and ask targeted questions on ambiguity |
| [[08_SKILLS/task-decomposer]] | Break multi-step goals into sequenced checklist |
| [[08_SKILLS/self-critic-verifier]] | Pre-output audit for grounding, links, policy |
| [[08_SKILLS/vault-curator]] | Enforce frontmatter, filenames, wikilinks, index updates |
| [[08_SKILLS/distill-and-compress]] | Extract durable facts into structured notes |
| [[08_SKILLS/document-creation-pro]] | Transform raw input into structured, high-quality documentation |
| [[08_SKILLS/session-handoff]] | Compact state snapshot for handoffs |
| [[08_SKILLS/github]] | GitHub workflows: auth, repos, issues, PRs, CI/CD, code review |
| [[08_SKILLS/machine-control-and-tooling]] | Local tool discovery, fast search, efficient browsing, machine control |
| [[08_SKILLS/pdf-architect]] | PDF design, layout, visual QA with ReportLab + ImageMagick |
| [[08_SKILLS/superpowers]] | Install and run the Superpowers agentic skills framework (obra/superpowers) as a Hermes plugin |
| [[08_SKILLS/superpowers-brainstorming]] | Drawing out intent before building |
| [[08_SKILLS/superpowers-writing-plans]] | Detailed implementation plans |
| [[08_SKILLS/superpowers-executing-plans]] | Inline plan execution: one context, one final review |
| [[08_SKILLS/superpowers-dispatching-parallel-agents]] | Concurrent subagent workflows |
| [[08_SKILLS/superpowers-requesting-code-review]] | Pre-review checklist |
| [[08_SKILLS/superpowers-receiving-code-review]] | Responding to feedback |
| [[08_SKILLS/superpowers-using-git-worktrees]] | Parallel development branches |
| [[08_SKILLS/sketch]] | Throwaway HTML mockups: 2-3 design variants to compare |
| [[08_SKILLS/web-frontend-edit]] | Edit local HTML/CSS/JS frontend files — layout, themes, buttons, visual design |
| [[08_SKILLS/comfyui]] | Generate images, video, and audio via diffusion workflows (Stable Diffusion, Flux) |
| [[08_SKILLS/media-use]] | Resolve, generate, and catalog media assets (icons, images, brand logos, voices) |

## Resources

| Resource | Purpose |
|----------|---------|
| [[04_RESOURCES/superpowers-framework]] | Superpowers agentic skills framework & SD methodology by Prime Radiant |

## How Agents Use This Vault

1. **Read** [[AGENTS.md]] and your own agent identity under [[01_IDENTITY/agents]]
2. **Read** [[01_IDENTITY/user]] for global user context
3. **Pull** a procedure from [[08_SKILLS]] and/or a tool reference from [[09_TOOLS]] as needed
4. **Act** on the task
5. **Write back** a session log to [[06_LOGS]] and update any affected notes

## Frontmatter Schema (all notes)

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
- Every note links back to `[[00_INDEX]]` in its `related` frontmatter.
- No duplicate notes without updating this index.

---