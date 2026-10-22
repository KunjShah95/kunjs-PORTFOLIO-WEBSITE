/**
 * Audit every quantitative claim in the content layer.
 *
 * Cross-checks the headline numbers against the underlying data so that a
 * claim and its evidence cannot drift apart silently.
 *
 * Run with: npx tsx scripts/claim-audit.ts
 */
import { projects, services, engagements, metrics, achievements } from "../lib/site-data";

async function mergedPrCount(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.github.com/search/issues?q=author:KunjShah95+type:pr+is:merged+-user:KunjShah95+-user:KunjShah01",
      { headers: { "User-Agent": "claim-audit" } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { total_count: number };
    return data.total_count;
  } catch {
    return null;
  }
}

async function run() {
  const actualMerged = await mergedPrCount();

  console.log("=== project inventory ===");
  console.log(`projects defined: ${projects.length}`);
  const withDemo = projects.filter((p) => p.demo).length;
  const withGh = projects.filter((p) => p.github).length;
  const withCaseStudy = projects.filter((p) => p.evaluation).length;
  const withLimitations = projects.filter((p) => p.limitations).length;
  console.log(`with live demo: ${withDemo}`);
  console.log(`with public repo: ${withGh}`);
  console.log(`with evaluation notes: ${withCaseStudy}`);
  console.log(`with stated limitations: ${withLimitations}`);

  console.log("\n=== projects lacking evidence ===");
  for (const p of projects) {
    const gaps: string[] = [];
    if (!p.demo) gaps.push("no demo");
    if (!p.github) gaps.push("no repo");
    if (!p.evaluation) gaps.push("no evaluation");
    if (!p.limitations) gaps.push("no limitations");
    if (gaps.length) {
      console.log(`${p.slug.padEnd(30)} ${p.status?.padEnd(22)} ${gaps.join(", ")}`);
    }
  }

  console.log("\n=== headline number consistency ===");
  console.log(`metrics (static): ${JSON.stringify(metrics)}`);
  console.log(`live merged PRs from GitHub API: ${actualMerged}`);

  // The stat tile reads from the live API; the hero hint reads from the
  // static `metrics` array. If these disagree the page contradicts itself.
  const staticPr = metrics[1]?.value ?? "?";
  console.log(`static metrics PR string: "${staticPr}" | live: ${actualMerged}`);
  if (actualMerged !== null && !staticPr.startsWith(String(actualMerged))) {
    console.log(
      `MISMATCH: the hero hint says "${staticPr}" while the stat tile shows "${actualMerged}" on the same screen.`,
    );
  }

  console.log("\n=== 'shipped' claim scope ===");
  console.log(`static claim in metrics: "${metrics[0]?.value} Systems Shipped"`);
  console.log(`projects in the index: ${projects.length}`);
  const statuses = new Map<string, number>();
  for (const p of projects) {
    const key = p.status ?? "(none)";
    statuses.set(key, (statuses.get(key) ?? 0) + 1);
  }
  for (const [status, count] of statuses) console.log(`  ${String(count).padStart(2)}x ${status}`);

  console.log("\n=== services ===");
  for (const s of services) {
    console.log(`${s.title.padEnd(42)} proof: ${(s.proof ?? "").slice(0, 70)}`);
  }

  console.log("\n=== engagement paths ===");
  for (const e of engagements) {
    console.log(`${e.audience.padEnd(28)} proof count: ${e.proof.length} | cta: ${e.actionLabel}`);
  }

  console.log("\n=== achievements ===");
  for (const a of achievements) {
    console.log(`${a.value.padEnd(8)} ${a.label.padEnd(22)} ${a.detail}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
