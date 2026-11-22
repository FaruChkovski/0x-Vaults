---
title: Superpowers Using Git Worktrees
type: skill
status: active
trigger: on-demand
tags: [skill, superpowers, using-git-worktrees, git, worktrees, branches]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - [[08_SKILLS/superpowers]]
  - [[04_RESOURCES/superpowers-framework]]
---

# Skill: Superpowers Using Git Worktrees

## Purpose

Activates after design approval. Creates an isolated workspace on a new branch, runs project setup, and verifies a clean test baseline before development begins.

## When It Triggers

Activates after the design document is signed off, as the setup step before execution.

## How to Invoke

1. **Load the parent skill** (`skill_view(name='superpowers')`) for framework context.
2. **Create a new branch** for the work.
3. **Create an isolated git worktree** workspace on that branch.
4. **Run project setup** — install dependencies, configure environment.
5. **Verify a clean test baseline** — tests pass before any changes are made.
6. **Log the session** in `[[06_LOGS]]/`, noting branch and worktree paths.

## HITL Boundary

Branch creation and workspace setup require user approval before execution begins. All vault file writes require HITL approval per `[[10_SECURITY/security-policy]]`.

## Links

- [[00_INDEX]]
- [[08_SKILLS/superpowers]]
- [[04_RESOURCES/superpowers-framework]]
- [[AGENTS.md]]

---
