---
title: Logs Dashboard
type: system
status: active
tags: [system, dashboard, dataview, audit]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[06_LOGS]]"
---

# 06_LOGS — Dataview Audit Dashboard

All agent session logs live in this folder with structured YAML frontmatter. The tables below update automatically as new logs are added.

## Token Totals by Agent

```dataview
TABLE sum(tokens_total) AS "Total Tokens", sum(requests_count) AS "Requests", count() AS "Sessions"
FROM "06_LOGS"
GROUP BY agent_owner
```

## Token Totals by Model

```dataview
TABLE sum(tokens_total) AS "Total Tokens", count() AS "Sessions"
FROM "06_LOGS"
GROUP BY model
```

## Recent Log Activity

```dataview
TABLE date, time, agent_owner, model, tokens_total, context_chars
FROM "06_LOGS"
SORT date DESC, time DESC
LIMIT 10
```

## Log Inventory

```dataview
TABLE status, trigger, tokenizer_method
FROM "06_LOGS"
WHERE type = "log"
SORT date DESC
```

## How to Add a New Log

1. Copy `[[07_TEMPLATES/agent-log-template]]` to a new file named `YYYY-MM-DD_HHMM_<agent>_<task-slug>.md`.
2. Fill in frontmatter with exact counts from `[[09_TOOLS/token_counter]]`.
3. The Dataview tables above update automatically on next vault open.

## Links

- [[00_INDEX]]
- [[07_TEMPLATES/agent-log-template]]
- [[09_TOOLS/token_counter]]

---