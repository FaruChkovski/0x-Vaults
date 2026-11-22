---
title: Self-Critic Verifier
type: skill
status: active
trigger: always-on
tags: [skill, verification, quality]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[AGENTS.md]]"
---

# Skill: Self-Critic Verifier

## Purpose

Perform a silent pre-output audit verifying factual grounding against vault notes, confirming `[[wikilinks]]` exist, and checking for hallucinations or policy conflicts before replying.

## When It Triggers

Before every response that references vault content or proposes actions.

## Step-by-Step Execution Rules

1. Cross-check all claimed facts against actual vault notes read.
2. Verify every `[[wikilink]]` references a real, existing note.
3. Confirm no policy conflicts (HITL bypass, silent writes, raw payload logging).
4. Correct or flag any issues before responding.

## Output / Quality Check

Response is grounded in actual notes; all links resolve; no policy violations.

## Links

- [[00_INDEX]]
- [[AGENTS.md]]

---