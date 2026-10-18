/**
 * Smoke test for the Motion refactor.
 *
 * The bundle work is easy to measure and easy to silently break behaviour, so
 * this asserts the things that actually have to keep working:
 *
 *   1. No console errors / page errors on any route (the `strict` LazyMotion
 *      guard throws if any component still reaches for the full `motion`).
 *   2. The header pill and bottom-nav pill are present and move to the right
 *      item after a client-side navigation.
 *   3. The projection-scoped pills on /projects and /skills still render.
 *   4. Content is actually painted (not a blank shell).
 *
 *   node scripts/motion-smoke.mjs [--base http://localhost:3210]
 */

import { chromium } from "playwright";

const args = process.argv.slice(2);
const i = args.indexOf("--base");
const BASE = i !== -1 && args[i + 1] ? args[i + 1] : "http://localhost:3000";

const ROUTES = ["/", "/open-source", "/projects", "/skills", "/experience", "/contact"];
const DESKTOP = { width: 1280, height: 900 };
const MOBILE = { width: 390, height: 844 };

let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${name}${detail ? ` - ${detail}` : ""}`);
  if (!ok) failures++;
};

const browser = await chromium.launch();

/** Collects console errors and uncaught exceptions for one page. */
async function open(viewport) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  const failed = [];
  page.on("console", (m) => {
    // Network failures are asserted via `failed`, which has the URL. Chrome
    // logs those as a bare "Failed to load resource" with no URL attached, so
    // keeping them here too would just duplicate the check.
    if (m.type() === "error" && !/Failed to load resource/.test(m.text())) {
      errors.push(m.text());
    }
  });
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("response", (r) => {
    // Vercel's analytics script only exists on a deployed host, so it 404s
    // under `next start` regardless of the code under test.
    if (r.status() >= 400 && !r.url().includes("/_vercel/insights")) {
      failed.push(`${r.status()} ${r.url()}`);
    }
  });
  return { context, page, errors, failed };
}

const pillBox = (page, selector) =>
  page.locator(selector).first().boundingBox().catch(() => null);

// ---------------------------------------------------------------------------
console.log(`\ndesktop ${DESKTOP.width}x${DESKTOP.height}`);
{
  const { context, page, errors, failed } = await open(DESKTOP);
  const notFound = new Set();
  for (const route of ROUTES) {
    errors.length = 0;
    failed.length = 0;
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(600);
    check(`no errors on ${route}`, errors.length === 0 && failed.length === 0, [...errors, ...failed].slice(0, 2).join(" | "));
    failed.forEach((f) => notFound.add(f));

    const text = await page.locator("main").first().innerText().catch(() => "");
    check(`${route} renders content`, text.trim().length > 120, `${text.trim().length} chars`);
  }
  if (notFound.size) {
    console.log(`  note  unexpected failures:`);
    [...notFound].slice(0, 5).forEach((f) => console.log(`        ${f}`));
  }

  // The header pill exists on a route whose desktop item is active, and must
  // track it across a client-side navigation.
  await page.goto(`${BASE}/projects`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const HEAD_PILL = "nav[aria-label='Primary'] ul > span[aria-hidden='true']";
  check("header pill is mounted on /projects", (await page.locator(HEAD_PILL).count()) > 0);

  const before = await pillBox(page, HEAD_PILL);
  await page.locator("nav[aria-label='Primary'] a", { hasText: "Experience" }).first().click();
  await page.waitForURL("**/experience", { timeout: 30000 });
  await page.waitForTimeout(1200);
  const after = await pillBox(page, HEAD_PILL);
  check(
    "header pill moves after nav",
    !!before && !!after && Math.abs(after.x - before.x) > 4,
    before && after ? `x ${Math.round(before.x)} -> ${Math.round(after.x)}` : "pill missing"
  );

  // Pill must not sit on top of the label text.
  if (after) {
    const link = await page.locator("nav[aria-label='Primary'] a[aria-current='page']").first().boundingBox();
    check(
      "pill lines up with the active link",
      !!link && Math.abs(after.x - link.x) < 3 && Math.abs(after.width - link.width) < 3,
      link ? `pill x=${Math.round(after.x)} w=${Math.round(after.width)} | link x=${Math.round(link.x)} w=${Math.round(link.width)}` : "no active link"
    );
  }

  // Filter pills sit directly in the filter rail and must track the selection.
  await page.goto(`${BASE}/projects`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const PROJ_PILL = "div[aria-label='Filter projects'] > span[aria-hidden='true']";
  check("project filter pill renders", (await page.locator(PROJ_PILL).count()) > 0);
  const projBefore = await pillBox(page, PROJ_PILL);
  await page.locator("div[aria-label='Filter projects'] button").nth(1).click();
  await page.waitForTimeout(900);
  const projAfter = await pillBox(page, PROJ_PILL);
  check(
    "project filter pill moves on filter change",
    !!projBefore && !!projAfter && Math.abs(projAfter.x - projBefore.x) > 4,
    projBefore && projAfter ? `x ${Math.round(projBefore.x)} -> ${Math.round(projAfter.x)}` : "pill missing"
  );

  await page.goto(`${BASE}/skills`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const STACK_PILL = "div[aria-label='Filter stack by discipline'] > span[aria-hidden='true']";
  check("stack filter pill renders", (await page.locator(STACK_PILL).count()) > 0);
  const stackBefore = await pillBox(page, STACK_PILL);
  await page.locator("div[aria-label='Filter stack by discipline'] [role='radio']").nth(1).click();
  await page.waitForTimeout(900);
  const stackAfter = await pillBox(page, STACK_PILL);
  check(
    "stack filter pill moves on filter change",
    !!stackBefore && !!stackAfter && Math.abs(stackAfter.x - stackBefore.x) > 4,
    stackBefore && stackAfter ? `x ${Math.round(stackBefore.x)} -> ${Math.round(stackAfter.x)}` : "pill missing"
  );

  await context.close();
}

// ---------------------------------------------------------------------------
console.log(`\nmobile ${MOBILE.width}x${MOBILE.height}`);
{
  const { context, page, errors } = await open(MOBILE);
  await page.goto(`${BASE}/projects`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);
  check("no errors on mobile", errors.length === 0, errors.slice(0, 2).join(" | "));

  const TAB_PILL = "nav[aria-label='Tab bar'] ul > span[aria-hidden='true']";
  const tabPill = page.locator(TAB_PILL).first();
  const before = await tabPill.boundingBox().catch(() => null);
  check("tab pill is mounted on /projects", !!before, before ? `x=${Math.round(before.x)}` : "not found");

  await page.locator("nav[aria-label='Tab bar'] a", { hasText: "Experience" }).first().click();
  await page.waitForURL("**/experience", { timeout: 30000 });
  await page.waitForTimeout(1200);
  const after = await tabPill.boundingBox().catch(() => null);
  check(
    "tab pill moves after nav",
    !!before && !!after && Math.abs(after.x - before.x) > 4,
    before && after ? `x ${Math.round(before.x)} -> ${Math.round(after.x)}` : "pill missing"
  );

  const link = await page.locator("nav[aria-label='Tab bar'] a[aria-current='page']").first().boundingBox();
  check(
    "tab pill is inset inside the active tab",
    !!after && !!link && after.x > link.x && after.x + after.width < link.x + link.width,
    link && after ? `pill x=${Math.round(after.x)} w=${Math.round(after.width)} | tab x=${Math.round(link.x)} w=${Math.round(link.width)}` : "missing"
  );
  await context.close();
}

await browser.close();
console.log(`\n${failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}\n`);
process.exit(failures === 0 ? 0 : 1);
