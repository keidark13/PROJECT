# Memory — Long-Term Knowledge

> Curated facts, decisions, and lessons. Updated at end of sessions.
> If this file exceeds 200 lines, split into topic files and add @imports in CLAUDE.md.

---

## Architecture Decisions

### 2026-03-22 — Plain HTML/CSS/JS stack for personal site
- **Decision:** Build Keyvin's personal website with no frameworks, no build step — pure HTML, CSS, and vanilla JS.
- **Why:** Fastest to ship, zero dependencies, no toolchain to maintain. Keyvin can host it anywhere and edit it directly.
- **Tradeoffs:** Harder to scale components if the site grows significantly. No hot reload during development.

### 2026-03-22 — Positioning: Automation Specialist as primary identity
- **Decision:** Dropped "Vibe Coder" entirely. Primary role is "Automation Specialist" with SEO Specialist and CRO Specialist as secondary.
- **Why:** "Vibe Coder" was informal and unclear to potential clients. Automation Specialist is specific, searchable, and reflects the actual GHL + workflow work Keyvin does.
- **Tradeoffs:** Slightly less personal/distinctive branding in exchange for clarity and professionalism.

### 2026-03-22 — BeamsBackground ported from React to vanilla JS canvas
- **Decision:** Ported the BeamsBackground animated hero effect from a React component to a vanilla JS canvas implementation.
- **Why:** The site uses no React. Porting avoids adding a 45KB+ framework dependency for a single visual effect.
- **Tradeoffs:** Manual port means losing upstream updates if the React component ever changes. Canvas rendering is slightly different across browsers.

### 2026-03-22 — Tech stack icon cloud removed
- **Decision:** A tech stack icon cloud section was built then removed at Keyvin's request.
- **Why:** Cluttered the page and shifted focus away from outcomes and positioning.
- **Tradeoffs:** Less visible signal of technical breadth, but cleaner narrative flow.

---

## Known Gotchas
- Form backend is not wired up — all `<form>` submissions go nowhere until a real endpoint (Formspree/Web3Forms) is added.
- All social links (`GitHub`, `LinkedIn`, `Twitter`) are `href="#"` placeholders.
- Project card links are all `href="#"` except Solution13.online — need real URLs before going live.
- `og:image` meta tag is missing — link previews on social will not render a card image.

---

## Env & Config
- Site root: `C:/Users/User/Documents/Claude Project/kei project/`
- Entry point: `index.html`
- Styles: `css/style.css` (design system), `css/animations.css` (keyframes + scroll reveals)
- Scripts: `js/main.js` (particle canvas, typewriter, nav, parallax, contact form)
- Favicon: `favicon.svg` (lightning bolt, purple `#7C3AED` → rose `#F43F5E` gradient on `#0F0F23` bg)
- Color system: bg `#0F0F23`, primary `#7C3AED`, cta `#F43F5E`
- Fonts: Space Grotesk (headings), Archivo (body), JetBrains Mono (code/accents)
- No git commits made as of 2026-04-07 (site is deployed but never committed to git)
- **Live URL**: https://keyvin-abillon.netlify.app — deployed via `npx netlify deploy --dir . --prod`
- **Netlify siteId**: `c2a2a018-37f7-46fb-a81c-cc2f456e2bab`

---

## Patterns We Use
- Dark neon cyberpunk aesthetic is the established visual language for this site — maintain it on additions.
- Sections follow order: Nav → Hero → About → Projects → Contact → Footer.
- Accessibility requirements: ARIA labels, focus rings, skip link, `prefers-reduced-motion` support.

---

## What We Tried and Rejected
- **Tech stack icon cloud section** — built 2026-03-22, rejected because it cluttered the page and diluted the positioning message.
- **"Vibe Coder" as a role label** — considered 2026-03-22, rejected because it is unclear to clients and not searchable.

---

## ADR Log

### 2026-04-07 — Two GHL sub-pages added as live project cards
- **Decision:** Built `ghl-snapshot/` (free GHL snapshot download page) and `ghl-audit/` (20-question interactive GHL audit tool) as standalone pages, added to portfolio in main index.html.
- **Why:** Demonstrates GHL expertise with working tools, not just descriptions. Both serve as lead magnets.
- **Tradeoffs:** More pages to maintain. Form backend still not wired on either page.

### 2026-04-07 — Favicon changed from "K" letter to lightning bolt
- **Decision:** Replaced plain purple "K" favicon with lightning bolt using purple→rose gradient.
- **Why:** More distinctive, brand-aligned, and visually stronger at small favicon sizes.
- **Tradeoffs:** None significant.

### 2026-04-04 — BrewedOps copy formula applied site-wide
- **Decision:** Rewrote all site copy using BrewedOps formula patterns — pain-first hero eyebrow, outcome-led tagline, you-get about bio, dual CTA labels.
- **Why:** Default portfolio copy is forgettable. BrewedOps style leads with client pain and positions Keyvin as the relief, not just a resume entry.
- **Tradeoffs:** Copy is more aggressive and specific — requires updating if positioning shifts.

### 2026-04-04 — Social dock ported to vanilla CSS (no React)
- **Decision:** Animated social dock (tooltip, underline, scale on hover) built entirely in vanilla CSS instead of using a React/Tailwind component.
- **Why:** Project enforces zero-framework rule. Porting keeps the toolchain clean and the file directly editable.
- **Tradeoffs:** Manual port — does not inherit upstream changes if the original React component is updated.

### 2026-04-04 — Headshot displayed with drop-shadow glow only, no border card
- **Decision:** Real headshot (`assets/keyvin-headshot-nobg.png`) rendered with `filter: drop-shadow(0 0 28px rgba(124,58,237,0.6))` and no surrounding card or border.
- **Why:** Border card felt like a generic template UI element. Glow-only treatment is consistent with the cyberpunk aesthetic and makes the photo feel integrated.
- **Tradeoffs:** Less visual separation from background — relies on the transparent PNG cutout being clean.

### 2026-04-04 — About section bg matches page bg (not surface)
- **Decision:** Changed about section background from `--bg-surface` (#16162A) to `--bg` (#0F0F23).
- **Why:** The surface color created a jarring block effect. Merging the section into the page background produces a more cohesive flow.
- **Tradeoffs:** Section boundaries are now less distinct — relies on spacing and typography to separate sections visually.

---

## Tools & Scripts
- **rembg**: Python 3.11, u2net model at `C:/Users/User/.u2net/`. Usage: `from rembg import remove` — pass image bytes, returns PNG bytes with transparent bg.
- **Local preview**: `python -m http.server 8765` from kei project root.
- **BrewedOps reference**: `reference_brewedops_portfolio.md` (in kei project root or docs/).
- **Spec doc**: `docs/superpowers/specs/2026-04-03-kei-site-completion-design.md` — has unresolved reviewer flags, revisit before shipping form backend.
