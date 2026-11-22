---
title: Superpowers Skill
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, plugin, hermes, agentic, framework]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[04_RESOURCES/superpowers-framework]]
  - [[09_TOOLS/catalog]]
---

# Skill: Superpowers

## Purpose

Load and run the **Superpowers** agentic skills framework (obra/superpowers) within Hermes Agent. Superpowers provides composable skills (brainstorming, writing-plans, executing-plans, dispatching-parallel-agents, requesting-code-review, receiving-code-review, using-git-worktrees) plus a subagent-driven development workflow grounded in red/green TDD, YAGNI, and DRY.

## When It Triggers

Use this skill when the user wants to adopt the Superpowers methodology for a coding project — brainstorming intent, writing designs, executing plans with subagents, or installing Superpowers as a plugin.

## How to Invoke

1. **Load this skill** (`skill_view(name='superpowers')`) before any Superpowers task.
2. **Read** `[[04_RESOURCES/superpowers-framework]]` for the full framework overview and installation commands.
3. **Install as a Hermes plugin** (if not already installed):
   ```shell
   hermes plugins install obra/superpowers --enable
   ```
   Reinstall with the same command to update.
4. **Route to the right Superpowers sub-skill** based on the task (brainstorming → plans → execution → review).
5. **Execute via `terminal`** (`hermes` CLI) or Hermes web tools as appropriate.
6. **Log the session** in `[[06_LOGS]]/` and note which Superpowers skills were used.

## HITL Boundary

All file writes in the vault (notes, logs, index updates) require HITL approval per `[[10_SECURITY/security-policy]]`. Installing/updating the Superpowers plugin is an external operation and also requires HITL approval.

## Links

- [[00_INDEX]]
- [[04_RESOURCES/superpowers-framework]]
- [[09_TOOLS/catalog]]
- [[AGENTS.md]]
- [[10_SECURITY/security-policy]]

---
