# Room: Architecture

> Stack, file structure, env config, deploy info.
> Updated when infra or config changes.

## Stack
- Plain HTML / CSS / JS — zero frameworks, zero build step, zero dependencies
- No React, no Vue, no Tailwind, no bundler, no npm
- Open `index.html` directly in browser to preview

## File Structure
```
index.html          ← Main entry point
css/style.css       ← Design system (tokens, layout, components)
css/animations.css  ← Keyframes + scroll reveal animations
js/main.js          ← Particle canvas, typewriter, nav, parallax, contact form
assets/             ← Images, icons, fonts
favicon.svg         ← Lightning bolt, purple→rose gradient, #0F0F23 bg
legion/             ← Memory palace (this system)
ghl-snapshot/       ← Sub-page: free GHL snapshot download
ghl-audit/          ← Sub-page: 20-question GHL audit tool
```

## Architecture Decisions

### 2026-03-22 — Plain HTML/CSS/JS stack
- **Decision:** No frameworks, no build step
- **Why:** Fastest to ship, zero dependencies, host anywhere, edit directly
- **Tradeoff:** Harder to scale components if site grows significantly

### 2026-04-07 — GHL sub-pages as standalone HTML files
- **Decision:** `ghl-snapshot/` and `ghl-audit/` as standalone pages in portfolio
- **Why:** Demonstrates GHL expertise with working tools, not just descriptions — lead magnets
- **Tradeoff:** More pages to maintain. Form backend still not wired.

### 2026-04-08 — MemPalace Wing/Room/Hall memory structure
- **Decision:** Restructured `legion/brain/` into `legion/rooms/` + `legion/halls/` with MemPalace MCP
- **Why:** Topic-scoped files load faster than one big memory.md. Cross-room search via MCP.
- **Tradeoff:** Small setup overhead. Falls back to plain markdown if MCP unavailable.

## Env & Config
- Site root: `C:/Users/User/Documents/Claude Project/kei project/`
- Color system: bg `#0F0F23`, primary `#7C3AED`, cta `#F43F5E`
- **Live URL**: https://keyvin-abillon.netlify.app
- **Netlify siteId**: `c2a2a018-37f7-46fb-a81c-cc2f456e2bab`
- **Deploy command**: `cd "kei project" && npx netlify deploy --dir . --prod`
- No git commits made as of 2026-04-08 (site deployed but never committed)

## Known Gotchas
- Form backend not wired — all `<form>` submissions go nowhere until GHL webhook added
- Social links (`GitHub`, `LinkedIn`, `Twitter`) now have real URLs (keidark13 / abillon13)
- `og:image` meta tag missing — link previews won't render a card image
- Project 3 card link still `href="#"` — needs real URL
- All sub-pages reference `../favicon.svg` (relative path — correct)
