#!/usr/bin/env node
/**
 * Stage selected hunks from `git diff` into the index.
 *
 * The working tree carries a second, unrelated feature alongside this work,
 * and in a few files the two interleave in the same file. Rather than
 * sweeping the other feature into the commit, this keeps only the hunks
 * whose added/removed lines match one of the given markers.
 *
 * Usage: node scripts/stage-hunks.mjs <file> <marker> [<marker> ...]
 */
import { execFileSync } from "node:child_process";

const [file, ...markers] = process.argv.slice(2);
if (!file || markers.length === 0) {
  console.error("usage: stage-hunks.mjs <file> <marker> [...]");
  process.exit(1);
}

const diff = execFileSync("git", ["diff", "-U3", "--", file], {
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});

const lines = diff.split("\n");
const header = [];
let i = 0;
for (; i < lines.length; i++) {
  if (lines[i].startsWith("@@")) break;
  header.push(lines[i]);
}

// Split the body into hunks.
const hunks = [];
let current = null;
for (; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith("@@")) {
    if (current) hunks.push(current);
    current = { header: line, body: [] };
  } else if (current) {
    current.body.push(line);
  }
}
if (current) hunks.push(current);

// `split("\n")` leaves a trailing empty element for the diff's final newline.
// An empty line is not a valid patch line, so it has to go — and the patch
// has to end with a newline of its own.
for (const hunk of hunks) {
  while (hunk.body.length > 0 && hunk.body[hunk.body.length - 1] === "") {
    hunk.body.pop();
  }
}

const kept = hunks.filter((hunk) => {
  const changed = hunk.body
    .filter((l) => l.startsWith("+") || l.startsWith("-"))
    .join("\n");
  return markers.some((marker) => changed.includes(marker));
});

if (kept.length === 0) {
  console.error(`no hunks matched for ${file}`);
  process.exit(1);
}

const patch =
  [...header, ...kept.flatMap((h) => [h.header, ...h.body])].join("\n") + "\n";

// `--recount` recomputes the line counts in each hunk header from the body
// itself. Filtering hunks out of a diff can leave the surviving headers
// describing a shape that no longer matches their own content, and git
// rejects the whole patch rather than the individual hunk.
execFileSync("git", ["apply", "--cached", "--recount", "-"], {
  input: patch,
  encoding: "utf8",
});

console.log(`${file}: staged ${kept.length}/${hunks.length} hunks`);
