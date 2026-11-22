---
title: Context Router
type: skill
status: active
trigger: always-on
tags: [skill, context, routing]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[AGENTS.md]]"
---

# Skill: Context Router

## Purpose

Retrieve minimal, high-signal context first via `[[00_INDEX]]`, frontmatter tags, and `[[wikilinks]]` rather than scanning entire folders blindly.

## When It Triggers

At the start of every task, before any read or write.

## Step-by-Step Execution Rules

1. Read `[[00_INDEX]]` to confirm folder routing and relevant note locations.
2. Use `[[wikilinks]]` and frontmatter `tags` to navigate directly to needed notes.
3. Read only the specific notes required — do not scan entire folders.

## Output / Quality Check

Agent can state exactly which notes were read and why, before acting.

## Links

- [[00_INDEX]]
- [[AGENTS.md]]

---