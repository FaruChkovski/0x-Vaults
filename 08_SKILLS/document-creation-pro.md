---
title: Document Creation Pro
type: skill
status: active
trigger: always-on
last_updated: "2026-11-22"
agent_owner: hermes
related: ["[[00_INDEX]]", "[[AGENTS.md]]", "[[07_TEMPLATES]]"]
---
**Purpose**: To take raw input (notes, scraped text, meeting transcripts) and transform it into structured, high-quality, audience-specific documentation suitable for various outputs (Obsidian Markdown, PDF, Discord/GitHub summaries).

**When It Triggers**: When an agent is asked to synthesize information into a final, polished document, not just draft content.

**Step-by-Step Execution Rules**:
1. **Input Analysis**: Read all provided raw material, identify the *target audience* (e.g., Technical Peer, Executive, Friend/Discord), and the *target format* (e.g., Markdown, PDF, Discord/GitHub summaries).
2. **Structure Planning**: Determine the optimal organizational pattern (e.g., Problem-Solution, Roadmap, How-To Guide) based on the goal and audience. Reference [[00_INDEX]] and [[AGENTS.md]] for governing rules.
3. **Drafting & Polishing**: Draft the content, applying vault standards (YAML frontmatter, consistent [[wikilinks]]). Use the 'humanizer' skill for tone adjustment if the audience requires a conversational style.
4. **Visual QA (If PDF target)**: If PDF is requested, use the 'pdf-architect' skill, ensuring PyMuPDF is utilized, and execute visual QA on PNG renderings to verify flow and contrast.
5. **HITL & Logging**: Present a final execution plan (structure + diffs) to the user for explicit HITL approval before writing any file. Log the entire process to [[06_LOGS/]].

**Output / Quality Check**: The final output MUST meet the *target audience's* expectation (e.g., Executive summary is brief; Peer guide is technical). Must be self-verified against [[10_SECURITY/security-policy]] before output.