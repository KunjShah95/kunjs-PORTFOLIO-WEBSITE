/**
 * Break the merged-pull-request total down by repository.
 *
 * The portfolio states "60+ PRs merged into OWASP, Microsoft and Ollama".
 * That phrasing implies the volume sits in those repositories, so this
 * measures the actual distribution across every external repo contributed to.
 *
 * Run with: npx tsx scripts/pr-distribution.ts
 */
import type { LivePullRequest } from "../lib/github";

const AUTHOR = "KunjShah95";
const OWN = ["KunjShah95", "KunjShah01"];
const PAGE_SIZE = 100;

type SearchItem = {
  title: string;
  html_url: string;
  number: number;
  created_at: string;
  repository_url: string;
  pull_request?: { merged_at: string | null };
};

async function search(page: number): Promise<{ total_count: number; items: SearchItem[] } | null> {
  const exclude = OWN.map((u) => `-user:${u}`).join(" ");
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", `author:${AUTHOR} type:pr is:merged ${exclude}`);
  url.searchParams.set("sort", "updated");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(PAGE_SIZE));
  url.searchParams.set("page", String(page));
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "pr-distribution", Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as { total_count: number; items: SearchItem[] };
  } catch {
    return null;
  }
}

async function run() {
  const first = await search(1);
  if (!first) {
    console.log("GitHub API unreachable");
    return;
  }
  const pages = Math.min(2, Math.ceil(Math.min(first.total_count, 1000) / PAGE_SIZE));
  const rest = await Promise.all(
    Array.from({ length: Math.max(0, pages - 1) }, (_, i) => search(i + 2)),
  );
  const items = [first, ...rest.filter((p): p is NonNullable<typeof p> => p !== null)].flatMap(
    (p) => p.items,
  );

  const byRepo = new Map<string, number>();
  for (const item of items) {
    const path = item.repository_url.split("/repos/")[1];
    if (!path) continue;
    byRepo.set(path, (byRepo.get(path) ?? 0) + 1);
  }

  const total = first.total_count;
  const sorted = Array.from(byRepo.entries()).sort((a, b) => b[1] - a[1]);

  console.log(`total merged PRs (external repos): ${total}`);
  console.log(`repos represented in fetched page: ${byRepo.size}\n`);
  console.log("repo".padEnd(52), "PRs".padStart(5), "share".padStart(8));
  console.log("-".repeat(68));
  for (const [repo, count] of sorted) {
    const share = ((count / total) * 100).toFixed(1);
    console.log(repo.padEnd(52), String(count).padStart(5), `${share}%`.padStart(8));
  }

  const notable = ["OWASP", "microsoft", "ollama"];
  const inNotable = sorted.filter(([repo]) => notable.some((n) => repo.startsWith(n + "/")));
  const notableCount = inNotable.reduce((sum, [, c]) => sum + c, 0);

  console.log("-".repeat(68));
  console.log(
    `OWASP + Microsoft + Ollama: ${notableCount} PRs across ${inNotable.length} repos = ${((notableCount / total) * 100).toFixed(1)}% of the total`,
  );
  for (const [repo, count] of inNotable) console.log(`   ${repo}: ${count}`);

  const other = total - notableCount;
  console.log(`\nPRs in all other repos: ${other} (${((other / total) * 100).toFixed(1)}%)`);

  const topRepo = sorted[0];
  console.log(`largest single repo: ${topRepo?.[0]} with ${topRepo?.[1]} PRs`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
