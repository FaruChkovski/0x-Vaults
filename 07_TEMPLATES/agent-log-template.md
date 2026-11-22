---
title: Agent Log Template
type: template
status: active
tags: [template, log, audit]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[06_LOGS]]"
---

# Agent Log Template

## Naming Convention

`YYYY-MM-DD_HHMM_<agent>_<task-slug>.md`

## YAML Frontmatter

```yaml
---
title: "<Log Title>"
type: log
status: completed
date: "YYYY-MM-DD"
time: "HH:MM"
agent_owner: hermes
model: nemotron-3.5-super
tokenizer_method: "char-estimate / 4"
trigger: "<trigger source>"
requests_count: <N>
context_files_count: <N>
context_chars: <N>
tokens_input: <N>
tokens_output: <N>
tokens_total: <N>
tags: [log, audit]
related:
  - "[[00_INDEX]]"
  - "[[06_LOGS]]"
---
```

## 1. Execution Metadata

- **Agent:** hermes
- **Model:** nemotron-3.5-super (nvidia-nim)
- **Session/Run ID:** <run-id>
- **Start Timestamp:** <YYYY-MM-DD HH:MM:SS>
- **End Timestamp:** <YYYY-MM-DD HH:MM:SS>
- **Total API Requests:** <N>
- **Token Measurement Method:** API metadata | tokenizer: <encoding>
- **Token Breakdown:** input=<N>, output=<N>, total=<N>

## 2. Context & Trigger

**Trigger Source:** <user prompt / skill trigger / scheduled>
**User Intent:** <summary>

### Context Inventory Table

| File / Source | Reason Loaded | Chars | Words | Tokens |
|---------------|---------------|-------|-------|--------|
| | | | | |

**Total Context Size:** <N> chars, <N> words, ~<N> tokens

## 3. Actions & Movements Taken

| Time | Action | File(s) | Tool Used |
|------|--------|---------|-----------|
| [HH:MM:SS] | <created | modified | moved | renamed | deleted> | <path> | <tool> |

## 4. Decisions, Approvals & Guardrails

- **HITL Approval:** <granted / pending / rejected> — reference: <approval source>
- **10_SECURITY Policy Checks:** <checks performed>
- **Errors / Retries:** <none or description>

## 5. Output Summary & Next Steps

**Resulting Vault State:** <summary>
**Pending Follow-Ups:** <list>

## Links

- [[00_INDEX]]
- [[06_LOGS]]

---