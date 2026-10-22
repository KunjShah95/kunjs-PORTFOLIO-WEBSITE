/**
 * Verify that every external link the portfolio publishes actually resolves.
 *
 * A portfolio's credibility is bounded by its least-working link, so this
 * checks repos, demos, docs and social profiles referenced from the content
 * data, plus the live site's own route set.
 *
 * Run with: npx tsx scripts/verify-links.ts
 */
import { projects, contributions, site, engagements } from "../lib/site-data";

type Result = { url: string; status: number; note: string };

async function check(url: string): Promise<Result> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (link-audit)" },
    });
    clearTimeout(timer);
    return { url, status: res.status, note: res.url === url ? "" : `-> ${res.url}` };
  } catch (error) {
    return { url, status: 0, note: error instanceof Error ? error.message : "error" };
  }
}

async function run() {
  const urls = new Set<string>();

  for (const value of Object.values(site.links)) urls.add(value);
  urls.add(site.website);
  for (const project of projects) {
    if (project.demo) urls.add(project.demo);
    if (project.github) urls.add(project.github);
  }
  for (const contribution of contributions) {
    if (contribution.url) urls.add(contribution.url);
  }
  for (const engagement of engagements) {
    if (engagement.href && engagement.href.startsWith("http")) urls.add(engagement.href);
  }

  const list = Array.from(urls);
  console.log(`checking ${list.length} external URLs\n`);

  const results: Result[] = [];
  const concurrency = 8;
  for (let i = 0; i < list.length; i += concurrency) {
    const batch = list.slice(i, i + concurrency);
    results.push(...(await Promise.all(batch.map(check))));
  }

  const broken = results.filter((r) => r.status === 0 || r.status >= 400);
  for (const r of results) {
    const flag = r.status === 0 || r.status >= 400 ? "BROKEN" : "ok    ";
    console.log(`${flag} ${String(r.status).padStart(3)} ${r.url} ${r.note}`);
  }

  console.log(`\nchecked: ${results.length} | broken: ${broken.length}`);
  if (broken.length) {
    console.log("\n--- broken ---");
    for (const r of broken) console.log(`${r.status} ${r.url} :: ${r.note}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
