/**
 * Measures the three JS-cost diagnostics Lighthouse reports, using CDP so the
 * numbers come from a real page load rather than from bundle file sizes:
 *
 *   1. Reduce unused JavaScript - bytes parsed but never executed.
 *   2. Minimize main-thread work - total scripting time.
 *   3. Avoid long main-thread tasks - tasks >= 50ms.
 *
 * Throttled to the Lighthouse mobile profile (Moto G Power, Slow 4G) so the
 * long-task and TBT numbers are comparable to a Lighthouse run.
 *
 *   node scripts/perf-audit.mjs --url http://localhost:3210/open-source --out baseline
 */

import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const arg = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};

const URL_UNDER_TEST = arg("--url", "http://localhost:3000/");
const LABEL = arg("--out", "current");
const SETTLE_MS = Number(arg("--settle", 6000));

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 412, height: 823 } });
const page = await context.newPage();
const cdp = await context.newCDPSession(page);

if (!args.includes("--no-throttle")) {
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
}

await cdp.send("Performance.enable");

// Collected after load with `buffered: true`, which replays entries recorded
// before this ran, so parse and hydration tasks are included.
const collect = () =>
  page.evaluate(
    () =>
      new Promise((resolve) => {
        const long = [];
        const paints = {};
        const lcp = [];
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) long.push({ start: e.startTime, duration: e.duration });
        }).observe({ type: "longtask", buffered: true });
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) paints[e.name] = e.startTime;
        }).observe({ type: "paint", buffered: true });
        new PerformanceObserver((l) => {
          const es = l.getEntries();
          lcp.push(es[es.length - 1].startTime);
        }).observe({ type: "largest-contentful-paint", buffered: true });
        setTimeout(() => resolve({ long, paints, lcp }), 500);
      })
  );

// Track real transfer size per script from the network layer.
const net = new Map();
cdp.on("Network.responseReceived", (e) => {
  if (/\.(m?js)(\?|$)/.test(e.response.url)) {
    net.set(e.requestId, {
      url: e.response.url,
      decoded: Number(e.response.encodedDataLength) || 0,
      fromCache: !!e.response.fromDiskCache,
    });
  }
});
cdp.on("Network.loadingFinished", (e) => {
  const rec = net.get(e.requestId);
  if (rec) rec.transferred = e.encodedDataLength;
});

await cdp.send("Profiler.enable");
await cdp.send("Profiler.setSamplingInterval", { interval: 100 });
await cdp.send("Profiler.start");
// Precise coverage is what distinguishes "parsed but never executed" from
// "executed"; the default sampling profile only gives wall-clock totals.
await cdp.send("Profiler.startPreciseCoverage", { callCount: true, detailed: true });
await cdp.send("Profiler.start");

const response = await page.goto(URL_UNDER_TEST, {
  waitUntil: "networkidle",
  timeout: 120000,
});
const status = response?.status();

// Let post-load work (lazy chunks, hydration, animations) finish before we
// snapshot, then freeze the counters.
await page.waitForTimeout(SETTLE_MS);

const coverage = (await cdp.send("Profiler.takePreciseCoverage")).result;
const profile = await cdp.send("Profiler.stop");

const metrics = await cdp.send("Performance.getMetrics");
const m = Object.fromEntries(metrics.metrics.map((x) => [x.name, x.value]));

const { long: longTasks, paints, lcp: lcpEntries } = await collect();

/**
 * Bytes in a script that V8 never executed.
 *
 * Coverage ranges nest: ranges[0] is the whole function, ranges[1..] are inner
 * blocks. A range with count 0 was never run. Because an unexecuted function
 * also contains unexecuted inner blocks, we count only the outermost zero
 * ranges and then merge overlaps, otherwise the same bytes get added twice.
 */
function unusedBytes(functions) {
  const zero = [];
  let scriptEnd = 0;
  for (const fn of functions) {
    const r = fn.ranges;
    if (!r?.length) continue;
    scriptEnd = Math.max(scriptEnd, r[0].endOffset);
    if (r[0].count === 0) {
      zero.push([r[0].startOffset, r[0].endOffset]);
    } else {
      for (let i = 1; i < r.length; i++) {
        if (r[i].count === 0) zero.push([r[i].startOffset, r[i].endOffset]);
      }
    }
  }
  zero.sort((a, b) => a[0] - b[0]);
  let total = 0;
  let [curStart, curEnd] = zero[0] ?? [0, 0];
  for (let i = 1; i < zero.length; i++) {
    const [s, e] = zero[i];
    if (s <= curEnd) curEnd = Math.max(curEnd, e);
    else {
      total += curEnd - curStart;
      [curStart, curEnd] = [s, e];
    }
  }
  total += zero.length ? curEnd - curStart : 0;
  return { unused: total, total: scriptEnd };
}

const { unused, total, byScript } = coverage.reduce(
  (acc, f) => {
    if (!f.url || !f.functions?.length) return acc;
    const { unused: u, total: t } = unusedBytes(f.functions);
    if (!t) return acc;
    acc.total += t;
    acc.unused += u;
    acc.byScript.push({
      path: f.url.split("/").pop().slice(0, 28),
      kb: +(t / 1024).toFixed(1),
      unusedKb: +(u / 1024).toFixed(1),
    });
    return acc;
  },
  { total: 0, unused: 0, byScript: [] }
);

const fcp = paints["first-contentful-paint"] ?? 0;
const TTI_WINDOW = 10000;
const tbt = longTasks
  .map((t) => Math.min(t.start + t.duration, TTI_WINDOW) - Math.max(t.start, fcp) - 50)
  .filter((v) => v > 0)
  .reduce((s, v) => s + v, 0);

// Lighthouse reports "main-thread work" as the total time the main thread is
// busy: scripting + layout + style + paint, excluding idle.
const MAIN_THREAD = [
  "ScriptDuration",
  "LayoutDuration",
  "RecalcStyleDuration",
  "TaskDuration",
];
const mainThread = Object.fromEntries(
  MAIN_THREAD.filter((k) => m[k] != null).map((k) => [k, +(m[k] * 1000).toFixed(0)])
);

const scripts = [...net.values()];
const report = {
  label: LABEL,
  url: URL_UNDER_TEST,
  status,
  fcpMs: Math.round(paints["first-contentful-paint"] ?? 0),
  lcpMs: Math.round(lcpEntries.at(-1) ?? 0),
  tbtMs: Math.round(tbt),
  longTasks: longTasks.length,
  longTasksDetail: longTasks
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 6)
    .map((t) => ({ startMs: Math.round(t.start), durationMs: Math.round(t.duration) })),
  mainThreadMs: mainThread,
  js: {
    requests: scripts.length,
    transferredKB: +(scripts.reduce((s, x) => s + (x.transferred ?? 0), 0) / 1024).toFixed(1),
    unusedKB: +(unused / 1024).toFixed(1),
    totalAnalyzedKB: +(total / 1024).toFixed(1),
    unusedPct: total ? +((unused / total) * 100).toFixed(1) : 0,
  },
  worstUnused: byScript.sort((a, b) => b.unusedKb - a.unusedKb).slice(0, 12),
  largestScripts: scripts
    .sort((a, b) => (b.transferred ?? 0) - (a.transferred ?? 0))
    .slice(0, 8)
    .map((s) => ({
      path: s.url.split("/").pop(),
      transferredKB: +((s.transferred ?? 0) / 1024).toFixed(1),
    })),
};

console.log(JSON.stringify(report, null, 2));
writeFileSync(`perf-${LABEL}.json`, JSON.stringify(report, null, 2));

await browser.close();
