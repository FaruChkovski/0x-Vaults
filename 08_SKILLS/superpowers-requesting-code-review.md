---
title: Superpowers Requesting Code Review
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, requesting-code-review, code-review, checklist]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
  - [[04_RESOURCES/superpowers-framework]]
---

# Skill: Superpowers Requesting Code Review

## Purpose

Pre-review checklist. Ensures code is ready for review before it is submitted — catching issues early so the review cycle is efficient.

## When It Triggers

Activates before submitting code for review, as part of the Superpowers workflow's review phase.

## How to Invoke

1. **Load the parent skill** (`skill_view(name='superpowers')`) for framework context.
2. **Run the pre-review checklist** — verify tests pass, TDD red/green cycle is complete, YAGNI/DRY principles are respected.
3. **Address checklist failures** before requesting review.
4. **Log the session** in `[[06_LOGS]]/`.

## HITL Boundary

Review submission requires explicit user approval. All vault file writes require HITL approval per `[[10_SECURITY/security-policy]]`.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[04_RESOURCES/superpowers-framework]]
- [[AGENTS.md]]

---
