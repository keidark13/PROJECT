"""
Generate cro-checklist.pdf from cro-checklist.html using Playwright.
Output: kei project/landing-page-cro-kit/cro-checklist.pdf
"""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).parent.parent
TEMPLATE = ROOT / "tools" / "cro-checklist.html"
OUTPUT = ROOT / "landing-page-cro-kit" / "cro-checklist.pdf"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(TEMPLATE.as_uri())
        await page.wait_for_timeout(1800)  # let fonts load
        await page.pdf(
            path=str(OUTPUT),
            width="794px",
            height="1123px",
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        await browser.close()
    print(f"Saved: {OUTPUT}")

asyncio.run(main())
