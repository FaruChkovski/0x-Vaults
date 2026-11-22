---
title: AvA Default Model Change: kimi → Mistral Large 4
type: log
status: completed
date: "2026-11-23"
time: "HH:MM"
agent_owner: hermes
model: nemotron-3.5-super
tokenizer_method: "char-estimate / 4"
trigger: "user request"
requests_count: 0
context_files_count: 0
context_chars: 0
tokens_input: 0
tokens_output: 0
tokens_total: 0
tags: [log, audit, ava, config-change]
related:
  - "[[00_INDEX]]"
  - "[[06_LOGS]]"
  - "[[01_IDENTITY/agents/ava]]"
---

# AvA Default Model Change: kimi → Mistral Large 4

## 1. Execution Metadata

- **Agent:** hermes
- **Model:** nemotron-3.5-super (nvidia-nim)
- **Session/Run ID:** hermes-ava-model-change-2026-11-23
- **Start Timestamp:** 2026-11-23 HH:MM:SS
- **End Timestamp:** 2026-11-23 HH:MM:SS
- **Total API Requests:** 0
- **Token Measurement Method:** char-estimate / 4 (tiktoken unavailable in runtime)
- **Token Breakdown:** input=0, output=0, total=0

## 2. Context & Trigger

**Trigger Source:** user request
**User Intent:** Change AvA's default model from kimi-k3.1-pro to Mistral Large 4, keeping the nvidia-nim provider, and update the vault to reflect the change.

### Context Inventory Table

| File / Source | Reason Loaded | Chars | Words | Tokens |
|---------------|---------------|-------|-------|--------|
| [[01_IDENTITY/agents/ava.md]] | AvA identity note carries model + provider frontmatter | 1,241 | ~180 | ~450 |
| C:/Users/faruc/AppData/Local/hermes/profiles/ava/config.yaml | AvA Hermes profile config; source of truth for default model | 252 | ~40 | ~63 |
| C:/Users/faruc/AppData/Local/hermes/profiles/ava/provider_models_cache.json | Confirms exact Mistral Large 4 model ID for nvidia-nim provider | 1,578 | ~140 | ~395 |
| C:/Users/faruc/AppData/Local/hermes/profiles/ava/ollama_cloud_models_cache.json | Cross-checks mistral-large-4 availability | 529 | ~50 | ~132 |

**Total Context Size:** 3,600 chars, ~410 words, ~1,040 tokens

## 3. Actions & Movements Taken

| Time | Action | File(s) | Tool Used |
|------|--------|---------|-----------|
| [HH:MM:SS] | Modified default model from `kimi-k3.1-pro` to `mistralai/mistral-large-4-1t-a52b` (provider `nvidia-nim` unchanged) | `C:/Users/faruc/AppData/Local/hermes/profiles/ava/config.yaml` | `patch` |
| [HH:MM:SS] | Updated `model` frontmatter from `kimi-k3.1-pro` to `mistralai/mistral-large-4-1t-a52b` (provider `nvidia-nim` unchanged) | `D:/0x Vaults/01_IDENTITY/agents/ava.md` | `patch` |

## 4. Decisions, Approvals & Guardrails

- **HITL Approval:** granted — user explicitly requested the change ("change ava default model from kimi to Mistral Large 4, keep the provider, then update the vault with changes")
- **10_SECURITY Policy Checks:** read-before-act performed (read ava.md, config.yaml, model caches); no secrets touched; no .env or credential files modified
- **Errors / Retries:** none

## 5. Output Summary & Next Steps

**Resulting Vault State:**
- AvA default model is now `mistralai/mistral-large-4-1t-a52b` (Mistral Large 4) in both `config.yaml` and the vault identity note `ava.md`
- Provider remains `nvidia-nim`; `base_url: https://integrate.api.nvidia.com/v1` unchanged
- Vault identity note `ava.md` frontmatter `model` field synchronized with profile config

**Pending Follow-Ups:** none

- [[00_INDEX]]
- [[06_LOGS]]

---
