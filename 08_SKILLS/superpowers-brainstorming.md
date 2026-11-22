---
title: Superpowers Brainstorming
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, brainstorming, intent, design]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
  - [[04_RESOURCES/superpowers-framework]]
---

# Skill: Superpowers Brainstorming

## Purpose

Activates **before building anything**. Draws out what you actually want, and why, through questions that get you describing it, then plays its understanding back for correction. Small changes get agreed in chat; projects get a written design document a builder could plan from.

## When It Triggers

Use at the start of any Superpowers-driven project, before any design document or implementation plan exists. It is the first skill in the Superpowers basic workflow.

## How to Invoke

1. **Load the parent skill** (`skill_view(name='superpowers')`) for framework context.
2. **Trigger brainstorming** when a new project or feature is proposed — let Superpowers ask clarifying questions rather than jumping to code.
3. **Corrections:** Review the played-back understanding and correct it in chat until sign-off.
4. **Output:** Small changes → agreed in chat. Projects → written design document.
5. **Log the session** in `[[06_LOGS]]/`.

## HITL Boundary

Design sign-off requires explicit user approval before moving to `writing-plans`. All vault file writes require HITL approval per `[[10_SECURITY/security-policy]]`.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[04_RESOURCES/superpowers-framework]]
- [[AGENTS.md]]

---
