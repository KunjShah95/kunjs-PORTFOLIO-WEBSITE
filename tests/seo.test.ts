import { strict as assert } from "node:assert";
import { test } from "node:test";
import { DESCRIPTION_MAX, TITLE_MAX, fitDescription, fitTitle, pageMeta } from "../lib/seo";

const SUFFIX = " | Kunj Shah";

function rendered(title: string): string {
  const fitted = fitTitle(title);
  return typeof fitted === "string" ? fitted + SUFFIX : fitted.absolute;
}

test("short titles keep the brand suffix", () => {
  assert.equal(fitTitle("Writing"), "Writing");
});

test("titles that only fit without the suffix go absolute and unchanged", () => {
  const t = "Building a Research Agent That Cites Its Sources";
  assert.deepEqual(fitTitle(t + " Today"), { absolute: t + " Today" });
});

test("every long headline lands within the 60 character budget", () => {
  const headlines = [
    "How Much Does an AI Agent Cost in India? (2026 Breakdown)",
    "RAG Implementation Best Practices: Hybrid Search, Re-ranking and CI-Gated Recall",
    "I Looked At 112 AI Tools So You Don’t Have To. Here’s What Actually Breaks in Production.",
    "My OWASP Journey: What 60+ Merged PRs Taught Me About Shipping Secure Agents",
    "The Boy Who Built Machines While Looking for a Place to Belong",
    "Python Memory Management: The Complete Guide (Variables to Garbage Collection)",
    "Supercalifragilisticexpialidocious".repeat(4),
  ];
  for (const h of headlines) {
    const out = rendered(h);
    assert.ok(out.length <= TITLE_MAX, `${out.length}: ${out}`);
    assert.ok(out.length >= 20, out);
  }
});

test("a trimmed title keeps its lead clause, not a mid-word cut", () => {
  const fitted = fitTitle("RAG Implementation Best Practices: Hybrid Search, Re-ranking and CI-Gated Recall");
  assert.deepEqual(fitted, { absolute: "RAG Implementation Best Practices: Hybrid Search" });
});

test("descriptions within budget are untouched, long ones are cut on a word", () => {
  const ok = "A short description.";
  assert.equal(fitDescription(ok), ok);
  const long =
    "Kunj Shah builds production AI agents and RAG systems for founders in India. " +
    "Every engagement starts with a fixed-scope sprint, a written eval plan and a working demo you can run yourself before any contract is signed.";
  const out = fitDescription(long);
  assert.ok(out.length <= DESCRIPTION_MAX + 2, String(out.length));
  assert.ok(out.endsWith("…"), out);
  assert.ok(out.length >= 110, String(out.length));
});

test("pageMeta fits title and description but keeps the full social headline", () => {
  const title = "How Much Does an AI Agent Cost in India? An Honest 2026 Breakdown of Real Quotes";
  const meta = pageMeta({ path: "/writing/x", title, description: "x".repeat(40) + " word".repeat(60) });
  assert.deepEqual(meta.title, { absolute: "How Much Does an AI Agent Cost in India?" });
  assert.ok((meta.description ?? "").length <= DESCRIPTION_MAX + 2);
  assert.equal(meta.openGraph?.title, title);
});
