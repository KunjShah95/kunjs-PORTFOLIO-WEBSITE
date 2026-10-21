#!/usr/bin/env node
/**
 * Stages a file as "HEAD plus only these edits", for files where this
 * work and another in-flight change are interleaved in the same file.
 *
 * The file is read from HEAD, the given replacements are applied to that
 * text, and the result is written straight into the index. The working
 * tree is left alone, so the other change stays unstaged.
 *
 * Usage: node scripts/stage-edit.mjs <file> <edits.json>
 *
 * edits.json: [{ "find": "<text in the HEAD file>", "replace": "<new text>" }]
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { writeFileSync } from "node:fs";

const [file, editsPath] = process.argv.slice(2);
if (!file || !editsPath) {
  console.error("usage: stage-edit.mjs <file> <edits.json>");
  process.exit(1);
}

const edits = JSON.parse(readFileSync(editsPath, "utf8"));

const head = execFileSync("git", ["show", `HEAD:${file}`], {
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});

let content = head;
for (const [i, edit] of edits.entries()) {
  if (!content.includes(edit.find)) {
    console.error(`edit ${i}: the text to replace was not found in HEAD:${file}`);
    process.exit(1);
  }
  content = content.replace(edit.find, edit.replace);
}

// Write the result into the index without touching the working tree.
const hash = execFileSync("git", ["hash-object", "-w", "--stdin"], {
  input: content,
  encoding: "utf8",
}).trim();

execFileSync("git", ["update-index", "--cacheinfo", "100644", hash, file]);

console.log(`${file}: staged (${edits.length} edit(s) applied to HEAD)`);
