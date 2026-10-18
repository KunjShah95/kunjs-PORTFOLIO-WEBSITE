/**
 * Generates public/services.md from lib/site-data.ts.
 *
 *   node --experimental-strip-types scripts/gen-services-md.ts
 *
 * The file is served at /services.md and advertised to agents from llms.txt,
 * ai.txt, the API catalog, the MCP server card and cite.ts. It was previously
 * maintained by hand, which let it drift from the source data until the
 * services were restructured around problem/deliverable/proof. Generating it
 * means the copy an agent reads cannot disagree with the page.
 *
 * Run after changing `services`, `engagements`, or the contact details in
 * `site`. The output is committed; this script is not run at build time.
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { engagements, services, site } from "../lib/site-data.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://kunjshah.in";
const TODAY = new Date().toISOString().slice(0, 10);

const h2 = (text: string) => `## ${text}`;
const h3 = (text: string) => `### ${text}`;

const lines: string[] = [
  "# Services — Kunj Shah (AI Engineer & Agent Builder)",
  "",
  "> Machine-readable services summary for AI agents and prospective clients.",
  `> Contact: ${site.email} · ${ORIGIN}/contact`,
  "> Last updated: " + TODAY,
  "",
  "## Who This Is For",
  "",
  "Founders, startups, and engineering teams that need AI shipped — not a slide deck.",
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
    h3(`${path.audience} — ${path.title}`),
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