"""Take 16:9 screenshots of all kei website portfolio sub-pages for card thumbnails."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "screenshots"
OUT.mkdir(parents=True, exist_ok=True)

BASE = "http://localhost:8096"

PAGES = [
    ("seo-audit-dashboard", "/seo-audit-dashboard/index.html"),
    ("landing-page-cro-kit", "/landing-page-cro-kit/index.html"),
    ("vibe-template", "/vibe-template/index.html"),
    ("keyword-rank-tracker", "/keyword-rank-tracker/index.html"),
    ("ghl-snapshot", "/ghl-snapshot/index.html"),
    ("ghl-audit", "/ghl-audit/index.html"),
    ("ghl-services", "/ghl-services/index.html"),
    ("local-seo-playbook", "/local-seo-playbook/index.html"),
]

EXTERNAL = [
    ("solution13", "https://solution13.online"),
]

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 1280, "height": 720},
            device_scale_factor=2,
            color_scheme="dark",
        )
        page = await context.new_page()

        for name, path in PAGES:
            url = BASE + path
            print(f"  Capturing {name}...")
            try:
                await page.goto(url, wait_until="networkidle", timeout=15000)
                await page.wait_for_timeout(800)
                await page.screenshot(path=str(OUT / f"{name}.png"), type="png")
                print(f"  OK {name}.png")
            except Exception as e:
                print(f"  FAIL {name}: {e}")

        for name, url in EXTERNAL:
            print(f"  Capturing {name} (external)...")
            try:
                await page.goto(url, wait_until="networkidle", timeout=20000)
                await page.wait_for_timeout(1000)
                await page.screenshot(path=str(OUT / f"{name}.png"), type="png")
                print(f"  OK {name}.png")
            except Exception as e:
                print(f"  FAIL {name}: {e}")

        await browser.close()
    count = len(list(OUT.glob("*.png")))
    print(f"\nDone -- {count} screenshots in assets/screenshots/")

asyncio.run(main())
