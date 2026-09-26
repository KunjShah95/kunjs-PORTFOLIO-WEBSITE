/* ==========================================================================
   Live open-source activity from the GitHub search API.

   Counts pull requests authored by the site owner in repositories they do
   not own. Revalidated hourly (ISR), so the page stays current without a
   redeploy. Set GITHUB_TOKEN to lift the unauthenticated rate limit; every
   call degrades to `null` on failure so callers can fall back to static data.
   ========================================================================== */

const AUTHOR = "KunjShah95";
/** Personal accounts — PRs into these are not "contributions". */
const OWN_ACCOUNTS = ["KunjShah95", "KunjShah01"];
const REVALIDATE_SECONDS = 3600;

export type PullRequestState = "merged" | "open" | "closed";

export type LivePullRequest = {
  title: string;
  url: string;
  repo: string;
  owner: string;
  number: number;
  state: PullRequestState;
  /** ISO timestamp — merge time for merged PRs, otherwise creation time. */
  date: string;
};

export type OpenSourceActivity = {
  recent: LivePullRequest[];
  totalPullRequests: number;
  mergedPullRequests: number;
  /** Distinct external repositories with a merged PR (from the latest 100). */
  mergedRepos: number;
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

function query(extra = "") {
  const exclude = OWN_ACCOUNTS.map((u) => `-user:${u}`).join(" ");
  return `author:${AUTHOR} type:pr ${exclude} ${extra}`.trim();
}

async function search(q: string, perPage: number): Promise<SearchResponse | null> {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", q);
  url.searchParams.set("sort", "created");
  url.searchParams.set("order", "desc");
  url.searchParams.set("per_page", String(perPage));

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
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
    date: mergedAt ?? item.created_at,
  };
}

export async function getOpenSourceActivity(limit = 12): Promise<OpenSourceActivity | null> {
  const [all, merged] = await Promise.all([
    search(query(), limit),
    search(query("is:merged"), 100),
  ]);
  if (!all || !merged) return null;

  return {
    recent: all.items.map(toPullRequest),
    totalPullRequests: all.total_count,
    mergedPullRequests: merged.total_count,
    mergedRepos: new Set(merged.items.map((i) => i.repository_url)).size,
    fetchedAt: new Date().toISOString(),
  };
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
