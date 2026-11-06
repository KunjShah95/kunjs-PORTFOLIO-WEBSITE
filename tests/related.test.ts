import { strict as assert } from "node:assert";
import { test } from "node:test";

import { essayBySlug, essaysByDate } from "../lib/essays";
import { projectBySlug, projects } from "../lib/site-data";
import { essaysForProject, projectsForEssay } from "../lib/related";

const essayFor = (slug: string) => {
  const essay = essaysByDate.find((e) => e.slug.includes(slug));
  assert.ok(essay, `no essay matching ${slug}`);
  return essay;
};

test("topic essays link to the system they describe", () => {
  assert.equal(projectsForEssay(essayFor("edge-computer-vision"))[0]?.title, "Computer Vision for Railway Inspection");
  assert.equal(projectsForEssay(essayFor("upi-fraud"))[0]?.title, "UPI Fraud Guard");
  assert.equal(projectsForEssay(essayFor("bpe"))[0]?.title, "MinBPE Tokenizer");
});

test("case studies link back to the essays behind them", () => {
  const walkcast = projects.find((p) => p.title === "Walkcast");
  assert.ok(walkcast);
  assert.ok(essaysForProject(walkcast).some((e) => /verification/i.test(e.title)));
});

test("related links only point at real pages", () => {
  for (const essay of essaysByDate) {
    for (const project of projectsForEssay(essay)) assert.ok(projectBySlug(project.slug));
  }
  for (const project of projects) {
    for (const essay of essaysForProject(project)) assert.ok(essayBySlug(essay.slug));
  }
});
