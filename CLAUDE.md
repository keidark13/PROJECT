# Agent Instructions — Kei Project (Keyvin's Personal Brand Site)

## Project Overview
Keyvin's personal brand website. Positions Keyvin as an **Automation Specialist** (primary), SEO Specialist, and CRO Specialist. Target audience: potential clients and employers.

## Stack
- **Plain HTML / CSS / JS only** — zero frameworks, zero build steps, zero dependencies
- No React, No Vue, No Tailwind, No bundler, No npm
- Open `index.html` directly in browser to preview

## Key Directories
```
index.html          Main entry point — open this to preview
css/                Stylesheets
js/                 JavaScript files
assets/             Images, icons, fonts
favicon.svg         Site favicon
legion/PALACE.md        Wing index + room map
legion/rooms/           Topic knowledge (design, architecture, copy, tools)
legion/halls/           Active state (goals, session, parked)
.mempalace/             ChromaDB index — search via: mempalace search "<query>"
```

## Design System (Emerald System — updated 2026-04-09)
- **Background**: `#0A0F0D` (deep dark green)
- **Surface**: `#111A16` (dark green surface)
- **Primary accent**: `#10B981` (emerald green)
- **CTA / highlight**: `#F59E0B` (amber)
- **Aesthetic**: Dark neon emerald
- **Typography**: Space Grotesk (headings), Archivo (body), JetBrains Mono (code/accents) — Google Fonts via `<link>`

## Rules — Do Not Violate
- **No frameworks ever** — plain HTML/CSS/JS only
- **Do not reintroduce "Vibe Coder"** — removed by decision, stays removed
- **Do not reintroduce the tech stack icon cloud** — removed by decision, stays removed
- **No build step** — if it requires compiling or bundling, it's wrong for this project
- Do not hardcode form submissions to a placeholder endpoint — form backend is pending

## Pending Work (as of 2026-04-11)
- [x] Form backend — dual submit to GHL (Cloudflare Worker) + Netlify Forms (2026-04-11)
- [ ] `og:image` meta tag — social link previews will not render without this
- [ ] Add real case study page for Solution13.online
- [ ] Set up GA or Plausible for traffic tracking
- [x] First git commit + GitHub push (2026-04-09/10) — github.com/keidark13/PROJECT
- [x] GitHub Pages backup hosting (2026-04-10)
- [x] All 6 sub-page animated backgrounds (2026-04-10)
- [x] Emerald palette swap from purple/rose (2026-04-09)
- [x] 10 project card backgrounds redesigned (2026-04-09)
- [x] Deploy to production — LIVE https://keyvin-abillon.netlify.app (2026-04-07)

---

## WAT Framework Note
No `tools/` or `workflows/` directory for this project. All changes are direct HTML/CSS/JS edits. Keep it simple — this is a static site.

---

## Memory Palace (Auto-loaded)
> These files are auto-imported every session — main Claude + all subagents see this context.

@legion/PALACE.md
@legion/rooms/architecture.md
@legion/halls/goals.md
