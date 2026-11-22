---
title: Add New Skill
type: skill
status: active
tags: [skill, process, meta]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[08_SKILLS]]"
---

# Skill: Add New Skill

## Purpose

Defines the 4-step process for adding a new skill or tool to 0x Vaults so all agents follow the same consistent workflow.

## The 4-Step Process

1. **Create note** — Write the skill/tool note in the appropriate folder (`08_SKILLS` or `09_TOOLS`) using the standard frontmatter schema.
2. **Add to catalog** — Add an entry to `00_INDEX.md` referencing the new note.
3. **Ensure catalog link** — Verify the new note links back to `[[00_INDEX]]` in its `related` frontmatter.
4. **Test the link** — Open the index and confirm the link resolves; confirm the note is discoverable from the root.

## Frontmatter Requirements

```yaml
---
title: "<Skill Name>"
type: skill
status: active
tags: [skill, <domain>]
last_updated: "YYYY-MM-DD"
agent_owner: <agent>
related:
  - "[[00_INDEX]]"
---
```

## Example

A new research skill would be:
- Created at `08_SKILLS/research-topic.md`
- Listed in `00_INDEX.md` under the skills table
- Linked to `[[00_INDEX]]` in its frontmatter
- Verified by reading `00_INDEX.md` and following the link

## Links

- [[00_INDEX]]
- [[08_SKILLS]]
- [[AGENTS.md]]

---