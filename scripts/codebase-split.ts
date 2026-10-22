/**
 * Measure how much of the codebase is agent/SEO plumbing versus portfolio.
 *
 * A portfolio can be excellent and still read as machine-generated if most of
 * its repository is crawler protocol rather than engineering. This buckets the
 * source by purpose so the ratio is visible.
 *
 * Run with: npx tsx scripts/codebase-split.ts
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();

type Bucket = { label: string; files: number; lines: number };

const BUCKETS: { label: string; test: (p: string) => boolean }[] = [
  {
    label: "AI-crawler / SEO protocol",
    test: (p) =>
      /robots\.txt|llms|humans\.txt|ai\.txt|mcp|openapi|portfolio\.json|indexnow|sitemap|ads\.txt|manifest\.json|api-catalog|server-card|contentsignals/i.test(
        p,
      ),
  },
  { label: "Contact / spam guard", test: (p) => /contact|spam-guard|turnstile/i.test(p) },
  { label: "Analytics / tracking", test: (p) => /analytics|click-tracker|engagement-tracker/i.test(p) },
  { label: "Project content data", test: (p) => /site-data|essays|article-html|article-body/i.test(p) },
  { label: "SEO metadata helpers", test: (p) => /seo|json-ld|cite/i.test(p) },
  { label: "Shell / navigation / motion", test: (p) => /shell|primitives|blocks|page-intro|pull-quote/i.test(p) },
  { label: "Visual / layout components", test: (p) => /components/i.test(p) },
  { label: "Tests", test: (p) => /tests?[/\\]/i.test(p) },
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".git" || entry === ".next" || entry === "out") continue;
    if (entry === "public" || entry === "videos" || entry === "audit-shots") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|js|mjs|json|css)$/.test(entry)) out.push(full);
  }
  return out;
}

function run() {
  const files = walk(ROOT);
  const buckets = new Map<string, Bucket>();
  for (const bucket of BUCKETS) buckets.set(bucket.label, { label: bucket.label, files: 0, lines: 0 });

  let totalFiles = 0;
  let totalLines = 0;
  const assigned = new Set<string>();

  for (const file of files) {
    const rel = relative(ROOT, file).replace(/\\/g, "/");
    if (rel.startsWith("scripts/audit") || rel.startsWith("scripts/verify") || rel.startsWith("scripts/claim") || rel.startsWith("scripts/repo-") || rel.startsWith("scripts/design-") || rel.startsWith("scripts/shots")) continue;
    const lines = readFileSync(file, "utf8").split("\n").length;
    totalFiles += 1;
    totalLines += lines;
    for (const bucket of BUCKETS) {
      if (bucket.test(rel)) {
        const b = buckets.get(bucket.label)!;
        b.files += 1;
        b.lines += lines;
        assigned.add(rel);
        break;
      }
    }
  }

  console.log(`total source files: ${totalFiles} | total lines: ${totalLines}\n`);
  console.log("bucket".padEnd(34), "files".padStart(6), "lines".padStart(8), "share".padStart(8));
  console.log("-".repeat(60));
  for (const bucket of buckets.values()) {
    const share = ((bucket.lines / totalLines) * 100).toFixed(1);
    console.log(bucket.label.padEnd(34), String(bucket.files).padStart(6), String(bucket.lines).padStart(8), `${share}%`.padStart(8));
  }
  console.log("-".repeat(60));
  console.log("unclassified".padEnd(34), String(totalFiles - assigned.size).padStart(6));

  const protocol = buckets.get("AI-crawler / SEO protocol")!;
  const content = buckets.get("Project content data")!;
  console.log(
    `\nprotocol-to-content ratio: ${(protocol.lines / content.lines).toFixed(2)}x (${protocol.lines} vs ${content.lines} lines)`,
  );
}

run();
