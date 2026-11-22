---
title: GitHub
type: tool
status: active
tags: [tool, github, git, cli, api, version-control]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[09_TOOLS]]"
  - "[[08_SKILLS/github]]"
---

# Tool: GitHub

GitHub integration for the 0x Vaults: repository management, pull requests, issues, code review, and CI/CD monitoring via the `gh` CLI, plain `git`, and the GitHub REST API.

## What It Is

| Layer | Tool | Purpose | How to Invoke |
|-------|------|---------|---------------|
| CLI (preferred) | `gh` | GitHub CLI — auth, PRs, issues, runs, releases | `terminal` (`gh <command>`) |
| Version control | `git` | Commits, branches, remotes, push/pull | `terminal` (`git <command>`) |
| REST API | `curl` + `GITHUB_TOKEN` | API fallback when `gh` is unavailable | `terminal` (`curl`) |
| Web research | `web_search` / `web_extract` | Look up GitHub docs, repo state, issues | Hermes tools |

## When to Use

- **`github-auth`** — Set up HTTPS tokens, SSH keys, or `gh auth login`
- **`github-repo-management`** — Clone/create/fork repos, manage remotes and releases
- **`github-pr-workflow`** — Branch, commit, push, open PRs, monitor CI, merge
- **`github-issues`** — Create, triage, label, assign issues
- **`github-code-review`** — Review PR diffs, leave inline comments
- **`github-issue-to-pr`** — Carry an issue to a verified PR with honest CI state

## Quick Reference

```bash
# Auth check
gh auth status

# Extract owner/repo from remote
REMOTE_URL=$(git remote get-url origin)
OWNER_REPO=$(echo "$REMOTE_URL" | sed -E 's|.*github\.com[:/]||; s|\.git$||')

# Create a PR (gh preferred, curl fallback)
gh pr create --title "feat: ..." --body "..."

# Monitor CI
gh pr checks --watch
```

## HITL Boundary

Creating, patching, or deleting files in the vault to support a GitHub workflow requires HITL approval per `[[10_SECURITY/security-policy]]`. Git operations against remote repos (push, PR create, merge) are external communication and also require HITL.

## Links

- [[00_INDEX]]
- [[09_TOOLS]]
- [[08_SKILLS/github]]
- [[10_SECURITY/security-policy]]

---