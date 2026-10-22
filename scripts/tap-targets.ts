/**
 * Re-check only the tap targets that the audit flagged, on a 375px phone.
 *
 * Run with: npx tsx scripts/tap-targets.ts [url]
 */
import { chromium } from "playwright";

const URL = process.argv[2] ?? "https://kunjshah.in";

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  const targets = await page.$$eval("a, button, input, select, textarea", (els) =>
    els
      .map((el) => {
        const r = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        const hidden =
          style.visibility === "hidden" || style.display === "none" || style.opacity === "0";
        return {
          text: (el.textContent ?? el.getAttribute("aria-label") ?? "").trim().slice(0, 38),
          w: Math.round(r.width),
          h: Math.round(r.height),
          tag: el.tagName,
          cls: String(el.className).slice(0, 60),
          hidden: hidden || r.width === 0,
        };
      })
      .filter((t) => !t.hidden && (t.w < 24 || t.h < 24)),
  );

  console.log(`small tap targets: ${targets.length}`);
  for (const t of targets) {
    console.log(`  ${t.w}x${t.h}  "${t.text}"  <${t.tag} class="${t.cls}">`);
  }

  // LCP, measured on a warm cache. The first hit on a cold Next.js image
  // optimiser is dominated by on-demand optimisation, which production serves
  // from cache and Vercel's edge instead.
  const vitals = (await page.evaluate(
    `(() => new Promise((resolve) => {
      let lcp = 0;
      let tag = "";
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const e = entry;
            lcp = e.startTime;
            if (e.element) tag = e.element.tagName;
          }
        }).observe({ type: "largest-contentful-paint", buffered: true });
      } catch (err) {}
      setTimeout(() => resolve({ lcp: Math.round(lcp), tag }), 1500);
    }))()`,
  )) as { lcp: number; tag: string };
  console.log(`LCP: ${vitals.lcp}ms (${vitals.tag})`);

  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
