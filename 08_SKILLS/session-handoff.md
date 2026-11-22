---
title: Session Handoff
type: skill
status: active
trigger: always-on
tags: [skill, handoff, state]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[AGENTS.md]]"
---

# Skill: Session Handoff

## Purpose

Produce a compact, standardized state snapshot (current goal, completed actions, pending HITL approvals, next step) when context grows long or when handing off between agents.

## When It Triggers

Context is long, session is ending, or another agent needs to take over.

## Step-by-Step Execution Rules

1. Summarize current goal and completed actions.
2. List pending HITL approvals (if any).
3. State the next step clearly.
4. Write to `[[06_LOGS]]` only with HITL approval.

## Output / Quality Check

Snapshot is compact, complete, and actionable by another agent.

## Links

- [[00_INDEX]]
- [[AGENTS.md]]

---