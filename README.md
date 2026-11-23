---
title: 0x Vaults v1.1.1 Release Note
type: system
status: active
trigger: always-on
last_updated: "2026-11-22"
agent_owner: hermes
related: ["[[00_INDEX]]", "[[AGENTS.md]]", "[[07_TEMPLATES]]"]
---
# 🧠 0x Vaults v1.1.1: Production Readiness

**Architecture:** Unified, local-first shared memory in Obsidian (D:/0x Vaults). **Governance:** Strict Human-in-the-Loop (HITL) for all file writes and mandatory token telemetry tracking. **Skills:** 10 core skills operational, including `document-creation-pro`. **Tools:** Integrated `token_counter.py` and `herdr.md` references. **Next Step:** Prepare for GitHub push using [[github-pr-workflow]].

*Review the full guide at [[99_SYSTEM/0x-Vaults-Guide.md]] for detailed setup.*

## 💻 OS Implementation Guide

**1. Clone Repository:**
`git clone https://github.com/FaruChkovski/0x-Vaults`
**2. Open Vault:** Open the local `0x-Vaults` directory in Obsidian.
**3. Install Obsidian:** Download from obsidian.md.

**Windows (11):**
*   **Obsidian:** Standard installer.
*   **Herdr:** `irm @https://herdr.dev | iex` (in PowerShell).
*   **Git:** Use Git Bash for CLI operations.

**macOS:**
*   **Obsidian:** Download .dmg and drag to Applications.
*   **Herdr:** `curl -fsSL https://releases.herdr.dev/app/install.sh | sh`
*   **Git:** Pre-installed (or use Homebrew: `brew install git`).

**Linux (x86_64/arm64):**
*   **Obsidian:** Install via distribution package manager or download.
*   **Herdr:** `curl -fsSL https://releases.herdr.dev/app/install.sh | sh`
*   **Git:** Use native package manager (e.g., `apt`, `dnf`, `pacman`).

## Files

[.obsidian/](https://github.com/FaruChkovski/0x-Vaults/tree/main/.obsidian), [01\_IDENTITY/](https://github.com/FaruChkovski/0x-Vaults/tree/main/01_IDENTITY), [04\_RESOURCES/slides/](https://github.com/FaruChkovski/0x-Vaults/tree/main/04_RESOURCES/slides), [06\_LOGS/](https://github.com/FaruChkovski/0x-Vaults/tree/main/06_LOGS), [07\_TEMPLATES/](https://github.com/FaruChkovski/0x-Vaults/tree/main/07_TEMPLATES), [08\_SKILLS/](https://github.com/FaruChkovski/0x-Vaults/tree/main/08_SKILLS), [09\_TOOLS/](https://github.com/FaruChkovski/0x-Vaults/tree/main/09_TOOLS), [10\_SECURITY/](https://github.com/FaruChkovski/0x-Vaults/tree/main/10_SECURITY), [99\_SYSTEM/](https://github.com/FaruChkovski/0x-Vaults/tree/main/99_SYSTEM), [.gitignore](https://github.com/FaruChkovski/0x-Vaults/blob/main/.gitignore), [00_INDEX.md](https://github.com/FaruChkovski/0x-Vaults/blob/main/00_INDEX.md), [AGENTS.md](https://github.com/FaruChkovski/0x-Vaults/blob/main/AGENTS.md), [README.md](https://github.com/FaruChkovski/0x-Vaults/blob/main/README.md)