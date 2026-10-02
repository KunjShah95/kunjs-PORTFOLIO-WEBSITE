/* ==========================================================================
   Live open-source activity from the GitHub search API.

   Counts pull requests authored by the site owner in repositories they do
   not own. Revalidated hourly (ISR), so the page stays current without a
   redeploy. Set GITHUB_TOKEN to lift the unauthenticated rate limit; every
   call degrades to `null` on failure so callers can fall back to static data.

   Ordering note: GitHub's search API only sorts by `created` or `updated`,
   never by merge time. A PR opened weeks ago and merged yesterday is the most
   recent *contribution* but sorts near the bottom by `created`. So we request
   merged PRs by `updated` (which is >= merge time and therefore monotonic with
   it) and then re-sort the page ourselves by the real `merged_at` timestamp.
   ========================================================================== */

const AUTHOR = "KunjShah95";
/** Personal accounts — PRs into these are not "contributions". */
const OWN_ACCOUNTS = ["KunjShah95", "KunjShah01"];
const REVALIDATE_SECONDS = 3600;
/** GitHub caps a search response at 100 items per page. */
const PAGE_SIZE = 100;
/**
 * How many pages to pull for the distinct-repo count. The search API allows
 * 1000 results, but paging deep burns unauthenticated rate limit (10 req/min)
 * for a number that only feeds a stat tile, so two pages is the compromise.
 */
const MAX_PAGES = 2;

export type PullRequestState = "merged" | "open" | "closed";

/**
 * Conventional-commit category inferred from the PR title, e.g. `fix(security):
 * bound remote inference` yields "security". Titles with no recognised prefix
 * are "other" — the badge is a quick orienting cue, not a claim of precision.
 */
export type PullRequestKind =
  | "feat"
  | "fix"
  | "docs"
  | "refactor"
  | "test"
  | "perf"
  | "chore"
  | "ci"
  | "security"
  | "other";

export type LivePullRequest = {
  title: string;
  url: string;
  repo: string;
  owner: string;
  number: number;
  state: PullRequestState;
  /** Conventional-commit category derived from the title. */
  kind: PullRequestKind;
  /** ISO timestamp — merge time for merged PRs, otherwise creation time. */
  date: string;
};

export type OpenSourceActivity = {
  /** Merged PRs into external repos, newest merge first. */
  recent: LivePullRequest[];
  /** Total merged PRs into external repos, across every page. */
  mergedPullRequests: number;
  /** Distinct external repositories with a merged PR. */
  mergedRepos: number;
  /** Merged PRs per category, most common first. Covers the fetched pages. */
  kindCounts: { kind: PullRequestKind; count: number }[];
  /** Repos represented in `recent` only, when the full set was truncated. */
  fetchedAt: string;
};

type SearchItem = {
  title: string;
  html_url: string;
  number: number;
  state: "open" | "closed";
  created_at: string;
  repository_url: string;
  pull_request?: { merged_at: string | null };
};

type SearchResponse = { total_count: number; items: SearchItem[] };

function query() {
  const exclude = OWN_ACCOUNTS.map((u) => `-user:${u}`).join(" ");
  return `author:${AUTHOR} type:pr is:merged ${exclude}`.trim();
}

async function search(page: number): Promise<SearchResponse | null> {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", query());
  // `updated` tracks the last state change, so for a merged PR it is always
  // at or after `merged_at`. Sorting by it never hides a recent merge.
  url.searchParams.set("sort", "updated");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(PAGE_SIZE));
  url.searchParams.set("page", String(page));

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kunjshah-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github-activity"] },
    });
    if (!res.ok) {
      console.warn(`[github] search failed: ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as SearchResponse;
  } catch (error) {
    console.warn("[github] search error", error);
    return null;
  }
}

/**
 * Conventional-commit types, plus `security` and `ci`, which most often arrive
 * as a scope or a bare prefix rather than a type: `fix(security): ...`,
 * `chore(security): ...`, `ci: enforce ...`.
 */
const KINDS = new Set<PullRequestKind>([
  "feat", "fix", "docs", "refactor", "test", "perf", "chore", "ci", "security",
]);

/** `type(scope): subject` or `type: subject`, anchored to the start. */
const CONVENTIONAL = /^\s*([a-z]+)(?:\(([^)]+)\))?!?:\s*/i;

/**
 * Read the category off a PR title.
 *
 * Titles are written by hand as often as by convention, so after the
 * conventional prefix is checked we look for a few strong keywords. A
 * `security` scope or prefix wins over its type, because a security fix is far
 * more interesting to a reader than the fact that it was a `fix`. Anything
 * still unrecognised is "other" — the badge should never overstate what it
 * actually knows about a PR.
 */
export function pullRequestKind(title: string): PullRequestKind {
  const text = title.toLowerCase();
  const match = CONVENTIONAL.exec(title);

  if (match) {
    const type = match[1].toLowerCase();
    const scope = (match[2] ?? "").toLowerCase();
    if (scope.includes("security") || type === "security") return "security";
    if (type === "ci" || scope === "ci") return "ci";
    if (KINDS.has(type as PullRequestKind)) return type as PullRequestKind;
  }

  if (/\b(security|vulnerab|cve|auth|credential|api[- ]key)\b/.test(text)) return "security";
  if (/\b(readme|docs|documentation|adr)\b/.test(text)) return "docs";
  if (/\b(ci|workflow|lint|precommit|pre-commit|github action)\b/.test(text)) return "ci";
  if (/\b(refactor|cleanup|clean up|dead code|dedupe|rename)\b/.test(text)) return "refactor";
  if (/\b(perf|performance|faster|optimi[sz])\b/.test(text)) return "perf";
  if (/\b(featur|adds|add |implement|support for|introduc)\b/.test(text)) return "feat";
  if (/\b(fix|bug|correct|harden|prevent|bound|patch|repair)\b/.test(text)) return "fix";
  if (/\b(test|coverage|regression test|spec)\b/.test(text)) return "test";

  return "other";
}

function toPullRequest(item: SearchItem): LivePullRequest {
  const [owner, repo] = item.repository_url.split("/repos/")[1].split("/");
  const mergedAt = item.pull_request?.merged_at ?? null;
  return {
    title: item.title,
    url: item.html_url,
    owner,
    repo,
    number: item.number,
    state: mergedAt ? "merged" : item.state === "open" ? "open" : "closed",
    kind: pullRequestKind(item.title),
    date: mergedAt ?? item.created_at,
  };
}

export async function getOpenSourceActivity(limit = 12): Promise<OpenSourceActivity | null> {
  const first = await search(1);
  if (!first) return null;

  const available = Math.min(first.total_count, 1000);
  const wanted = Math.min(MAX_PAGES, Math.max(1, Math.ceil(available / PAGE_SIZE)));
  const rest = await Promise.all(
    Array.from({ length: wanted - 1 }, (_, index) => search(index + 2)),
  );
  // A later page failing is not fatal — page 1 already carries the newest work.
  const items = [first, ...rest.filter((page): page is SearchResponse => page !== null)].flatMap(
    (page) => page.items,
  );

  const pullRequests = items
    .map(toPullRequest)
    .filter((pr) => pr.state === "merged")
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  return {
    recent: pullRequests.slice(0, limit),
    mergedPullRequests: first.total_count,
    mergedRepos: new Set(pullRequests.map((pr) => `${pr.owner}/${pr.repo}`)).size,
    kindCounts: kindCounts(pullRequests),
    fetchedAt: new Date().toISOString(),
  };
}

/** Per-category totals, most common first. Ties keep a stable, readable order. */
const KIND_ORDER: PullRequestKind[] = [
  "feat", "fix", "security", "refactor", "perf", "docs", "test", "ci", "chore", "other",
];

function kindCounts(pullRequests: LivePullRequest[]) {
  const counts = new Map<PullRequestKind, number>();
  for (const pr of pullRequests) {
    counts.set(pr.kind, (counts.get(pr.kind) ?? 0) + 1);
  }
  return KIND_ORDER.map((kind) => ({ kind, count: counts.get(kind) ?? 0 })).filter(
    (entry) => entry.count > 0,
  );
}

/** "3d ago", "2mo ago" — compact relative time for activity rows. */
export function timeAgo(iso: string, now = Date.now()): string {
  const seconds = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  const units: [number, string][] = [
    [60 * 60 * 24 * 365, "y"],
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24 * 7, "w"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
    [60, "m"],
  ];
  for (const [size, label] of units) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${label} ago`;
  }
  return "just now";
}
