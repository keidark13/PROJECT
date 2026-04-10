# MemPalace Legion Brain Restructure — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `legion/brain/` into a MemPalace Wing/Room/Hall layout and install MemPalace MCP locally for the kei project.

**Architecture:** Migrate 4 flat `.md` brain files into topic-scoped Room files under `legion/rooms/` and session/goal/parked Halls under `legion/halls/`. Install MemPalace via pip, init and mine the new structure, then register as a local MCP server in Claude Code.

**Tech Stack:** Python 3.11, MemPalace (pip), ChromaDB (MemPalace dependency), Claude Code MCP (`-s local`)

---

## Chunk 1: Install & Verify MemPalace

### Task 1: Install MemPalace via pip

**Files:**
- No files changed — pip install only

- [ ] **Step 1: Install MemPalace**

```bash
C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe -m pip install mempalace
```

Expected output: `Successfully installed mempalace-x.x.x`

- [ ] **Step 2: Verify install**

```bash
C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe -m mempalace --version
```

Expected: version string printed, no errors

- [ ] **Step 3: If install fails** — check error:
  - `chromadb` conflict → `pip install mempalace --no-deps` then `pip install chromadb` separately
  - `sqlite3` missing → already bundled in Python 3.11, should not fail
  - Windows path error → use forward slashes in all subsequent commands

---

### Task 2: Init MemPalace in kei project

**Files:**
- Creates: `kei project/.mempalace/` (auto-generated ChromaDB index dir)

- [ ] **Step 1: Navigate to kei project root**

```bash
cd "C:/Users/User/Documents/Claude Project/kei project"
```

- [ ] **Step 2: Init MemPalace**

```bash
C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe -m mempalace init .
```

Expected: `.mempalace/` directory created at project root, init confirmation message

- [ ] **Step 3: Verify `.mempalace/` exists**

```bash
ls .mempalace/
```

Expected: config file + empty ChromaDB store visible

---

## Chunk 2: Restructure legion/brain/ → Wing/Room/Hall

### Task 3: Create new directory structure

**Files:**
- Create: `legion/rooms/` directory
- Create: `legion/halls/` directory
- Create: `legion/PALACE.md` (new wing index)

- [ ] **Step 1: Create directories**

```bash
mkdir -p "C:/Users/User/Documents/Claude Project/kei project/legion/rooms"
mkdir -p "C:/Users/User/Documents/Claude Project/kei project/legion/halls"
```

- [ ] **Step 2: Create PALACE.md wing index**

Create `legion/PALACE.md`:

```markdown
# Palace — Kei Project Wing

> Wing map for Keyvin's personal brand site memory system.
> Updated by kei-closer at end of each session.

## Rooms (Topic Knowledge)
- [design.md](rooms/design.md) — Visual system, aesthetic decisions, ADRs
- [architecture.md](rooms/architecture.md) — Stack, env config, file paths, deploy
- [copy.md](rooms/copy.md) — Positioning, copy formulas, labels
- [tools.md](rooms/tools.md) — Scripts, rembg, Playwright, local tooling

## Halls (Active State)
- [goals.md](halls/goals.md) — Sprint tasks, launch checklist
- [session.md](halls/session.md) — Current session log
- [parked.md](halls/parked.md) — Parked ideas, experiments, deferred work

## Tunnels (Cross-references)
- design ↔ copy — Aesthetic decisions inform copy tone
- architecture ↔ tools — Deploy config + tooling are coupled

## Search
Use `mempalace search "<query>"` from kei project root to retrieve across all rooms.
```

---

### Task 4: Migrate memory.md → 4 Room files

**Files:**
- Create: `legion/rooms/design.md`
- Create: `legion/rooms/architecture.md`
- Create: `legion/rooms/copy.md`
- Create: `legion/rooms/tools.md`
- Delete: `legion/brain/memory.md` (after migration verified)

- [ ] **Step 1: Create `rooms/design.md`**

Content to migrate from `memory.md`:
- Architecture Decisions section (design-related ADRs only):
  - BeamsBackground port to vanilla JS canvas
  - Tech stack icon cloud removed
  - About section bg matches page bg
  - Headshot drop-shadow glow only
  - Favicon change to lightning bolt
- Patterns We Use section
- What We Tried and Rejected section
- ADR Log entries: favicon, about section, social dock, headshot

```markdown
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
```

- [ ] **Step 2: Create `rooms/architecture.md`**

```markdown
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
```

- [ ] **Step 3: Create `rooms/copy.md`**

```markdown
# Room: Copy

> Positioning, copy formulas, messaging decisions, labels.
> Updated when brand positioning or copy strategy changes.

## Positioning
- **Primary role**: Automation Specialist
- **Secondary roles**: SEO Specialist, CRO Specialist
- "Vibe Coder" — REMOVED, do not reintroduce (unclear to clients, not searchable)

## Copy Formula (BrewedOps Pattern — applied 2026-04-04)
- **Hero eyebrow**: Pain-first hook (short, one line)
  - Current: "Your leads are leaking. Let's fix that."
- **H1**: Confident, no "Hi I'm" greeting
  - Current: "Keyvin."
- **Stats row**: `3+ Years | 20+ Clients | 40% ROAS` — gradient numbers, between tagline and buttons
- **About bio**: You-get framing — leads with client outcome, not Keyvin's resume
- **CTA labels**: Dual CTA — primary action + secondary browse

## Architecture Decision

### 2026-04-04 — BrewedOps copy formula applied site-wide
- **Decision:** Rewrote all copy using BrewedOps pain-first formula
- **Why:** Default portfolio copy is forgettable. Pain-first positions Keyvin as relief, not a resume entry.
- **Tradeoff:** Aggressive, specific copy — requires updating if positioning shifts

### 2026-03-22 — "Automation Specialist" as primary identity
- **Decision:** Dropped "Vibe Coder". Primary = Automation Specialist.
- **Why:** Specific, searchable, reflects actual GHL + workflow work
- **Tradeoff:** Slightly less personal in exchange for clarity and professionalism
```

- [ ] **Step 4: Create `rooms/tools.md`**

```markdown
# Room: Tools

> Scripts, local tooling, Python utilities, image generation.
> Updated when new tools are added or tool configs change.

## Local Preview
```bash
cd "C:/Users/User/Documents/Claude Project/kei project"
python -m http.server 8765
```
Open: http://localhost:8765

## Deploy
```bash
cd "C:/Users/User/Documents/Claude Project/kei project"
npx netlify deploy --dir . --prod
```
Netlify siteId: `c2a2a018-37f7-46fb-a81c-cc2f456e2bab` (in `.netlify/state.json`)

## rembg (Background Removal)
- Python 3.11, u2net model at `C:/Users/User/.u2net/`
- Usage: `from rembg import remove` — pass image bytes, returns PNG bytes with transparent bg

## MemPalace
- Init: `python -m mempalace init .` (from kei project root)
- Mine: `python -m mempalace mine legion/`
- Search: `python -m mempalace search "<query>"`
- MCP: registered at `-s local` scope

## References
- BrewedOps portfolio reference: `reference_brewedops_portfolio.md`
- Spec doc (unresolved reviewer flags): `docs/superpowers/specs/2026-04-03-kei-site-completion-design.md`
```

---

### Task 5: Migrate hall files

**Files:**
- Move: `legion/brain/goals.md` → `legion/halls/goals.md`
- Move: `legion/brain/session.md` → `legion/halls/session.md`
- Move: `legion/brain/parked-ideas.md` → `legion/halls/parked.md`

- [ ] **Step 1: Copy hall files to new location**

```bash
cp "C:/Users/User/Documents/Claude Project/kei project/legion/brain/goals.md" \
   "C:/Users/User/Documents/Claude Project/kei project/legion/halls/goals.md"

cp "C:/Users/User/Documents/Claude Project/kei project/legion/brain/session.md" \
   "C:/Users/User/Documents/Claude Project/kei project/legion/halls/session.md"

cp "C:/Users/User/Documents/Claude Project/kei project/legion/brain/parked-ideas.md" \
   "C:/Users/User/Documents/Claude Project/kei project/legion/halls/parked.md"
```

- [ ] **Step 2: Verify all 3 files exist in halls/**

```bash
ls "C:/Users/User/Documents/Claude Project/kei project/legion/halls/"
```

Expected: `goals.md  parked.md  session.md`

- [ ] **Step 3: Remove old brain/ directory**

```bash
rm -rf "C:/Users/User/Documents/Claude Project/kei project/legion/brain/"
```

---

## Chunk 3: Mine, Wire MCP, Update CLAUDE.md

### Task 6: Mine legion/ with MemPalace

**Files:**
- Populates: `.mempalace/` ChromaDB index

- [ ] **Step 1: Run mine on legion/**

```bash
cd "C:/Users/User/Documents/Claude Project/kei project"
C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe -m mempalace mine legion/
```

Expected: indexing output for all 7 `.md` files, no errors

- [ ] **Step 2: Test search**

```bash
C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe -m mempalace search "favicon"
```

Expected: results from `rooms/design.md` mentioning lightning bolt favicon

- [ ] **Step 3: Test cross-room search**

```bash
C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe -m mempalace search "deploy netlify"
```

Expected: results from `rooms/architecture.md` and/or `rooms/tools.md`

---

### Task 7: Register MemPalace MCP (local scope)

**Files:**
- Modifies: `.claude/settings.local.json` (auto-managed by claude mcp add)

- [ ] **Step 1: Register MCP server**

```bash
claude mcp add mempalace -s local -- C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe -m mempalace.mcp_server
```

Expected: confirmation message, no errors

- [ ] **Step 2: Verify registration**

```bash
claude mcp list
```

Expected: `mempalace` listed under local scope

- [ ] **Step 3: Test MCP tool availability**

Start a new Claude Code session in the kei project directory and verify MemPalace tools appear in available deferred tools list.

---

### Task 8: Update CLAUDE.md

**Files:**
- Modify: `kei project/CLAUDE.md` — update brain file paths

- [ ] **Step 1: Update Key Directories section in CLAUDE.md**

Find:
```
legion/brain/       Session memory (memory.md, goals.md, parked-ideas.md)
```

Replace with:
```
legion/PALACE.md        Wing index + room map
legion/rooms/           Topic knowledge (design, architecture, copy, tools)
legion/halls/           Active state (goals, session, parked)
.mempalace/             ChromaDB index (auto-generated, do not edit)
```

- [ ] **Step 2: Verify CLAUDE.md looks correct**

Read the file and confirm the paths section is accurate.

---

### Task 9: Final verification

- [ ] **Step 1: Verify full structure**

```bash
find "C:/Users/User/Documents/Claude Project/kei project/legion" -type f
```

Expected output:
```
legion/PALACE.md
legion/rooms/design.md
legion/rooms/architecture.md
legion/rooms/copy.md
legion/rooms/tools.md
legion/halls/goals.md
legion/halls/session.md
legion/halls/parked.md
```

- [ ] **Step 2: Confirm brain/ is gone**

```bash
ls "C:/Users/User/Documents/Claude Project/kei project/legion/brain/" 2>/dev/null || echo "REMOVED OK"
```

Expected: `REMOVED OK`

- [ ] **Step 3: Confirm .mempalace/ index exists**

```bash
ls "C:/Users/User/Documents/Claude Project/kei project/.mempalace/"
```

Expected: ChromaDB files present

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/User/Documents/Claude Project/kei project"
git add legion/ .mempalace/ .claude/ CLAUDE.md
git commit -m "feat: restructure legion/brain to MemPalace Wing/Room/Hall layout + install MCP"
```

---

## Rollback Plan

If MemPalace install fails or MCP causes issues:

1. Keep the Room/Hall file structure (Option B still works without the tool)
2. Remove MCP: `claude mcp remove mempalace -s local`
3. Remove `.mempalace/` dir: `rm -rf .mempalace/`
4. Structure still works as plain markdown — zero loss

---

## Decision Log

| Decision | Alternatives | Reason |
|---|---|---|
| Option B structure (Wing/Room/Hall) | Keep flat brain/ files | Topic-scoped files = faster Claude retrieval, less noise |
| Local MCP scope (`-s local`) | Global (`-s user`) | Test on kei first before expanding to all projects |
| Migrate content manually | Auto-mine from old brain/ | Content is curated — manual split ensures correct room assignment |
| Keep halls as manual files | Auto-manage via MemPalace | Goals/session/parked change every session — manual control preferred |
