# Goals — Kei / Kei Project Roadmap

> Living document. Check off as done. Add new goals at the top. Archive to memory.md monthly.

Last updated: 2026-04-07

## Now (Active Sprint — Launch Checklist)

### Must fix before launch
- [ ] Wire up contact form backend — GHL webhook URL (Keyvin retrieves from GHL → Automations → New Workflow → Webhook trigger)
- [x] Replace all social link placeholders with real GitHub / LinkedIn / Twitter URLs — DONE (keidark13 / abillon13)
- [ ] Replace Project 3 card `href="#"` with `https://github.com/keidark13`
- [ ] Add `og:image` social card (1200×630 via Playwright template + script)
- [x] Update footer copyright year from 2025 → 2026 — DONE
- [ ] Make first git commit for the site codebase

### Nice to fix before launch
- [ ] Add aria-live="polite" to #role-text span — screen reader support for typewriter effect
- [ ] Remove unused `animFrame` variable — main.js:114
- [ ] Remove duplicate stagger mechanism — keep CSS nth-child delays, remove JS setTimeout delays
- [ ] Replace hardcoded #7C3AED with var(--primary) in animations.css:200

## Next (Queued)
- [x] Deploy the site — DONE 2026-04-07 → https://keyvin-abillon.netlify.app
- [ ] Add a real case study page for Solution13.online
- [ ] Set up Google Analytics or Plausible for traffic tracking
- [ ] Write and add 2–3 more real project cards as client work grows

## Done ✓
- [x] 2026-03-22 — Built full personal brand website from scratch (index.html, CSS, JS, favicon)
- [x] 2026-03-22 — Established dark neon cyberpunk design system
- [x] 2026-03-22 — Ported BeamsBackground hero effect to vanilla JS canvas
- [x] 2026-03-22 — Defined positioning: Automation Specialist / SEO Specialist / CRO Specialist
- [x] 2026-03-22 — Added Solution13.online as a real client project card
- [x] 2026-03-22 — Ran full code review — no security issues, launch blockers identified and logged
- [x] 2026-04-04 — Replaced "K" avatar with real headshot (rembg background removal, purple glow float)
- [x] 2026-04-04 — Rewrote all site copy using BrewedOps pain-first formula
- [x] 2026-04-04 — Built and wired animated social dock (vanilla CSS, real URLs)
- [x] 2026-04-04 — About section background merged with page background for visual cohesion
- [x] 2026-04-07 — Built GHL Snapshot download page (`ghl-snapshot/`)
- [x] 2026-04-07 — Built GHL Audit Tool (`ghl-audit/`) — 20 questions, score ring, recommendations
- [x] 2026-04-07 — Replaced favicon with lightning bolt (purple→rose gradient)
- [x] 2026-04-07 — Fixed dark mode logo visibility (CSS filter on tool marquee icons)
- [x] 2026-04-07 — Fixed project card icon dark box bug (CSS cascade top/bottom conflict)
- [x] 2026-04-07 — Deployed to Netlify → https://keyvin-abillon.netlify.app

---

## Not Doing (Explicit Scope Limits)
- No React, no Vue, no build toolchain — site stays plain HTML/CSS/JS
- No "Vibe Coder" label — removed by decision, do not reintroduce
- No tech stack icon cloud — removed by decision, do not reintroduce
