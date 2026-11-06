import { strict as assert } from "node:assert";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { projects } from "../lib/site-data";
import { hasRecordingFacts, projectVideo, videoObjectJsonLd, xmlEscape } from "../lib/project-video";

const ROOT = join(import.meta.dirname, "..");

test("every demo recording has duration and upload date for VideoObject", () => {
  for (const project of projects) {
    if (!project.video) continue;
    assert.ok(hasRecordingFacts(project.video), `${project.slug}: add ${project.video} to RECORDINGS`);
    for (const ext of ["mp4", "webm", "jpg", "webp"]) {
      assert.ok(existsSync(join(ROOT, "public", `${project.video}.${ext}`)), `${project.video}.${ext} missing`);
    }
  }
});

test("VideoObject has the fields Google requires and points at the case study", () => {
  const project = projects.find((p) => p.video)!;
  const ld = videoObjectJsonLd(projectVideo(project)!);
  for (const key of ["name", "description", "thumbnailUrl", "uploadDate", "contentUrl"]) {
    assert.ok(ld[key], `missing ${key}`);
  }
  assert.match(String(ld.duration), /^PT\d+S$/);
  assert.equal(ld.url, `https://kunjshah.in/projects/${project.slug}`);
});

test("sitemap text is XML-escaped", () => {
  assert.equal(xmlEscape(`A & B <c> "d" 'e'`), "A &amp; B &lt;c&gt; &quot;d&quot; &apos;e&apos;");
});
