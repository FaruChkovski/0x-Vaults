---
title: GitHub
type: skill
status: active
trigger: on-demand
tags: [skill, github, git, cli, api, version-control, pr, issues]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[09_TOOLS/github]]"
  - "[[09_TOOLS/catalog]]"
  - "[[AGENTS.md]]"
---

# Skill: GitHub

Orchestrates GitHub workflows in the 0x Vaults by routing to the Hermes profile's GitHub sub-skills and the `09_TOOLS/github` tool reference. Covers auth, repo management, issues, pull requests, code review, and CI/CD monitoring.

## Sub-Skills (Hermes Profile)

These live under `~/.hermes/skills/github/` and are loaded on demand:

| Sub-skill | Purpose |
|-----------|---------|
| `github-auth` | HTTPS tokens, SSH keys, `gh CLI` login |
| `github-repo-management` | Clone/create/fork repos, remotes, releases |
| `github-issues` | Create, triage, label, assign issues |
| `github-pr-workflow` | Branch, commit, push, open PRs, monitor CI, merge |
| `github-code-review` | Review PR diffs, inline comments |
| `github-issue-to-pr` | Carry an issue to a verified PR with honest CI state |

## How to Invoke

1. **Load this skill** (`skill_view(name='github')`) before any GitHub task.
2. **Route to the right sub-skill** based on the task (see table above).
3. **Use `09_TOOLS/github`** for the command reference and HITL boundary.
4. **Execute via `terminal`** (`gh`, `git`, `curl`) or Hermes web tools as appropriate.
5. **Log the session** in `06_LOGS/` and note which sub-skills were used.

## Typical Workflow (PR Lifecycle)

```
auth → repo → branch → commit → push → PR → CI → review → merge
  ↑                                                        │
  └──────────────── issues / issue-to-pr ──────────────────┘
```

## Example Routing Decisions

| Task | Route To |
|------|----------|
| Set up a token / SSH key | `github-auth` |
| Clone or fork a repo | `github-repo-management` |
| Open an issue or label one | `github-issues` |
| Create a branch + PR + merge | `github-pr-workflow` |
| Review a PR diff / comment | `github-code-review` |
| Take an issue → PR → verified CI | `github-issue-to-pr` |

## HITL Boundary

All file writes in the vault (notes, logs, index updates) require HITL approval per `[[10_SECURITY/security-policy]]`. Remote GitHub operations (push, PR create, merge, issue create) are external communication and require HITL.

## Links

- [[00_INDEX]]
- [[09_TOOLS/github]]
- [[09_TOOLS/catalog]]
- [[AGENTS.md]]
- [[10_SECURITY/security-policy]]

---