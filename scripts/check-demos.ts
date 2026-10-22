/**
 * Check demo URLs with a real browser, because many hosts reject plain
 * `fetch` (Streamlit, LinkedIn, Product Hunt) while serving browsers fine.
 *
 * Run with: npx tsx scripts/check-demos.ts
 */
import { chromium } from "playwright";

const URLS = [
  "https://internship-assessment-er3kjmh8nw5vvj8wgwxlmc.streamlit.app/",
  "https://walkcast.kunjshah.in",
  "https://developer-onboard.vercel.app",
  "https://engineeros-delta.vercel.app/",
  "https://lattice.kunjshah.in",
];

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  for (const url of URLS) {
    try {
      const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      const status = res?.status() ?? 0;
      const title = await page.title().catch(() => "");
      const bodyText = await page
        .evaluate(() => (document.body?.innerText ?? "").trim().slice(0, 120))
        .catch(() => "");
      const looksLikeError =
        /streamlit|error|not found|404|doesn.t exist|sleeping/i.test(`${title} ${bodyText}`);
      console.log(
        `${String(status).padStart(3)}  ${url}\n      title="${title}"${looksLikeError ? "  <-- possible error page" : ""}`,
      );
    } catch (error) {
      console.log(`ERR  ${url}\n      ${error instanceof Error ? error.message.split("\n")[0] : "?"}`);
    }
  }

  await context.close();
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
