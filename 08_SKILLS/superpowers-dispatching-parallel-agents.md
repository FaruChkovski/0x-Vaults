---
title: Superpowers Dispatching Parallel Agents
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, dispatching-parallel-agents, concurrency, subagents]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
  - [[04_RESOURCES/superpowers-framework]]
---

# Skill: Superpowers Dispatching Parallel Agents

## Purpose

Concurrent subagent workflows. Launches agents to work through each engineering task, inspecting and reviewing their own work, continuing forward autonomously. It's not uncommon for agents to work for a couple of hours at a time without deviating from the plan.

## When It Triggers

Activates during execution when independent engineering tasks can be farmed out to parallel subagents.

## How to Invoke

1. **Load the parent skill** (`skill_view(name='superpowers')`) for framework context.
2. **Identify independent tasks** from the implementation plan that can run in parallel.
3. **Dispatch subagents** with clear task scopes and review criteria.
4. **Inspect and review** each subagent's work as it completes.
5. **Log the session** in `[[06_LOGS]]/`, noting which subagents were dispatched.

## HITL Boundary

Subagent task scopes require user alignment before dispatch. All vault file writes require HITL approval per `[[10_SECURITY/security-policy]]`.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[04_RESOURCES/superpowers-framework]]
- [[AGENTS.md]]

---
