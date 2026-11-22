---
title: Superpowers Receiving Code Review
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, receiving-code-review, code-review, feedback]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
  - [[04_RESOURCES/superpowers-framework]]
---

# Skill: Superpowers Receiving Code Review

## Purpose

Responding to feedback from code reviews. Takes reviewer comments and addresses them systematically, iterating until the code is merge-ready.

## When It Triggers

Activates after code review feedback is received, before merging.

## How to Invoke

1. **Load the parent skill** (`skill_view(name='superpowers')`) for framework context.
2. **Process reviewer feedback** — address each comment, explain disagreements, make required changes.
3. **Re-run the requesting-code-review checklist** after changes.
4. **Log the session** in `[[06_LOGS]]/`, noting which feedback items were resolved.

## HITL Boundary

Merge approval requires explicit user sign-off. All vault file writes require HITL approval per `[[10_SECURITY/security-policy]]`.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[04_RESOURCES/superpowers-framework]]
- [[AGENTS.md]]

---
