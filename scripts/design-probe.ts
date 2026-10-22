/**
 * Extract the rendered design signature of a page: typography scale, colour
 * usage, spacing rhythm, and component patterns.
 *
 * Run with: npx tsx scripts/design-probe.ts [url]
 */
import { chromium } from "playwright";

const URL = process.argv[2] ?? "https://kunjshah.in";

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  // Passed as a string: the tsx/esbuild transform rewrites arrow functions
  // with a `__name` helper that does not exist in the browser context.
  const probe = (await page.evaluate(`(() => {
    const seen = new Map();
    const bump = (key) => seen.set(key, (seen.get(key) || 0) + 1);

    const all = Array.from(document.querySelectorAll('body *'));
    for (const el of all) {
      const s = getComputedStyle(el);
      if (el.children.length === 0 && (el.textContent || '').trim()) {
        bump('font:' + s.fontFamily.split(',')[0] + ' ' + s.fontSize + '/' + s.lineHeight + ' w' + s.fontWeight);
        bump('color:' + s.color);
      }
    }

    const shapes = new Map();
    const bumps = (key) => shapes.set(key, (shapes.get(key) || 0) + 1);
    for (const el of all) {
      const s = getComputedStyle(el);
      if (s.borderTopWidth !== '0px' || s.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        bumps('radius:' + s.borderTopLeftRadius + ' border:' + s.borderTopWidth + ' ' + s.borderTopColor);
      }
      if (s.boxShadow !== 'none') bumps('shadow:' + s.boxShadow.slice(0, 50));
      if (s.backgroundImage.includes('gradient')) bumps('gradient:' + s.backgroundImage.slice(0, 60));
    }

    const sections = Array.from(document.querySelectorAll('section, header, footer')).map((el) => {
      const r = el.getBoundingClientRect();
      return { h: Math.round(r.height), top: Math.round(r.top + window.scrollY) };
    });

    const gradients = Array.from(document.querySelectorAll('body *'))
      .filter((el) => getComputedStyle(el).backgroundImage.includes('gradient'))
      .map((el) => el.tagName + '.' + String(el.className).slice(0, 60));

    return {
      fonts: Array.from(seen.entries()).filter((e) => e[0].startsWith('font:')).sort((a, b) => b[1] - a[1]),
      colors: Array.from(seen.entries()).filter((e) => e[0].startsWith('color:')).sort((a, b) => b[1] - a[1]).slice(0, 14),
      shapes: Array.from(shapes.entries()).sort((a, b) => b[1] - a[1]).slice(0, 18),
      rhythm: sections,
      gradients: gradients,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      totalElements: all.length,
    };
  })()`)) as {
    fonts: [string, number][];
    colors: [string, number][];
    shapes: [string, number][];
    gradients: string[];
    bodyBg: string;
    totalElements: number;
  };

  console.log("=== typography (leaf nodes) ===");
  for (const [k, v] of probe.fonts.slice(0, 22)) console.log(`${String(v).padStart(4)}x  ${k}`);

  console.log("\n=== colors ===");
  for (const [k, v] of probe.colors) console.log(`${String(v).padStart(4)}x  ${k}`);

  console.log("\n=== shapes (radius / border / shadow / gradient) ===");
  for (const [k, v] of probe.shapes) console.log(`${String(v).padStart(4)}x  ${k}`);

  console.log("\n=== gradients in use ===");
  console.log(probe.gradients.length ? probe.gradients.join("\n") : "none");

  console.log("\n=== body bg ===");
  console.log(probe.bodyBg);
  console.log(`total elements: ${probe.totalElements}`);

  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
