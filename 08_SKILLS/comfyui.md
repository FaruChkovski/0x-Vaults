---
title: ComfyUI
type: skill
status: active
tags: [skill, comfyui, image-generation, stable-diffusion, flux, generative-ai, creative, design]
last_updated: "2026-11-23"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[08_SKILLS]]"
---

# Skill: ComfyUI

## Purpose

Generate images, video, and audio via diffusion workflows (Stable Diffusion, SDXL, Flux, SD3, etc.) through ComfyUI's node-based interface. Supports txt2img, img2img, inpainting, upscaling, and video generation via local install or Comfy Cloud.

## Source

- **Local skill:** Hermes Agent `creative/comfyui`
- **License:** MIT (adapted from kshitijk4poor, alt-glitch, purzbeats)
- **Installed in AvA's profile:** `C:/Users/faruc/AppData/Local/hermes/profiles/ava/skills/creative/comfyui/`

## When to use

- Generating AI design concepts, backgrounds, textures, and visual explorations
- Rapid visual concepting and mood boards for vault artifacts
- Complementing hand-crafted UI design with generative imagery

## Core workflow

1. **Hardware check** — `python scripts/hardware_check.py` (local vs Comfy Cloud)
2. **Get workflow JSON** — API format from ComfyUI export or `workflows/` directory
3. **Extract schema** — `python scripts/extract_schema.py workflow.json`
4. **Run workflow** — `python scripts/run_workflow.py --workflow W.json --args '{"prompt": "..."}' --output-dir ./outputs`
5. **Verify** — `python scripts/health_check.py`

## AvA context

AvA is the creative agent for 0x Vaults — artist, front-end architect, and designer responsible for visual design and aesthetic direction. ComfyUI supports her generative visual concepting workflow, feeding into media cataloging via `[[media-use]]`.

## Setup decision

Choose **Comfy Cloud** (zero install, API key required) or **Local** (requires NVIDIA GPU ≥6 GB VRAM, or Apple Silicon ≥16 GB unified memory). Run `hardware_check.py` first to decide.

## Links

- [[00_INDEX]]
- [[08_SKILLS]]
- [[media-use]]

---
