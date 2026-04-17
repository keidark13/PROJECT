# Parked Ideas

> Not now. Not trash. Just not today.
> Revisit weekly. Promote to goals.md or delete.

---

## Ideas

- 2026-03-22 — Blog / content section — A writing section where Keyvin publishes automation tutorials or case studies. Would position him as a thought leader and drive organic SEO traffic. Not now because the core site needs to ship first.
- 2026-03-22 — Testimonials section — A dedicated section for client quotes/logos. Worthwhile once there are 3+ strong testimonials to show. Placeholder card exists in design language.
- ~~2026-03-22 — Dark/light mode toggle~~ — DONE (implemented 2026-04-07)
- 2026-03-22 — Animated project cards with live metrics — Show real stats (e.g., "↑ 43% conversion rate") that update from a backend. High impact but requires API/CMS infrastructure. Park until after launch.
- 2026-03-22 — GHL automation showcase page — A dedicated sub-page or modal showing actual GHL workflow screenshots or a short walkthrough video. Strong social proof for automation clients.

---

## Experiments to Try
- A/B test hero CTA copy: "Book a Free Audit" vs "Let's Talk Strategy" vs "See What I've Built"
- Test particle density / speed on the BeamsBackground canvas for different device classes

## Tools to Explore
- Flowise — AI agent builder (self-hosted, visual drag-and-drop). Good for kei site chatbot / GHL lead qualification workflows. Install pending as of 2026-04-08.
- repomix — installed, use `npx repomix` per project to pack codebase for Claude context
- Google Apps Script automations — auto-archive, invoice tracker, weekly report auto-send, Drive organizer, auto-reply. Script already deployed at script.google.com. See memory: project_google_apps_script.md
- nanobanana MCP image generation — fixed 2026-04-17, test quality after CC restart. Uses Gemini 2.5 Flash Image model. Images save to `C:\Users\User\nanobanana-images\`. Compare output quality vs Playwright HTML-to-PNG fallback.

## Articles / Resources to Read
- ~~Formspree vs Web3Forms vs Resend~~ — RESOLVED: using Netlify Forms (already on Netlify, zero config)

## Career-Ops Follow-Ups (raised 2026-04-16)
- Loom walkthrough script (60-90 sec) for GHL CV applications — record once, attach to all GHL apps
- Build sample CPD module structure as free pre-deliverable for Pipeline Pro applicant pitch
- 1-page tight CV variants (some platforms cap pages)
- Cover letter DOCX templates auto-generated from each CV
- Apply winning-cv-generator to remaining 4 active job apps (Ruach, GHL Specialist, PlanetArt, Lumaprints) — refresh existing CVs

## Refactors to Consider Later
- Extract the canvas BeamsBackground into its own `js/beams.js` module for clarity
- Move inline CSS variables from `:root` into a dedicated `css/tokens.css` file for better organization
- AdsRadar: code-split xlsx lib to trim 537KB bundle via `build.rollupOptions.output.manualChunks`
- AdsRadar: dark-theme the downloaded HTML dashboard report to match app (currently light-themed for client delivery)
- AdsRadar: add SVG favicon + PWA manifest for install-to-homescreen
- AdsRadar: separate GitHub repo for source (currently only built output is in kei repo)

## Apps / Tools (raised 2026-04-04) — ALL BUILT ✅
- ~~SEO Audit Dashboard~~ — LIVE
- ~~Landing Page CRO Kit~~ — LIVE
- ~~Keyword Rank Tracker~~ — LIVE (+ animated grid bg)
- ~~Local SEO Playbook~~ — LIVE

## Design Polish (raised 2026-04-04)
- Spec doc reviewer flagged issues in `docs/superpowers/specs/2026-04-03-kei-site-completion-design.md` — revisit before form backend implementation to avoid rebuilding

## Client Audit Services (raised 2026-04-11)
- Website audit skill tested on growthhub.net.nz — works well as a service offering via Solution13
- Meta Ads audit done for PBA (Bernard Powell) — could be productized as a paid service
- Consider packaging: "Website Audit + Fix Guide" as a lead magnet or paid micro-service ($97-197)
- Modal popup on project cards — click card → fullscreen modal with live iframe (tested inline, modal version parked)

## Income Growth (raised 2026-04-12)
- Upwork freelance — profile draft ready at career-ops/upwork-profile-complete.md. Blocked on Connects. Complete profile to 100% for free monthly Connects.
- GHL Snapshot selling on GHL Marketplace ($297-997/snapshot) — build 2-3 industry snapshots
- GHL SaaS Mode — white-label GHL to small businesses (₱3-5K/mo per client, recurring)
- Online course: "GHL Automation for Filipino VAs" — large market, sell on Gumroad
- Add pricing page to Solution13.online for audit services

## Site Polish (raised 2026-04-14)
- Custom domain — keyvinabillon.com or similar, point GitHub Pages
- Testimonials section — need 2-3 real client quotes first
- ~~Convert remaining PNG images to WebP~~ — DONE (2026-04-14, 85% reduction)
- Inline critical CSS in <head> for faster first paint
- ~~Add form validation feedback~~ — DONE (2026-04-14, inline errors + Turnstile)
- Offer website audit as paid service via Solution13 ($97-197 per audit — PPTX + fix guide DOCX)

## Personal Finance (raised 2026-04-12)
- Finance tracker built: Abillon-Family-Finance-Tracker.xlsx (8 sheets, March 2026 data)
- Monthly SOA workflow: screenshot SOA → Claude extracts → updates tracker
- Pre-terminate Gas & Expenses first (4 months left, ~₱7.4K) — call BDO for quote
- Pre-terminate GHL Course second (8 months left, ~₱13.2K) — same BDO call
