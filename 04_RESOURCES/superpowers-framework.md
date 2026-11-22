---
title: Superpowers Framework
type: resource
status: active
tags: [resource, framework, skills, agentic, methodology, prime-radiant, obra]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
---

# 🦸 Superpowers Framework

**Superpowers** is a complete software development methodology for coding agents, built on a set of composable skills and initial instructions that keep the agent aligned with your intent. Created by **Jesse Vincent** and the team at **Prime Radiant**. Licensed under **MIT**. Source: [obra/superpowers](https://github.com/obra/superpowers).

## 🔑 Core Idea

Superpowers doesn't jump straight into code. It starts by asking what you're really trying to do (brainstorming), draws out a written design document you sign off on, then produces an implementation plan clear enough for a junior engineer to follow. Once you say "go," it launches a **subagent-driven-development** process — agents work through each task, inspect and review their own work, and continue autonomously for hours at a time. It emphasizes **true red/green TDD**, **YAGNI**, and **DRY**.

## 🧩 Skills Library

| Skill | Purpose |
|-------|---------|
| `brainstorming` | Drawing out intent before building |
| `writing-plans` | Detailed implementation plans |
| `executing-plans` | Inline plan execution: one context, one final review |
| `dispatching-parallel-agents` | Concurrent subagent workflows |
| `requesting-code-review` | Pre-review checklist |
| `receiving-code-review` | Responding to feedback |
| `using-git-worktrees` | Parallel development branches |

## 🛠 Installation

Install Superpowers as a plugin from this repository:

| Platform | Command |
|----------|---------|
| **Antigravity** | `agy plugin install https://github.com/obra/superpowers` |
| **Codex App** | Plugins sidebar → Coding → Superpowers → `+` |
| **Devin CLI** | `devin plugins install obra/superpowers` |
| **Kimi Code** | `/plugins install https://github.com/obra/superpowers` |
| **OpenCode** | `Fetch and follow instructions from https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md` |
| **Pi** | `pi install git:github.com/obra/superpowers` |
| **Qwen Code** | `qwen extensions install obra/superpowers` |
| **Hermes Agent** | `hermes plugins install obra/superpowers --enable` |

## 📡 Visual Companion Telemetry

By default, the Prime Radiant logo on brainstorming's optional visual companion feature is loaded from Prime Radiant's website, including only the Superpowers version in use. No project, prompt, or agent details are transmitted.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[09_TOOLS/catalog]]

---
