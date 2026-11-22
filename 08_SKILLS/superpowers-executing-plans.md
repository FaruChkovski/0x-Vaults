---
title: Superpowers Executing Plans
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, executing-plans, execution, review]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
  - [[04_RESOURCES/superpowers-framework]]
---

# Skill: Superpowers Executing Plans

## Purpose

Inline plan execution: one context, one final review. Takes the signed-off implementation plan and carries it through to completion, then performs a final review before handing back.

## When It Triggers

Activates after the implementation plan is signed off and you say "go." It is the execution phase of the Superpowers basic workflow.

## How to Invoke

1. **Load the parent skill** (`skill_view(name='superpowers')`) for framework context.
2. **Execute the plan** — one context, working through each engineering task in sequence.
3. **Inspect and review work** as you go, continuing forward autonomously.
4. **Perform a final review** before considering the plan complete.
5. **Log the session** in `[[06_LOGS]]/`.

## HITL Boundary

Final review sign-off requires explicit user approval. All vault file writes require HITL approval per `[[10_SECURITY/security-policy]]`.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[04_RESOURCES/superpowers-framework]]
- [[AGENTS.md]]

---
