import { strict as assert } from "node:assert";
import { test } from "node:test";

import { PUBLIC_ROUTES } from "../lib/routes";
import { renderMarkdown } from "../lib/markdown";
import { resolveServicePage, servicePages } from "../lib/service-pages";

test("every service page resolves to real projects, essays and prices", () => {
  for (const entry of servicePages) {
    const page = resolveServicePage(entry); // throws on a dangling reference
    assert.ok(page.projects.length >= 3, `${entry.path}: a service page needs at least three case studies behind it`);
    assert.ok(page.tiers.length > 0, `${entry.path}: no price band matched`);
    assert.ok(page.essays.length > 0, `${entry.path}: no essay matched its tags`);
    assert.ok(page.faqs.length >= 3, `${entry.path}: too few questions answered`);
  }
});

test("every service page is in the sitemap and has a Markdown twin", () => {
  const routes = new Set(PUBLIC_ROUTES.map((route) => route.path));
  for (const entry of servicePages) {
    assert.ok(routes.has(entry.path), `${entry.path} is missing from PUBLIC_ROUTES`);
    const md = renderMarkdown(entry.path);
    assert.ok(md && md.includes("How I build it"), `${entry.path} has no Markdown twin`);
  }
});
