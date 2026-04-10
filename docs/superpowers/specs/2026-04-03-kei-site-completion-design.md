# Kei Site Completion — Design Spec
**Date:** 2026-04-03
**Project:** `kei project/` — Keyvin's personal brand site
**Stack:** Plain HTML/CSS/JS — no frameworks, no build step

---

## Scope

Four pending tasks to make the site production-ready:

1. Form backend (GHL webhook)
2. Social + project URL updates
3. og:image generation
4. Deploy to Netlify

---

## Task 1: Form Backend — GHL Webhook

### Decision
Use a GHL webhook as the form submission endpoint. Keeps custom form design intact, routes leads directly into GHL CRM.

### Implementation
**`js/main.js` — `initForm()` function (line ~371)**
- Replace the fake `setTimeout` simulation with a real `fetch()` POST to the GHL webhook URL
- Request body: `{ name, email, message, source: 'kei-site' }`
- Content-Type: `application/json`
- On success (200): show "✓ Sent!" state, reset form
- On error (non-200 or network failure): show error message, re-enable button

**`index.html`**
- No changes needed to the form HTML itself

**GHL Setup (manual step)**
- Create a new Workflow in GHL
- Trigger: "Webhook Received" (GHL generates a webhook URL)
- Actions: Create/Update Contact → Add Tag `kei-site-lead`
- Copy the webhook URL into `main.js`

### Error Handling
- Network failure: catch block shows "Something went wrong. Try again." in button
- Button re-enabled after 3s on error so user can retry

---

## Task 2: Social + Project URL Updates

### Social Links (`index.html`)
All three `href="#"` social anchors updated:
- GitHub: `https://github.com/keidark13`
- LinkedIn: `https://www.linkedin.com/in/keyvin-abillon-2527ac217/`
- Twitter/X: `https://x.com/abillon13`

### Project Cards (`index.html`)
- Project 3 (Vibe Portfolio Template): `https://github.com/keidark13`
- Projects 1, 2, 4, 6: remain `href="#"` until apps are built
- Project 5 (Solution13): already set to `https://solution13.online` — no change

---

## Task 3: og:image Generation

### Output
- File: `assets/og-image.png`
- Dimensions: 1200×630px (standard Open Graph)
- Generated via HTML template → Playwright screenshot (same pipeline used in 14-day campaign)

### Design Spec
```
Background: #0F0F23 (site bg color)
Accent glow: top-left radial, rgba(124,58,237,0.4) — matches --glow var

Content (centered, vertically):
  "K."                  — JetBrains Mono, 32px, #7C3AED
  "Keyvin Abillon"      — Space Grotesk 700, 56px, #E2E8F0
  "Automation · SEO · CRO Specialist" — Archivo, 26px, #94A3B8
  "solution13.online"   — JetBrains Mono, 18px, #7C3AED (bottom)
```

### Meta Tags Added to `index.html` `<head>`
```html
<meta property="og:image" content="https://[netlify-url]/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://[netlify-url]/assets/og-image.png">
```
Note: og:image URL updated to absolute Netlify URL after deploy.

### Generator Script
- File: `tools/generate_og_image.py`
- Uses Playwright (already installed) to screenshot the HTML template
- Output saved to `assets/og-image.png`

---

## Task 4: Deploy to Netlify

### Method
Netlify Drop — manual drag-and-drop. No CLI, no account linking required.

### Steps
1. Open `netlify.com/drop` in browser
2. Drag the `kei project/` folder onto the page
3. Netlify assigns a live URL (e.g. `https://random-name.netlify.app`)
4. Update og:image meta tag to use absolute URL
5. (Optional later) Add custom domain

### Post-Deploy
- Update `og:image` and `twitter:image` meta tags to absolute Netlify URL
- Test social share preview via Twitter Card Validator or Facebook Debugger

---

## File Change Summary

| File | Change |
|---|---|
| `js/main.js` | Replace fake submit with real GHL webhook fetch |
| `index.html` | Update 3 social URLs, 1 project URL, add og:image meta tags |
| `assets/og-image.png` | New file — generated via Playwright |
| `tools/generate_og_image.py` | New file — og:image generator script |

---

## Out of Scope
- Building apps for projects 1, 2, 4, 6 (deferred to next session)
- Custom domain setup (after Netlify deploy)
- GHL workflow automation beyond contact creation
