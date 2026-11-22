---
title: Superpowers Writing Plans
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, writing-plans, planning, implementation]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
  - [[04_RESOURCES/superpowers-framework]]
---

# Skill: Superpowers Writing Plans

## Purpose

Produces a detailed implementation plan after design approval — clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow. Emphasizes **true red/green TDD**, **YAGNI** (You Aren't Gonna Need It), and **DRY**.

## When It Triggers

Activates after the brainstorming design document is signed off, before any execution begins.

## How to Invoke

1. **Load the parent skill** (`skill_view(name='superpowers')`) for framework context.
2. **Generate the plan** from the signed-off design document — one context, focused on implementability.
3. **Verify** the plan emphasizes red/green TDD, YAGNI, and DRY.
4. **Get sign-off** on the plan before saying "go" to execution.
5. **Log the session** in `[[06_LOGS]]/`.

## HITL Boundary

Plan sign-off requires explicit user approval before execution begins. All vault file writes require HITL approval per `[[10_SECURITY/security-policy]]`.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[04_RESOURCES/superpowers-framework]]
- [[AGENTS.md]]

---
