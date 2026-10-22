/**
 * Check profile URLs with a real browser.
 *
 * LinkedIn, Medium, Peerlist and Product Hunt all refuse plain `fetch`
 * requests (403/429) while serving a browser normally, so a link checker
 * reports them as broken when they are not. This uses a browser instead.
 *
 * Run with: npx tsx scripts/check-social.ts
 */
import { chromium } from "playwright";
import { site } from "../lib/site-data";

const URLS = [
  site.links.linkedin,
  site.links.peerlist,
  site.links.medium,
  site.links.producthunt,
  site.links.x,
  site.links.huggingface,
];

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  for (const url of URLS) {
    try {
      const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      const status = res?.status() ?? 0;
      const title = await page.title().catch(() => "");
      console.log(`${String(status).padStart(3)}  ${url}\n      "${title.slice(0, 90)}"`);
    } catch (error) {
      console.log(
        `ERR  ${url}\n      ${error instanceof Error ? error.message.split("\n")[0] : "?"}`,
      );
    }
  }

  await context.close();
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
