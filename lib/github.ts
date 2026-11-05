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

import { githubClaimFloors } from "./site-data";

const AUTHOR = "KunjShah95";
/** Personal accounts — PRs into these are not "contributions". */
const OWN_ACCOUNTS = ["KunjShah95", "KunjShah01"];
const EXCLUDE_OWN = OWN_ACCOUNTS.map((u) => `-user:${u}`).join(" ");
/**
 * Fifteen minutes. The feed is the point of the page, and GitHub's limits are
 * generous for an authenticated token (5,000 requests/hour), so there is no
 * reason to sit on an hour-old snapshot.
 */
const REVALIDATE_SECONDS = 900;
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

/** Whether a visitor can actually open the pull request. */
export type PullRequestVisibility = "public" | "private";

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
  /**
   * `private` merges are real work in a repository the public cannot read, so
   * they are never rendered as a link. They are listed only when
   * `OPEN_SOURCE_PRIVATE_PRS=show` (see `privateMergesVisible`).
   */
  visibility: PullRequestVisibility;
};

export type OpenSourceActivity = {
  /**
   * Newest merges. Private rows appear only when `OPEN_SOURCE_PRIVATE_PRS=show`;
   * they are always non-linkable, because a private URL 404s for visitors.
   */
  recent: LivePullRequest[];
  /** Total merged PRs into external repos, private work included. */
  mergedPullRequests: number;
  /** How many of `mergedPullRequests` are in public repositories. */
  publicPullRequests: number;
  /** Distinct external repositories with a merged PR. */
  mergedRepos: number;
  /** Merged PRs per category, most common first. Covers the fetched pages. */
  kindCounts: { kind: PullRequestKind; count: number }[];
  /** Repos represented in `recent` only, when the full set was truncated. */
  fetchedAt: string;
};

/**
 * The three numbers the site quotes about GitHub work.
 *
 * Kept separate from `OpenSourceActivity` so metadata and the JSON export can
 * ask for counts without pulling twelve PR rows across the wire.
 */
export type OpenSourceClaims = {
  mergedPullRequests: number;
  /** `null` when the issue search failed; callers fall back to the floor. */
  resolvedIssues: number | null;
  externalRepos: number;
  fetchedAt: string;
};

/** Concrete counts, guaranteed present. */
export type ClaimNumbers = {
  mergedPullRequests: number;
  resolvedIssues: number;
  externalRepos: number;
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

/**
 * Two queries with different jobs.
 *
 * `mergedQuery` is what the token can see, and it is what the headline counts
 * report: a repo-scoped token sees 138 merges where an anonymous request sees
 * 67, and the 71 it hides are real work. Reporting the anonymous number made
 * the site look frozen — every merge into a private client repo was invisible.
 *
 * `publicMergedQuery` is only used to decide which rows are safe to render as
 * links. A private pull request 404s for every visitor, so those merges are
 * counted but not listed.
 */
function mergedQuery() {
  return `author:${AUTHOR} type:pr is:merged ${EXCLUDE_OWN}`.trim();
}

function publicMergedQuery() {
  return `author:${AUTHOR} type:pr is:merged is:public ${EXCLUDE_OWN}`.trim();
}

/** Closed issues the owner filed in repos they don't own. */
function issueQuery() {
  return `author:${AUTHOR} type:issue is:closed ${EXCLUDE_OWN}`.trim();
}

function headers(): Record<string, string> {
  const result: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kunjshah-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    result.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return result;
}

async function search(q: string, page: number, tag: string): Promise<SearchResponse | null> {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", q);
  // `updated` tracks the last state change, so for a merged PR it is always
  // at or after `merged_at`. Sorting by it never hides a recent merge.
  url.searchParams.set("sort", "updated");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(PAGE_SIZE));
  url.searchParams.set("page", String(page));

  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
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

/** Every page a query needs, bounded by `MAX_PAGES`. */
async function pages(q: string, total: number, tag: string): Promise<SearchResponse[]> {
  const available = Math.min(total, 1000);
  const wanted = Math.min(MAX_PAGES, Math.max(1, Math.ceil(available / PAGE_SIZE)));
  const rest = await Promise.all(
    Array.from({ length: wanted - 1 }, (_, index) => search(q, index + 2, tag)),
  );
  return rest.filter((page): page is SearchResponse => page !== null);
}

/** One-item search, read for `total_count` only. */
async function count(q: string, tag: string): Promise<number | null> {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", q);
  url.searchParams.set("per_page", "1");

  try {
    const res = await fetch(url, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
    });
    if (!res.ok) {
      console.warn(`[github] count failed: ${res.status} ${res.statusText}`);
      return null;
    }
    const payload = (await res.json()) as { total_count?: number };
    return typeof payload.total_count === "number" ? payload.total_count : null;
  } catch (error) {
    console.warn("[github] count error", error);
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

function toPullRequest(item: SearchItem, visibility: PullRequestVisibility): LivePullRequest {
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
    visibility,
  };
}

/**
 * Whether the timeline may include merges from private repositories.
 *
 * Off by default: a private pull request title and repository name belong to
 * the client, and publishing them is a disclosure decision rather than a
 * default. The counts include that work either way — only the rows are gated.
 */
export function privateMergesVisible(): boolean {
  return process.env.OPEN_SOURCE_PRIVATE_PRS === "show";
}

export async function getOpenSourceActivity(limit = 12): Promise<OpenSourceActivity | null> {
  // Counts: everything the token can see. Private-repo merges are real work
  // and belong in the totals even when they cannot be linked.
  const first = await search(mergedQuery(), 1, "github-activity");
  if (!first) return null;

  const items = [first, ...(await pages(mergedQuery(), first.total_count, "github-activity"))]
    .flatMap((page) => page.items);

  // Which of those merges can a visitor actually open? If the linkability
  // query fails we assume public rather than hiding every row.
  const publicFirst = await search(publicMergedQuery(), 1, "github-linkable");
  let linkable: Set<string> | null = null;
  if (publicFirst) {
    const publicPages = await pages(
      publicMergedQuery(),
      publicFirst.total_count,
      "github-linkable",
    );
    linkable = new Set(
      [publicFirst, ...publicPages]
        .flatMap((page) => page.items)
        .map((item) => item.html_url),
    );
  }

  const merged = items
    .map((item) =>
      toPullRequest(item, linkable && !linkable.has(item.html_url) ? "private" : "public"),
    )
    .filter((pr) => pr.state === "merged")
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

  const listed = privateMergesVisible()
    ? merged
    : merged.filter((pr) => pr.visibility === "public");

  return {
    recent: listed.slice(0, limit),
    mergedPullRequests: first.total_count,
    publicPullRequests: publicFirst?.total_count ?? first.total_count,
    mergedRepos: new Set(merged.map((pr) => `${pr.owner}/${pr.repo}`)).size,
    kindCounts: kindCounts(merged),
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * The counts-only view, for page metadata and the JSON export.
 *
 * Two cheap searches (PRs and closed issues) instead of paging PR rows. The
 * issue count is allowed to fail on its own: a missing number falls back to
 * the verified floor rather than suppressing the other two.
 */
export async function getOpenSourceClaims(): Promise<OpenSourceClaims | null> {
  const [activity, resolvedIssues] = await Promise.all([
    getOpenSourceActivity(1),
    count(issueQuery(), "github-issues"),
  ]);
  if (!activity) return null;

  return {
    mergedPullRequests: activity.mergedPullRequests,
    resolvedIssues,
    externalRepos: activity.mergedRepos,
    fetchedAt: activity.fetchedAt,
  };
}

/**
 * Live numbers where GitHub answered, verified floors where it did not.
 *
 * `Math.max` rather than a plain fallback: the floors are a verified historical
 * fact, and a request that runs without a token sees a *subset* of the same
 * work. Taking the larger of the two means a token-less build can never
 * under-report what the site already knows to be true.
 */
export function resolveClaims(claims: OpenSourceClaims | null): ClaimNumbers {
  return {
    mergedPullRequests: Math.max(
      claims?.mergedPullRequests ?? 0,
      githubClaimFloors.mergedPullRequests,
    ),
    resolvedIssues: Math.max(
      claims?.resolvedIssues ?? 0,
      githubClaimFloors.resolvedIssues,
    ),
    externalRepos: Math.max(
      claims?.externalRepos ?? 0,
      githubClaimFloors.externalRepos,
    ),
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
