---
title: Web Frontend Edit
type: skill
status: active
tags: [skill, frontend, html, css, javascript, design, theming]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[08_SKILLS]]"
---

# Skill: Web Frontend Edit

## Purpose

Edit local HTML/CSS/JS frontend files — layout, navigation, buttons, themes, and visual design — without a git workflow. Read-before-write, targeted `patch` edits, themed CSS variables, and verified output on disk.

## Source

- **Local skill:** Hermes Agent `web-frontend-edit`
- **License:** MIT
- **Installed in AvA's profile:** `C:/Users/faruc/AppData/Local/hermes/profiles/ava/skills/web-frontend-edit/`

## Core workflow

1. **Read the file first** — `read_file` before any `write_file` or `patch`
2. **Plan the change** — identify exact HTML elements, CSS classes, and JS blocks affected
3. **Make targeted edits** — `patch` with enough context for a unique match
4. **Add supporting CSS** — use CSS variables (`--accent`, `--border`, `--surface`, `--text`, `--radius`, `--transition`)
5. **Add mobile behavior** — media queries for mobile menus
6. **Wire up JS toggles** — event listeners guarded with `if (elem)` checks
7. **Verify on disk** — confirm `verified: true`; open HTML in a browser to check layout

## User preferences embedded

- **Path format:** Forward-slash Windows paths (`C:/Users/faruc/...`)
- **Visual style:** Toy-store/playful — rounded corners (`--radius: 20px`), frosted-glass cards, animated gradients, emoji icons
- **Button consistency:** Primary actions use `btn btn-primary` class

## AvA context

AvA is the creative agent for 0x Vaults — artist, front-end architect, and designer. This skill supports her refining winning sketch directions into real themed frontend code, applying consistent visual styling across knowledge base artifacts (companion to `[[sketch]]`).

## Links

- [[00_INDEX]]
- [[08_SKILLS]]
- [[sketch]]

---
