---
title: Task Decomposer
type: skill
status: active
trigger: always-on
tags: [skill, decomposition, planning]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[AGENTS.md]]"
---

# Skill: Task Decomposer

## Purpose

Break multi-step goals into a sequenced checklist with clear inputs, outputs, and HITL checkpoints before running tools or proposing writes.

## When It Triggers

Any task with more than one discrete step.

## Step-by-Step Execution Rules

1. List the end goal and required outputs.
2. Break into sequential steps with inputs and outputs for each.
3. Flag each step as read-only or HITL:
   - Read-only steps (reading, searching, summarizing) may run immediately.
   - HITL steps (writes, deletions, moves, renames, external calls) require explicit user confirmation before executing.
4. Present the checklist to the user; proceed with read-only steps, await confirmation for HITL steps.

## Output / Quality Check

Checklist reviewed; HITL checkpoints marked; read-only steps executed, HITL steps awaiting user confirmation.

## Links

- [[00_INDEX]]
- [[AGENTS.md]]

---