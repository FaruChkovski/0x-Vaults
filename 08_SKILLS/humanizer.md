---
title: Humanizer
type: skill
status: active
tags: [skill, writing, text, external]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[08_SKILLS]]"
---

# Skill: Humanizer

## Purpose

Makes AI-written text sound like a person wrote it, without changing what it says. Built on Wikipedia's *Signs of AI writing* guide — the same patterns Wikipedia editors use to catch AI-generated text.

## Source

- **Repo:** https://github.com/blader/humanizer
- **License:** MIT
- **Author:** blader
- **Works in:** Claude Code, Codex, pi, Claude.ai, Claude Desktop, Gemini CLI, GitHub Copilot, Windsurf, and any agent supporting the Skills CLI

## Installation

```bash
npx skills add blader/humanizer --global --agent '*'
```

Omit `--global` to install only in the current project. For agents not covered by the Skills CLI, copy `SKILL.md` into the agent's skill folder.

## Usage

Call directly:

```
/humanizer

[paste your text here]
```

Or in plain language:

```
Please humanize this text: [your text]
```

To rewrite a file:

```
Humanize the prose in docs/launch-post.md
```

Humanizer reads the full file before editing, leaves code/frontmatter/link targets alone, and shows its work: first rewrite, surviving tells, then final version.

## Voice Matching

Include a writing sample (2–3 paragraphs of your own writing) to match your rhythm, word choice, punctuation, and quirks:

```
/humanizer

Here's a sample of my writing for voice matching:
[paste your writing]

Now humanize this text:
[paste AI text]
```

## The 5 Strongest Tells (edited on sight)

| # | Pattern | Example |
|---|---------|---------|
| 1 | **Not X but Y** | "It's not just a feature, it's a shift." → state the point directly |
| 2 | **One-line closers** | "Let that sink in." → cut the closer |
| 3 | **Sayings that sound deep** | "At its core, what matters is..." → replace with specific claim |
| 4 | **Staged run-up** | "Here's the thing." "Honestly?" → remove, state the point |
| 5 | **Arguing with no one** | "I'm not saying X, but..." → remove the unraised objection |

Humanizer checks 26 patterns total; the remaining 21 are weaker and acted on only when other tells appear.

## What It Leaves Alone

- Code, data, frontmatter, and link targets
- Personal opinions and quirks in personal writing
- Informal human text (chat, rants, angry reviews) unless two unrelated tells appear together
- Every claim the original made

## Agent Note

This is an **external skill** — it lives outside 0x Vaults but is referenced here so agents know it exists and how to invoke it. Document usage in `06_LOGS` when applied.

## Links

- [[00_INDEX]]
- [[08_SKILLS]]
- [[09_TOOLS/plugins]]

---