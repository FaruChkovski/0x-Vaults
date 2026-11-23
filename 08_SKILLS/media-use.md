---
title: Media Use
type: skill
status: active
tags: [skill, media, assets, catalog, icons, images, brand, logo, voice, sfx, bgm]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[08_SKILLS]]"
---

# Skill: Media Use

## Purpose

Agent Media OS for resolving, generating, and operating on media assets (BGM, SFX, images, icons, brand logos, voices, color grades, LUTs) into frozen local files or paste-ready blocks with ledger records. One verb: `resolve`. Generates via TTS/music/image models when the catalog misses; reuses assets across projects.

## Source

- **Local skill:** Hermes Agent `media-use`
- **License:** MIT
- **Installed in AvA's profile:** `C:/Users/faruc/AppData/Local/hermes/profiles/ava/skills/media-use/`

## Core workflow

**`npx hyperframes media-use resolve --type <type> --intent "<description>" --project <dir>`**

| Type   | Purpose                                |
|--------|----------------------------------------|
| `bgm`  | background music (HeyGen catalog)      |
| `sfx`  | sound effects (bundled + catalog)      |
| `image`| photos, backgrounds (75k+ vectors)     |
| `icon` | icons, symbols (transparent)           |
| `logo` | official brand marks (never redrawn)   |
| `voice`| TTS voiceover                          |
| `grade`| color correction candidate             |
| `lut`  | reusable `.cube` color grade file      |

## AvA context

AvA is the creative agent for 0x Vaults — artist, front-end architect, and designer. Media Use supports her cataloging and reusing design assets (icons, images, brand marks) across vault artifacts, pairing with `[[comfyui]]` generated output.

## Resolution rules

- List reusable candidates with `--candidates` before resolving fresh
- Reuse rules apply; resolve only when no suitable candidate exists
- Never redraw official brand logos — use theSVG → GitHub avatar → favicon chain
- Propose media opportunities once per project; never silently mutate

## Links

- [[00_INDEX]]
- [[08_SKILLS]]
- [[comfyui]]

---
