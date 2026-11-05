/**
 * Refreshes every GitHub number the site publishes.
 *
 *   npm run sync:github
 *
 * The live surfaces (page metadata, the home page, /api/portfolio.json) read
 * GitHub on every revalidation. The *static* surfaces — llms.txt,
 * llms-full.txt, ai.txt, pricing.md — are plain files, so they carry a floor
 * that has to be refreshed deliberately. Before this script existed the copy
 * said "60 merged pull requests" while the page said 67, and a reader could
 * catch the site contradicting itself in one click.
 *
 * What it does:
 *   1. asks the GitHub search API for the three counts,
 *   2. rewrites `githubClaimFloors` in lib/site-data.ts,
 *   3. rewrites the same numbers in the static copy,
 *   4. stamps a fresh "Last updated" date.
 *
 * Essay titles and excerpts are deliberately skipped: "What 60+ Merged PRs
 * Taught Me" is the published title of a piece, not a claim about today's
 * count, and rewriting it would leave the file disagreeing with the essay.
 *
 * Run `npm run gen:services` afterwards; services.md is generated from
 * site-data and picks the new floors up on its own.
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { githubClaimFloors } from "../lib/site-data.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AUTHOR = "KunjShah95";
const EXCLUDE_OWN = ["KunjShah95", "KunjShah01"].map((u) => `-user:${u}`).join(" ");
const TODAY = new Date().toISOString().slice(0, 10);

/** `GITHUB_TOKEN` if exported, otherwise whatever the `gh` CLI is signed in as. */
function token(): string | undefined {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim() || undefined;
  } catch {
    return undefined;
  }
}

/**
 * Counts track what the token can see, private client repositories included;
 * that is what the site reports. Only the *listed* rows are public, so this
 * script and lib/github.ts must use the same query shapes.
 */
const MERGED = `author:${AUTHOR} type:pr is:merged ${EXCLUDE_OWN}`.trim();

async function totalCount(q: string): Promise<number> {
  const url = new URL("https://api.github.com/search/issues");
  url.searchParams.set("q", q);
  url.searchParams.set("per_page", "1");

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kunjshah-portfolio-sync",
  };
  const auth = token();
  if (auth) headers.Authorization = `Bearer ${auth}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub search failed: ${res.status} ${res.statusText} for "${q}"`);
  }
  const payload = (await res.json()) as { total_count?: number };
  if (typeof payload.total_count !== "number") {
    throw new Error(`GitHub returned no total_count for "${q}"`);
  }
  return payload.total_count;
}

/** Distinct repos come from the PR list, so page through the first two pages. */
async function externalRepos(): Promise<number> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "kunjshah-portfolio-sync",
  };
  const auth = token();
  if (auth) headers.Authorization = `Bearer ${auth}`;

  const repos = new Set<string>();
  for (let page = 1; page <= 2; page += 1) {
    const url = new URL("https://api.github.com/search/issues");
    url.searchParams.set("q", MERGED);
    url.searchParams.set("sort", "updated");
    url.searchParams.set("order", "desc");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));

    const res = await fetch(url, { headers });
    if (!res.ok) {
      throw new Error(`GitHub search failed: ${res.status} ${res.statusText}`);
    }
    const payload = (await res.json()) as { items?: { repository_url: string }[] };
    for (const item of payload.items ?? []) {
      repos.add(item.repository_url.split("/repos/")[1]);
    }
    if ((payload.items ?? []).length < 100) break;
  }
  return repos.size;
}

/* ------------------------------------------------------------------ numbers */

const next = {
  mergedPullRequests: await totalCount(MERGED),
  resolvedIssues: await totalCount(
    `author:${AUTHOR} type:issue is:closed ${EXCLUDE_OWN}`.trim(),
  ),
  externalRepos: await externalRepos(),
};

const previous = { ...githubClaimFloors };

for (const key of Object.keys(next) as (keyof typeof next)[]) {
  if (next[key] < previous[key]) {
    console.warn(
      `[sync:github] ${key} went down (${previous[key]} -> ${next[key]}). ` +
        "Writing it anyway; check that a merge or an issue was not reversed.",
    );
  }
}

console.log("[sync:github]", previous, "->", next);

/* ------------------------------------------------------------- site-data.ts */

const dataPath = join(ROOT, "lib", "site-data.ts");
let data = readFileSync(dataPath, "utf8");
const block = /export const githubClaimFloors = \{[\s\S]*?\} as const;/;
if (!block.test(data)) {
  throw new Error("Could not find the githubClaimFloors block in lib/site-data.ts.");
}
data = data.replace(
  block,
  `export const githubClaimFloors = {\n` +
    `  mergedPullRequests: ${next.mergedPullRequests},\n` +
    `  resolvedIssues: ${next.resolvedIssues},\n` +
    `  externalRepos: ${next.externalRepos},\n` +
    `} as const;`,
);
writeFileSync(dataPath, data, "utf8");

/* ---------------------------------------------------------------- static copy */

/**
 * Longest-first so "24 external repositories" is rewritten before the shorter
 * "24 external" would eat its prefix.
 */
function substitutions(): [string, string][] {
  const pairs: [string, string][] = [];
  const add = (oldText: string, newText: string) => {
    if (oldText !== newText && !pairs.some(([from]) => from === oldText)) {
      pairs.push([oldText, newText]);
    }
  };

  const pr = [previous.mergedPullRequests, next.mergedPullRequests] as const;
  const issues = [previous.resolvedIssues, next.resolvedIssues] as const;
  const repos = [previous.externalRepos, next.externalRepos] as const;

  add(`${pr[0]}+ merged`, `${pr[1]}+ merged`);
  add(`${pr[0]} merged`, `${pr[1]} merged`);
  add(`${pr[0]} PRs`, `${pr[1]} PRs`);

  add(`${issues[0]} issues`, `${issues[1]} issues`);

  for (const suffix of [
    "external repositories",
    "external codebases",
    "external projects",
    "external repos",
    "externals",
    "external",
    "repositories",
    "codebases",
    "repos",
  ]) {
    add(`${repos[0]} ${suffix}`, `${repos[1]} ${suffix}`);
    add(`${repos[0]}+ ${suffix}`, `${repos[1]}+ ${suffix}`);
  }

  return pairs.sort(([a], [b]) => b.length - a.length);
}

const FILES = [
  "public/llms.txt",
  "public/llms-full.txt",
  "public/ai.txt",
  "public/.well-known/ai.txt",
  "public/pricing.md",
];

/** Lines that describe a published essay, not the current totals. */
const ESSAY_LINE = /kunjshah\.in\/writing\//;

let touched = 0;
for (const file of FILES) {
  const path = join(ROOT, file);
  const before = readFileSync(path, "utf8");

  const after = before
    .split("\n")
    .map((line) => {
      if (ESSAY_LINE.test(line)) return line;
      let out = line;
      for (const [from, to] of substitutions()) out = out.split(from).join(to);
      return out.replace(/Last updated: \d{4}-\d{2}-\d{2}/, `Last updated: ${TODAY}`);
    })
    .join("\n");

  if (after !== before) {
    writeFileSync(path, after, "utf8");
    touched += 1;
    console.log(`[sync:github] updated ${file}`);
  } else {
    console.log(`[sync:github] no change in ${file}`);
  }
}

console.log(
  `[sync:github] done. ${touched} file(s) rewritten. ` +
    "Run `npm run gen:services` to refresh public/services.md.",
);
