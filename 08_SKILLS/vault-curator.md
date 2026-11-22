---
title: Vault Curator
type: skill
status: active
trigger: always-on
tags: [skill, curation, frontmatter, links]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[AGENTS.md]]"
---

# Skill: Vault Curator

## Purpose

Enforce standard YAML frontmatter, kebab-case filenames, bidirectional `[[wikilinks]]`, and `[[00_INDEX]]` table updates whenever proposing a vault write.

## When It Triggers

Before any proposed vault write.

## Step-by-Step Execution Rules

1. Confirm filename is kebab-case.
2. Confirm YAML frontmatter matches `[[00_INDEX]]` schema.
3. Confirm note links back to `[[00_INDEX]]` in `related` field.
4. Confirm `[[00_INDEX]]` routing table is updated if this is a new note.

## Output / Quality Check

Proposed write passes all curation checks; HITL approval requested if not already obtained.

## Links

- [[00_INDEX]]
- [[AGENTS.md]]

---