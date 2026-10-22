/**
 * Capture full-page screenshots of the live site at desktop and mobile.
 *
 * Run with: npx tsx scripts/shots.ts [url]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.argv[2] ?? "https://kunjshah.in";
const OUT = "audit-shots";

async function run() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 375, height: 812 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2000);

    // Above the fold.
    await page.screenshot({ path: `${OUT}/${viewport.name}-fold.png` });
    // Full page, with motion disabled so nothing is caught mid-animation.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `${OUT}/${viewport.name}-full.png`, fullPage: true });

    // Dark theme.
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-theme", "dark");
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${viewport.name}-dark-fold.png` });

    console.log(`captured ${viewport.name}`);
    await context.close();
  }

  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
