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

## Articles / Resources to Read
- ~~Formspree vs Web3Forms vs Resend~~ — RESOLVED: using Netlify Forms (already on Netlify, zero config)

## Refactors to Consider Later
- Extract the canvas BeamsBackground into its own `js/beams.js` module for clarity
- Move inline CSS variables from `:root` into a dedicated `css/tokens.css` file for better organization

## Apps / Tools (raised 2026-04-04) — ALL BUILT ✅
- ~~SEO Audit Dashboard~~ — LIVE
- ~~Landing Page CRO Kit~~ — LIVE
- ~~Keyword Rank Tracker~~ — LIVE (+ animated grid bg)
- ~~Local SEO Playbook~~ — LIVE

## Design Polish (raised 2026-04-04)
- Spec doc reviewer flagged issues in `docs/superpowers/specs/2026-04-03-kei-site-completion-design.md` — revisit before form backend implementation to avoid rebuilding
