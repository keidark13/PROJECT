# Room: Design

> Visual system, aesthetic decisions, component ADRs.
> Updated when design decisions are made or reversed.

## Design System
- Background: `#0F0F23` (dark navy)
- Primary accent: `#7C3AED` (electric violet)
- CTA / highlight: `#F43F5E` (rose red)
- Aesthetic: Dark neon cyberpunk
- Typography: Space Grotesk (headings), Archivo (body), JetBrains Mono (code/accents)
- Fonts loaded via Google Fonts `<link>` in `<head>`

## Established Patterns
- Dark neon cyberpunk aesthetic is the established visual language — maintain on all additions
- Sections order: Nav → Hero → About → Projects → Contact → Footer
- Accessibility: ARIA labels, focus rings, skip link, `prefers-reduced-motion` support

## Architecture Decision Records

### 2026-03-22 — BeamsBackground ported from React to vanilla JS canvas
- **Decision:** Ported BeamsBackground animated hero effect to vanilla JS canvas
- **Why:** Zero-framework rule. Avoids 45KB+ React dependency for one visual effect.
- **Tradeoff:** Manual port — no upstream updates if React component changes

### 2026-03-22 — Tech stack icon cloud removed
- **Decision:** Tech stack icon cloud section removed
- **Why:** Cluttered page, diluted positioning message
- **Tradeoff:** Less visible signal of technical breadth

### 2026-04-04 — Headshot: drop-shadow glow only, no border card
- **Decision:** `filter: drop-shadow(0 0 28px rgba(124,58,237,0.6))` — no card/border
- **Why:** Card felt like generic template UI. Glow is consistent with cyberpunk aesthetic.
- **Tradeoff:** Relies on transparent PNG cutout being clean

### 2026-04-04 — About section bg = page bg (not surface)
- **Decision:** About section bg changed from `--bg-surface` (#16162A) to `--bg` (#0F0F23)
- **Why:** Surface color created jarring block effect
- **Tradeoff:** Section boundaries less distinct — relies on spacing/typography

### 2026-04-04 — Social dock: vanilla CSS, no React
- **Decision:** Animated social dock built entirely in vanilla CSS
- **Why:** Zero-framework rule
- **Tradeoff:** Manual port, no upstream inheritance

### 2026-04-07 — Favicon: lightning bolt over "K" letter
- **Decision:** Lightning bolt SVG, purple `#7C3AED` → rose `#F43F5E` gradient on `#0F0F23` bg
- **Why:** More distinctive, brand-aligned, stronger at small sizes
- **Tradeoff:** None significant

## What We Tried and Rejected
- **Tech stack icon cloud** — built 2026-03-22, rejected: cluttered, diluted positioning
- **"Vibe Coder" role label** — considered 2026-03-22, rejected: unclear to clients, not searchable
- **Border card around headshot** — rejected 2026-04-04: felt like generic template
