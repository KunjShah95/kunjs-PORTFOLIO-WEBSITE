/**
 * Generates public/services.md, and the Services section of public/llms-full.txt,
 * from lib/site-data.ts.
 *
 *   npm run gen:services
 *
 * Both files are served publicly and advertised to agents from llms.txt,
 * ai.txt, the API catalog, the MCP server card and cite.ts. Both were
 * previously maintained by hand, which let them drift from the source data
 * until the services were restructured around problem/deliverable/proof.
 * Generating them means the copy an agent reads cannot disagree with the page.
 *
 * Run after changing `services`, `engagements`, or the contact details in
 * `site`. The output is committed; this script is not run at build time.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { engagements, services, site } from "../lib/site-data.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://kunjshah.in";
const TODAY = new Date().toISOString().slice(0, 10);

const h2 = (text: string) => `## ${text}`;
const h3 = (text: string) => `### ${text}`;

const lines: string[] = [
  "# Services: Kunj Shah (AI Engineer & Agent Builder)",
  "",
  "> Machine-readable services summary for AI agents and prospective clients.",
  `> Contact: ${site.email} · ${ORIGIN}/contact`,
  "> Last updated: " + TODAY,
  "",
  "## Who This Is For",
  "",
  "Founders, startups, and engineering teams that need AI shipped, not a slide deck.",
  "Kunj Shah builds production AI systems from brief to deployment in weeks, not quarters.",
  "",
  "## Services",
  "",
  "Each service leads with the problem a prospect recognises as their own, then",
  "what actually ships, then the shipped system that backs the claim.",
  "",
];

services.forEach((service, i) => {
  lines.push(
    h3(`${i + 1}. ${service.title}`),
    "",
    `- **Problem:** ${service.problem}`,
    `- **What you get:** ${service.deliverable}`,
    `- **Proof:** ${service.proof}`,
    `- **Stack:** ${service.stack.join(", ")}`,
    "",
  );
});

lines.push(h2("Ways to work together"), "");

engagements.forEach((path) => {
  lines.push(
    h3(`${path.audience}: ${path.title}`),
    "",
    path.body,
    "",
    ...path.proof.map((line) => `- ${line}`),
    "",
    `Next step: ${ORIGIN}${path.href}`,
    "",
  );
});

lines.push(
  h2("Availability"),
  "",
  "- Open to: freelance, contract, part-time retainer, and full-time AI roles",
  `- Location: ${site.location} (remote-friendly, UTC+5:30)`,
  `- See ${ORIGIN}/pricing.md for rates`,
  "",
);

const out = join(ROOT, "public", "services.md");
writeFileSync(out, lines.join("\n"), "utf8");
console.log(`wrote ${out} (${services.length} services, ${engagements.length} engagements)`);

/* ------------------------------------------------------------------------- */
/*                      llms-full.txt services block                         */
/* ------------------------------------------------------------------------- */

/**
 * `llms-full.txt` is the single-fetch context dump for LLMs, and its Services
 * section had the same drift: it still listed the pre-restructure service
 * titles while `services.md` and the pages had moved on. Only that one section
 * is generated here. The rest of the file is hand-written prose and evidence,
 * which is deliberately not derived from site-data.
 *
 * Rewrites between the section heading and the next top-level heading so the
 * surrounding hand-written content is preserved verbatim.
 */
const fullPath = join(ROOT, "public", "llms-full.txt");
const full = readFileSync(fullPath, "utf8");

const START = "## Services (also see /services.md for agent-parseable version)";
const END = "## Pricing (INR, also see /pricing.md)";

const startAt = full.indexOf(START);
const endAt = full.indexOf(END);
if (startAt === -1 || endAt === -1 || endAt < startAt) {
  throw new Error(
    `Could not locate the Services block in llms-full.txt (start=${startAt}, end=${endAt}). ` +
      "Update the START/END markers in this script to match the current headings.",
  );
}

const block = [
  START,
  "",
  "Each service leads with the problem it solves, what ships, and proof from a built system.",
  "",
  ...services.map(
    (service, i) =>
      `${i + 1}. ${service.title} (${service.pill}): ${service.problem} ${service.deliverable} Proof: ${service.proof}`,
  ),
  "",
  "**Ways to work together:**",
  "",
  ...engagements.map((path) => `- ${path.audience}: ${path.title}. ${path.body}`),
  "",
  "**How we work:** 15-min intro (free) → fixed quote in writing (40%/60%) → weekly demos → you own everything (repo/CI/cloud/docs)",
  "",
  "",
].join("\n");

writeFileSync(fullPath, full.slice(0, startAt) + block + full.slice(endAt), "utf8");
console.log(`wrote ${fullPath} (services section, ${services.length} services)`);