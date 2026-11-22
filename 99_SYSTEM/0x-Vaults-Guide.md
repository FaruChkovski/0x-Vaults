---
title: 0x Vaults — User Guide & Setup
type: system
status: active
tags: [system, guide, setup, documentation]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[99_SYSTEM]]"
---

# 0x Vaults — User Guide & Setup

**One Shared Brain for Every AI Agent**

This guide walks you through what 0x Vaults is, how to set it up, and how to use it. It's designed to be shared — copy this PDF to your Discord, send it to friends, and get their approval before publishing to GitHub.

---

## What Is 0x Vaults?

> [!callout]
> **0x Vaults** is a unified, local-first AI Agent Operating System and shared knowledge base built in Obsidian.<br/>
> It acts as one single shared brain across all your AI agents — Hermes, local LLMs, coding agents, and more. Any agent can read your global identity, active projects, and past decisions before starting a task, and write back updates, logs, and new knowledge when finished.<br/><br/>
> **No more re-explaining context across sessions.**

---

## The 5 Slides

The following slides tell the story of 0x Vaults — from problem to solution to roadmap:

![Slide 1: Title](slides/slide-1-title.jpg)

![Slide 2: The Problem — Fragmented AI Memory](slides/slide-2-problem.jpg)

![Slide 3: The Solution — Standardized Agent OS](slides/slide-3-solution.jpg)

![Slide 4: Governance — HITL & Token Telemetry](slides/slide-4-governance.jpg)

![Slide 5: Ecosystem Expansion — Future Roadmap](slides/slide-5-roadmap.jpg)

---

## Vault Architecture

| Folder | Purpose |
|--------|---------|
| `00_INDEX.md` | Root routing — one read orients any agent |
| `AGENTS.md` | Cross-agent read/write rules (HITL, context accounting, default operating loop) |
| `01_IDENTITY/` | Global user identity + per-agent identities |
| `01_IDENTITY/agents/` | Per-agent identity notes (e.g., Hermes) |
| `02_PROJECTS/` | Active projects with clear end states |
| `03_AREAS/` | Ongoing areas of responsibility |
| `04_RESOURCES/` | Reference material (read mostly) |
| `05_ARCHIVE/` | Inactive/completed projects |
| `06_LOGS/` | Agent write-back — session logs, decisions, audit trail |
| `07_TEMPLATES/` | Note templates (identity, project, session log, agent log) |
| `08_SKILLS/` | Reusable agent procedures & workflows |
| `09_TOOLS/` | Tool references, configs, command catalogs |
| `10_SECURITY/` | Security policies (HITL, prompt injection defense) |
| `99_SYSTEM/` | System files (blueprint, schema, changelog) |

---

## How to Set Up 0x Vaults

### Step 1: Install Obsidian

1. Download Obsidian from [obsidian.md](https://obsidian.md)
2. Install it on your machine

### Step 2: Open the Vault

1. Open Obsidian
2. Click **"Open folder as vault"**
3. Navigate to: `D:/0x Vaults`
4. Click **Open**

Your shared brain is now live.

### Step 3: Install Recommended Plugins

In Obsidian Settings → Community Plugins, install:

| Plugin | Why You Need It |
|--------|-----------------|
| **Dataview** | Query your vault like a database — list active projects, filter logs by agent |
| **Templater** | Auto-inject frontmatter when creating new notes |
| **QuickAdd** | Fast capture of logs and decisions |
| **Periodic Notes** | Auto-generate dated agent session notes |

### Step 4: Meet Your First Agent — Hermes

Hermes is already configured as the primary agent. Read `01_IDENTITY/agents/hermes.md` to see its role, capabilities, and model (`nemotron-3.5-super` via NVIDIA NIM).

### Step 5: Run Your First Task

Follow the **Default Operating Loop**:

1. **Before Acting:** Read `00_INDEX.md` → clarify scope → decompose the task
2. **Before System/Browse:** Check available tools → search fast → browse safely
3. **Before Responding:** Verify facts → enforce curation rules → obtain HITL if writing
4. **After Completing:** Distill takeaways → reflect on friction → snapshot state for handoff

Write your session log to `06_LOGS/` using `07_TEMPLATES/agent-log-template.md`.

---

## HITL Rules (Human-in-the-Loop)

No agent may create, edit, patch, delete, move, or rename any file in this vault without your explicit approval first.

| Action | Approval Required? |
|--------|-------------------|
| Read-only access | ❌ No |
| Create a new note | ✅ Yes |
| Edit or patch a note | ✅ Yes |
| Delete a note | ✅ Yes |
| Move or rename a note | ✅ Yes |
| Update frontmatter | ✅ Yes |
| Add or remove wikilinks | ✅ Yes |
| Save an incident log | ✅ Yes |

**Approval Workflow:**
1. Agent proposes — states exactly which file(s) will change and what the change is
2. User reviews — approves, rejects, or requests changes
3. Agent executes — only after your explicit "approve" or "go ahead"
4. Agent logs — writes the approved change to `06_LOGS/`

---

## Token Telemetry

Every session must account for loaded context and compute exact token usage using `09_TOOLS/token_counter.py` (tiktoken `cl100k_base`).

Log fields include: `tokens_input`, `tokens_output`, `tokens_total`, `context_chars`, `requests_count`, `context_files_count`.

**Backfill Rule:** `tokens_output` must be filled in as the agent's final tool call after the response is generated, and `tokens_total` recomputed as `tokens_input + tokens_output`.

---

## Component Quick Reference

### Skills (`08_SKILLS/`)
- **context-router** — Retrieve minimal, high-signal context first
- **clarify-before-acting** — Pause and ask targeted questions on ambiguity
- **task-decomposer** — Break multi-step goals into sequenced checklist
- **self-critic-verifier** — Pre-output audit for grounding, links, policy
- **vault-curator** — Enforce frontmatter, filenames, wikilinks, index updates
- **distill-and-compress** — Extract durable facts into structured notes
- **post-task-reflector** — Evaluate errors and propose rule/skill upgrades
- **session-handoff** — Compact state snapshot for handoffs
- **machine-control-and-tooling** — Local tool discovery, fast search, efficient browsing
- **humanizer** — Makes AI-written text sound human (on-demand, external)

### Tools (`09_TOOLS/`)
- **token_counter.py** — Exact token counting (tiktoken cl100k_base)
- **catalog.md** — Full tool reference table
- **obsidian-plugins.md** — Obsidian community plugins (Templater, Dataview, QuickAdd, Periodic Notes)
- **plugins.md** — External plugin catalog
- **herdr.md** — Herdr local agent host (install, daemon, paths, OSC 7501)

### Security (`10_SECURITY/`)
- **security-policy.md** — HITL rule, what requires approval, enforcement
- **prompt-injection-security.md** — Trust boundaries, quarantine workflow, sanitized logging
- **README.md** — Security index with trust plane table

---

## Roadmap

| Version | Focus | Key Features |
|---------|-------|-------------|
| **v1.0** | Local Foundation | Standardized `[[00_INDEX]]` & `[[09_TOOLS]]` structure, HITL governance, local Python/Bash skill execution |
| **v1.1** | Advanced Tools | Herdr integration for multi-agent workflows, Dockerized skill environments, enhanced OSC 751 status reporting |
| **v2.0** | Orchestration Plane | Multi-machine orchestration via SSH/API, decentralized knowledge sharing, universal OS for all autonomous agents |

---

## Share It

This PDF is designed for Discord. Copy it, post it, and ask your friends:

> "What do you think of 0x Vaults? One shared brain for all AI agents — no more re-explaining context across sessions."

Get their approval, then publish to GitHub.

---

**Built with Hermes** — nemotron-3.5-super via NVIDIA NIM  
**Vault:** `D:/0x Vaults`  
**Date:** 2026-11-22

---