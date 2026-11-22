---
title: PDF Architect
type: skill
status: active
trigger: on-demand
tags: [skill, pdf, layout, design, visual-qa]
last_updated: "2026-11-22"
agent_owner: hermes
related:
  - "[[00_INDEX]]"
  - "[[AGENTS.md]]"
  - "[[09_TOOLS/token_counter]]"
---

# Skill: PDF Architect

Designs and verifies professional PDF documents for 0x Vaults using ReportLab + ImageMagick visual QA.

## Purpose

Build publication-quality PDFs with strict page-break control, consistent headers/footers, contrast-safe typography, and visual QA via PNG page rendering.

## When It Triggers

Any task requiring PDF generation, PDF rebuild, or PDF visual QA for 0x Vaults deliverables.

## Step-by-Step Execution Rules

### 1. Design Phase

- Use ReportLab `BaseDocTemplate` with separate page templates (cover vs. content)
- Custom `onPage` callbacks for running headers/footers (page numbers, vault branding)
- `KeepTogether()` for headings + following content (equivalent to `break-after: avoid`)
- `KeepTogether()` for tables and figures (equivalent to `break-inside: avoid`)
- Fixed color palette: dark navy (`#0f172a`), cyan accent (`#06b6d4`), amber accent (`#f59e0b`), muted text (`#334155`)
- Contrast check: body text ≥ 4.5:1 against background

### 2. Build Phase

- Generate PDF with ReportLab flowables (Paragraph, Table, Image, Spacer, HRFlowable, PageBreak)
- One image per slide page, scaled to fit within margins with centered alignment
- No duplicate cover blocks — cover content appears once, on page 1 only

### 3. Visual QA Phase (mandatory)

- Render every PDF page to PNG using PyMuPDF (`pymupdf`/`fitz`, `page.get_pixmap(dpi=150)`)
- Inspect each PNG for: text overlap, contrast failures, clipped content, orphan headings, split tables, footer collisions, empty whitespace
- Fix any flaw, re-render, re-inspect until all pages are clean
- Text extraction alone is insufficient — visual inspection is required

## Output / Quality Check

- PDF opens without errors
- Every page has consistent header/footer
- No heading appears at page bottom without following content
- No table splits across pages awkwardly
- No text overlap or clipping visible in PNG renders
- Slide images fill their pages without giant empty gaps

## Links

- [[00_INDEX]]
- [[AGENTS.md]]
- [[09_TOOLS/token_counter]]

---