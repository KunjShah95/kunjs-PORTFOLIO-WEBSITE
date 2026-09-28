/* ==========================================================================
   GitHub contribution calendar.

   Built on the official GraphQL `contributionsCollection`, which is the only
   source that reports the *real* calendar: it counts commits, PRs, issues and
   reviews, exactly as github.com does. Reconstructed alternatives (scraping the
   profile SVG, inferring from push events) are either fragile or quietly wrong,
   so this degrades to `null` instead.

   GraphQL requires authentication, so the graph renders only when
   `GITHUB_TOKEN` is set — the same token `lib/github.ts` already uses. Without
   it, callers fall back to their own static content.

   Revalidated hourly to match the rest of the GitHub integration.
   ========================================================================== */

const USERNAME = "KunjShah95";
const REVALIDATE_SECONDS = 3600;
const DAYS = 365;

/** GitHub's own 5-step scale. */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  count: number;
  level: ContributionLevel;
};

export type Contributions = {
  total: number;
  /** Oldest first, one entry per day in the window. */
  days: readonly ContributionDay[];
  fetchedAt: string;
};

type GraphQLDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: { contributionDays: GraphQLDay[] }[];
        };
      };
    };
  };
  errors?: { message: string }[];
};

/** GitHub returns level names; clamp the few it can emit into 0–4. */
function toLevel(raw: string): ContributionLevel {
  switch (raw) {
    case "NONE":
      return 0;
    case "FIRST_QUARTILE":
      return 1;
    case "SECOND_QUARTILE":
      return 2;
    case "THIRD_QUARTILE":
      return 3;
    case "FOURTH_QUARTILE":
      return 4;
    default:
      return 0;
  }
}

/** ISO timestamp `DAYS` ago, for the collection window. */
function windowStart(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - DAYS);
  return d.toISOString();
}

function windowEnd(): string {
  return new Date().toISOString();
}

const QUERY = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function getContributions(): Promise<Contributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    // Expected on forks and local runs without a token; not an error worth
    // logging on every build.
    return null;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "kunjshah-portfolio",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          login: USERNAME,
          from: windowStart(),
          to: windowEnd(),
        },
      }),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github-contributions"] },
    });

    if (!res.ok) {
      console.warn(`[contributions] graphql failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const payload = (await res.json()) as GraphQLResponse;
    if (payload.errors?.length) {
      console.warn(`[contributions] graphql error: ${payload.errors[0]?.message}`);
      return null;
    }

    const calendar =
      payload.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    // Flatten weeks into a single ordered day list. GraphQL returns weeks
    // oldest-first, and days within each week oldest-first, so a plain concat
    // is already chronological.
    const days: ContributionDay[] = calendar.weeks
      .flatMap((week) => week.contributionDays)
      .filter((day) => typeof day?.date === "string")
      .map((day) => ({
        date: day.date,
        count: Number.isFinite(day.contributionCount) ? day.contributionCount : 0,
        level: toLevel(day.contributionLevel),
      }));

    if (days.length === 0) return null;

    return {
      total: calendar.totalContributions,
      days,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.warn("[contributions] fetch error", error);
    return null;
  }
}

/** `1,204` — the grid's headline number. */
export function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}
