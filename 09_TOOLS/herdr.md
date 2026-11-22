---
title: Herdr Tool Reference
type: tool
status: active
tags: [tool, herdr, agent-host, external]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[09_TOOLS]]"
  - "[[09_TOOLS/catalog]]"
---

# Tool: Herdr

Free, open-source (Apache 2.0) app for running coding agents in `herdr-core`. Agents persist across window closes, and Herdr keeps its layout, sidebar, tabs, keys, and themes as plain files under `~/.config/herdr-app/`.

## Install Commands

| Platform | Command |
|----------|---------|
| macOS / Linux | `curl -fsSL https://releases.herdr.dev/app/install.sh \| sh` |
| Windows PowerShell | `irm https://herdr.dev \| iex` |

## Background Daemon

| Binary | Purpose |
|--------|---------|
| `herdr-core` | Agent execution server — keeps agents running when the app window closes |
| `hc` | CLI client — `hc ls`, `hc send <id> "<msg>"`, `hc events`, `~ quit herdr` |

## Install Paths

| Platform | Path |
|----------|------|
| Linux | `~/.local/share/herdr-app/` |
| macOS | `~/Applications/Herdr.app` |
| Windows | Start menu entry (via installer) |

## Post-Install Steps

1. Open Herdr and start an agent from the `+` in the tab bar (Claude Code, Codex, or any program).
2. Point your agent at its guide: `~/.config/herdr-app/AGENTS.md` — this tells the agent everything it can change.
3. Ask for what you want (a board, a timer on each tab, etc.) or pick one from the gallery.

## Configuration (agent-editable plain files)

```
~/.config/herdr-app/
├── AGENTS.md        # what your agent can change
├── settings.json    # fonts, theme, sounds
├── keys.json
├── layouts/
│   ├── main.json
│   └── board.json
├── mods/
│   ├── agents/main.js
│   └── tabs/main.js
└── themes/
```

## OSC 7501 Status Protocol

Agents supporting OSC 7501 show working/done/needs-you status. Any script can be an agent with one line:

```bash
printf '\e]7501;state=blocked:app=my-agent\e\\'
```

## Mobile

iPhone, iPad, Android — App Store and Google Play. Connects to `herdr-core` on your machines over SSH (not Herdr TUI).

## Herdr vs. Herdr TUI

Herdr TUI is the original terminal app with its own server. Herdr (this app) is a separate program built on `herdr-core`. They don't share agents.

## Agent Usage Rule

Herdr is a **local agent host**, not a vault-writing tool. Agents running inside Herdr may create/modify files on the local machine — any such writes to the 0x Vaults require **HITL approval** per `[[10_SECURITY/security-policy]]`. Treat Herdr agent output as untrusted data until reviewed.

## Links

- [[00_INDEX]]
- [[09_TOOLS]]
- [[09_TOOLS/catalog]]
- [[10_SECURITY/security-policy]]

---