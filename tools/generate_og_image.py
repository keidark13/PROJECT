"""
Generate og-image.png (1200x630) from og-image.html using Playwright.
Output: kei website portfolio/assets/og-image.png
"""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).parent.parent
TEMPLATE = ROOT / "tools" / "og-image.html"
OUTPUT = ROOT / "assets" / "og-image.png"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1200, "height": 630})
        await page.goto(TEMPLATE.as_uri())
        await page.wait_for_timeout(1500)  # let fonts load
        await page.screenshot(path=str(OUTPUT), clip={"x": 0, "y": 0, "width": 1200, "height": 630})
        await browser.close()
    print(f"Saved: {OUTPUT}")

asyncio.run(main())
