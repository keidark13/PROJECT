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

## Design System
- **Background**: `#0F0F23` (dark navy)
- **Primary accent**: `#7C3AED` (electric violet)
- **CTA / highlight**: `#F43F5E` (rose red)
- **Aesthetic**: Dark neon cyberpunk
- **Typography**: Google Fonts loaded via `<link>` in `<head>`

## Rules — Do Not Violate
- **No frameworks ever** — plain HTML/CSS/JS only
- **Do not reintroduce "Vibe Coder"** — removed by decision, stays removed
- **Do not reintroduce the tech stack icon cloud** — removed by decision, stays removed
- **No build step** — if it requires compiling or bundling, it's wrong for this project
- Do not hardcode form submissions to a placeholder endpoint — form backend is pending

## Pending Work (as of 2026-04-06)
- [ ] Form backend — GHL webhook URL not wired, submissions go nowhere
- [ ] `og:image` meta tag — social link previews will not render without this
- [ ] Project 3 link — still a placeholder, needs real URL
- [ ] First git commit — site has never been committed
- [x] Deploy to production — LIVE https://keyvin-abillon.netlify.app (2026-04-07)
- [x] Headshot added (2026-04-04)
- [x] Full copy rewrite — BrewedOps formula (2026-04-04)
- [x] Animated social dock (2026-04-04)
- [x] About section polish (2026-04-04)

---

## WAT Framework Note
No `tools/` or `workflows/` directory for this project. All changes are direct HTML/CSS/JS edits. Keep it simple — this is a static site.

---

## Memory Palace (Auto-loaded)
> These files are auto-imported every session — main Claude + all subagents see this context.

@legion/PALACE.md
@legion/rooms/architecture.md
@legion/halls/goals.md
