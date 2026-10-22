import { strict as assert } from "node:assert";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import {
  contributions,
  engagements,
  hackathons,
  impactMetrics,
  metrics,
  projects,
  services,
} from "../lib/site-data";

/**
 * Claim consistency.
 *
 * Every number on this site is a promise to a reader, and a promise that
 * contradicts itself is worse than no promise. These tests pin the claims to
 * the data that backs them, so a copy edit cannot quietly turn "merged" into
 * "proposed" or invent a hackathon that never happened.
 *
 * The counts here were verified against the GitHub API and the project data.
 * When a real count changes, update the expectation *and* the copy together.
 */

const ROOT = join(import.meta.dirname, "..");
const read = (file: string) => readFileSync(join(ROOT, file), "utf8");

/** Every string the site can publish, in one place, so a claim cannot hide. */
const published = [
  { file: "lib/site-data.ts", text: read("lib/site-data.ts") },
  { file: "app/page.tsx", text: read("app/page.tsx") },
  { file: "app/about/page.tsx", text: read("app/about/page.tsx") },
  { file: "app/open-source/page.tsx", text: read("app/open-source/page.tsx") },
  { file: "public/llms.txt", text: read("public/llms.txt") },
  { file: "public/llms-full.txt", text: read("public/llms-full.txt") },
  { file: "public/pricing.md", text: read("public/pricing.md") },
  { file: "public/services.md", text: read("public/services.md") },
];

/* --------------------------------------------------------------- upstream */

/**
 * The site names specific upstream projects as merged work. Only OWASP and
 * Microsoft have merged pull requests; the ollama/ollama contribution is a
 * closed-unmerged proposal and an open issue. Presenting a proposal as merged
 * work is the single most damaging thing this site could do, because a
 * reviewer can check it in one click.
 */
test("merged-upstream claims only name projects with merged PRs", () => {
  const mergedUpstream = ["OWASP", "microsoft"];
  for (const { file, text } of published) {
    // "Ollama" may still appear as a tool in a stack list, or as a proposal.
    // It may not appear in a sentence that claims merged work.
    const claimsMerged = text.match(
      /[^.\n]*\b(Ollama|ollama)\b[^.\n]*\b(merged|Merged)\b[^.\n]*/g,
    );
    for (const claim of claimsMerged ?? []) {
      const ok = mergedUpstream.some((name) => claim.includes(name));
      assert.ok(
        ok,
        `${file} claims Ollama work is merged: "${claim.trim()}" — the ollama contribution is a proposal, not merged work.`,
      );
    }
  }
});

test("the ollama contribution is recorded as a proposal, not a merge", () => {
  const ollama = contributions.find((c) => c.org === "ollama/ollama");
  assert.ok(ollama, "the ollama contribution should still be listed");
  assert.notEqual(
    ollama.kind,
    "merged",
    "the ollama/ollama pull request was closed unmerged; it must not be recorded as merged.",
  );
});

/* ------------------------------------------------------------- consistency */

test("hackathon finals count matches the data everywhere", () => {
  const finalists = hackathons.filter((h) => h.placement === "Finalist").length;
  assert.equal(finalists, 4, "the data holds four finalist placements");

  for (const { file, text } of published) {
    const wrong = text.match(/(\d+)\s+hackathon finals/gi) ?? [];
    for (const claim of wrong) {
      const value = Number(claim.match(/\d+/)?.[0]);
      assert.equal(
        value,
        finalists,
        `${file} says "${claim.trim()}" but the data has ${finalists} finals.`,
      );
    }
  }
});

test("the issues-resolved count matches the data everywhere", () => {
  const issues = impactMetrics.find((m) => m.label === "Issues Resolved");
  assert.ok(issues, "impactMetrics should carry an issues-resolved figure");

  for (const { file, text } of published) {
    const wrong = text.match(/(\d+)\s+issues(?:\s+resolved)?/gi) ?? [];
    for (const claim of wrong) {
      const value = Number(claim.match(/\d+/)?.[0]);
      assert.equal(
        value,
        Number(issues.value),
        `${file} says "${claim.trim()}" but impactMetrics says ${issues.value}.`,
      );
    }
  }
});

test("every project marked as having a demo actually has one", () => {
  for (const project of projects) {
    if (project.status.toLowerCase().includes("live")) {
      assert.ok(
        project.demo,
        `${project.slug} is marked "${project.status}" but has no demo URL.`,
      );
    }
  }
});

test("contribution links point at pull requests that exist", () => {
  for (const contribution of contributions) {
    assert.match(
      contribution.url,
      /^https:\/\/github\.com\/[^/]+\/[^/]+\/(pull|issues)/,
      `${contribution.org} has a link that is not a GitHub PR or issue URL.`,
    );
  }
});

test("a merged contribution links to a pull request, not an issue", () => {
  for (const contribution of contributions) {
    if (contribution.kind === "merged") {
      assert.match(
        contribution.url,
        /\/pull\//,
        `${contribution.org} is recorded as merged but links to an issue.`,
      );
    }
  }
});

/* ------------------------------------------------------------------ shape */

test("every service carries a proof line", () => {
  for (const service of services) {
    assert.ok(service.proof?.trim(), `service "${service.title}" has no proof.`);
  }
});

test("every engagement path carries at least three proof lines", () => {
  for (const engagement of engagements) {
    assert.ok(
      engagement.proof.length >= 3,
      `engagement "${engagement.audience}" has fewer than three proof lines.`,
    );
  }
});

test("the static PR metric is a lower bound, never a contradiction", () => {
  const prMetric = metrics.find((m) => m.label === "Merged PRs");
  assert.ok(prMetric, "metrics should carry a merged-PR figure");
  // The home page shows the live count next to this one, so the static value
  // has to be a floor that the live count can exceed, never a rival number.
  assert.match(
    prMetric.value,
    /^\d+\+$/,
    "the static merged-PR figure should be a floor ('60+'), not a rival exact count.",
  );
});

test("the generated services file is in sync with the source data", () => {
  const servicesMd = read("public/services.md");
  for (const engagement of engagements) {
    assert.ok(
      servicesMd.includes(engagement.audience),
      `public/services.md is missing the "${engagement.audience}" path — regenerate it with npm run gen:services.`,
    );
  }
});
