# Room: Tools

> Scripts, local tooling, Python utilities, image generation.
> Updated when new tools are added or tool configs change.

## Local Preview
```bash
cd "C:/Users/User/Documents/Claude Project/kei website portfolio"
python -m http.server 8765
```
Open: http://localhost:8765

## Deploy
```bash
cd "C:/Users/User/Documents/Claude Project/kei website portfolio"
npx netlify deploy --dir . --prod
```
Netlify siteId: `c2a2a018-37f7-46fb-a81c-cc2f456e2bab` (in `.netlify/state.json`)

## rembg (Background Removal)
- Python 3.11, u2net model at `C:/Users/User/.u2net/`
- Usage: `from rembg import remove` — pass image bytes, returns PNG bytes with transparent bg

## MemPalace
- Python path: `C:/Users/User/AppData/Local/Programs/Python/Python311/python.exe`
- Init: `python -m mempalace init legion/`
- Mine: `python -m mempalace mine legion/`
- Search: `python -m mempalace search "<query>"`
- MCP: registered at `-s local` scope for kei website portfolio

## References
- BrewedOps portfolio reference: `reference_brewedops_portfolio.md`
- Spec doc (unresolved reviewer flags): `docs/superpowers/specs/2026-04-03-kei-site-completion-design.md`
