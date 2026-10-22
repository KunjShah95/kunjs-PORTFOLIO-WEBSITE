/**
 * Read-only audit of the live portfolio.
 *
 * Collects what a page-text extraction cannot: console errors, failed
 * requests, layout shift, tap-target sizes, heading order, focus visibility,
 * and real LCP/CLS numbers.
 *
 * Run with: npx tsx scripts/audit-live.ts [url]
 */
import { chromium, type ConsoleMessage } from "playwright";

const URL = process.argv[2] ?? "https://kunjshah.in";

type Issue = { severity: "critical" | "warning" | "info"; area: string; detail: string };

async function run() {
  const browser = await chromium.launch();
  const issues: Issue[] = [];

  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 375, height: 812 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
    page.on("requestfailed", (req) =>
      failedRequests.push(`${req.url()} :: ${req.failure()?.errorText ?? "failed"}`),
    );
    page.on("response", (res) => {
      if (res.status() >= 400) failedRequests.push(`${res.status()} ${res.url()}`);
    });

    await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2500);

    const vitals = await page.evaluate(
      () =>
        new Promise<{ lcp: number; cls: number; lcpTag: string }>((resolve) => {
          let lcp = 0;
          let lcpTag = "";
          let cls = 0;
          try {
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const e = entry as PerformanceEntry & { element?: Element };
                lcp = e.startTime;
                if (e.element) lcpTag = e.element.tagName;
              }
            }).observe({ type: "largest-contentful-paint", buffered: true });
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const s = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
                if (!s.hadRecentInput) cls += s.value ?? 0;
              }
            }).observe({ type: "layout-shift", buffered: true });
          } catch {
            /* observer unsupported */
          }
          setTimeout(() => resolve({ lcp: Math.round(lcp), cls: Number(cls.toFixed(4)), lcpTag }), 1500);
        }),
    );

    const headings = await page.$$eval("h1,h2,h3,h4,h5,h6", (els) =>
      els.map((el) => ({
        level: Number(el.tagName[1]),
        text: (el.textContent ?? "").trim().slice(0, 70),
      })),
    );
    const h1Count = headings.filter((h) => h.level === 1).length;
    if (h1Count !== 1) {
      issues.push({ severity: "critical", area: "a11y", detail: `h1 count is ${h1Count}, expected 1` });
    }
    for (let i = 1; i < headings.length; i += 1) {
      if (headings[i].level - headings[i - 1].level > 1) {
        issues.push({
          severity: "warning",
          area: "a11y",
          detail: `heading jump h${headings[i - 1].level} -> h${headings[i].level} at "${headings[i].text}"`,
        });
      }
    }

    const smallTargets = await page.$$eval("a, button, input, select, textarea", (els) =>
      els
        .map((el) => {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          const hidden =
            style.visibility === "hidden" || style.display === "none" || style.opacity === "0";
          return {
            text: (el.textContent ?? el.getAttribute("aria-label") ?? "").trim().slice(0, 40),
            w: Math.round(r.width),
            h: Math.round(r.height),
            hidden: hidden || r.width === 0,
          };
        })
        .filter((t) => !t.hidden && (t.w < 24 || t.h < 24)),
    );
    for (const t of smallTargets.slice(0, 12)) {
      issues.push({
        severity: "warning",
        area: `a11y/${viewport.name}`,
        detail: `tap target ${t.w}x${t.h}px on "${t.text}"`,
      });
    }

    const missingAlt = await page.$$eval("img", (els) =>
      els.filter((el) => !el.hasAttribute("alt")).map((el) => el.getAttribute("src") ?? "?"),
    );
    for (const src of missingAlt.slice(0, 8)) {
      issues.push({ severity: "warning", area: "a11y", detail: `img without alt: ${src}` });
    }

    const unnamed = await page.$$eval("button, a", (els) =>
      els
        .filter((el) => {
          const name =
            (el.textContent ?? "").trim() || el.getAttribute("aria-label") || el.getAttribute("title");
          const r = el.getBoundingClientRect();
          return !name && r.width > 0 && r.height > 0;
        })
        .map((el) => el.outerHTML.slice(0, 90)),
    );
    for (const html of unnamed.slice(0, 8)) {
      issues.push({ severity: "warning", area: "a11y", detail: `no accessible name: ${html}` });
    }

    await page.keyboard.press("Tab");
    const focusInfo = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const style = getComputedStyle(el);
      return {
        tag: el.tagName,
        text: (el.textContent ?? "").trim().slice(0, 40),
        outline: style.outlineStyle,
        boxShadow: style.boxShadow.slice(0, 60),
      };
    });
    if (focusInfo && focusInfo.outline === "none" && focusInfo.boxShadow === "none") {
      issues.push({
        severity: "critical",
        area: `a11y/${viewport.name}`,
        detail: `first Tab stop has no visible focus ring: <${focusInfo.tag}> ${focusInfo.text}`,
      });
    }

    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.clientWidth;
      const offenders: string[] = [];
      for (const el of Array.from(document.querySelectorAll("body *"))) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > docWidth + 2) {
          const style = getComputedStyle(el);
          if (style.position === "fixed" || style.visibility === "hidden") continue;
          offenders.push(`${el.tagName}.${String(el.className).slice(0, 50)} right=${Math.round(r.right)}`);
        }
      }
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: docWidth,
        offenders: offenders.slice(0, 8),
      };
    });
    if (overflow.scrollWidth > overflow.clientWidth + 2) {
      issues.push({
        severity: "critical",
        area: `layout/${viewport.name}`,
        detail: `h-overflow ${overflow.scrollWidth}px > ${overflow.clientWidth}px :: ${overflow.offenders.join(" | ")}`,
      });
    }

    const stats = await page.evaluate(() => ({
      words: (document.body.innerText ?? "").trim().split(/\s+/).filter(Boolean).length,
      links: document.querySelectorAll("a").length,
      sections: document.querySelectorAll("section").length,
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
    }));

    console.log(`\n=== ${viewport.name} (${viewport.width}x${viewport.height}) ===`);
    console.log(`title: ${stats.title}`);
    console.log(`meta description length: ${stats.desc.length}`);
    console.log(`DOM word count: ${stats.words}`);
    console.log(`links: ${stats.links} | sections: ${stats.sections}`);
    console.log(`LCP: ${vitals.lcp}ms (${vitals.lcpTag}) | CLS: ${vitals.cls}`);
    console.log(`console errors: ${consoleErrors.length}`);
    for (const e of consoleErrors.slice(0, 10)) console.log(`   ! ${e.slice(0, 160)}`);
    console.log(`failed requests: ${failedRequests.length}`);
    for (const f of [...new Set(failedRequests)].slice(0, 12)) console.log(`   x ${f.slice(0, 160)}`);

    await context.close();
  }

  const context = await browser.newContext();
  const page = await context.newPage();
  const routes = [
    "/",
    "/about",
    "/experience",
    "/education",
    "/projects",
    "/open-source",
    "/skills",
    "/labs",
    "/manifesto",
    "/hackathons",
    "/writing",
    "/contact",
    "/projects/walkcast",
    "/projects/benchmax",
    "/sitemap.xml",
    "/llms.txt",
    "/api/portfolio.json",
  ];
  console.log("\n=== route status ===");
  for (const route of routes) {
    try {
      const res = await page.goto(`${URL}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      const status = res?.status() ?? 0;
      console.log(`${status === 200 ? "ok  " : "FAIL"} ${status} ${route}`);
      if (status !== 200) {
        issues.push({ severity: "critical", area: "links", detail: `${route} returned ${status}` });
      }
    } catch {
      console.log(`FAIL 000 ${route}`);
      issues.push({ severity: "critical", area: "links", detail: `${route} threw` });
    }
  }
  await context.close();
  await browser.close();

  console.log("\n=== issues ===");
  if (issues.length === 0) console.log("none");
  for (const issue of issues) {
    console.log(`[${issue.severity}] ${issue.area}: ${issue.detail}`);
  }
  console.log(`\ntotal issues: ${issues.length}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
