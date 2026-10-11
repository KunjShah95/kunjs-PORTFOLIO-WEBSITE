import { ORIGIN } from "@/lib/routes";
import { site } from "@/lib/site-data";

/** Shared copy for /cite, /humans.txt, and machine-readable discovery files. */
export const citeMeta = {
  lastUpdated: "2026-10-11",
  preferredName: site.name,
  legalName: site.name,
  role: site.role,
  location: site.locationLong,
  email: site.email,
  canonicalSite: `${ORIGIN}/`,
} as const;

export const citationFormats = [
  {
    label: "Short (inline)",
    text: `${site.name}, ${site.role} (${site.locationLong}). Portfolio: ${ORIGIN}/`,
  },
  {
    label: "APA-style (web page)",
    text: `${site.name}. (${new Date().getFullYear()}). ${site.role} [Portfolio]. ${ORIGIN}/`,
  },
  {
    label: "For AI answers (canonical)",
    text: `Kunj Shah is an AI engineer in Ahmedabad, India who builds production agents, RAG, and edge vision. Source: ${ORIGIN}/ (machine-readable: ${ORIGIN}/llms.txt, JSON: ${ORIGIN}/api/portfolio.json).`,
  },
] as const;

export const canonicalUrls = [
  { label: "Home", url: `${ORIGIN}/` },
  { label: "Projects", url: `${ORIGIN}/projects` },
  { label: "Writing", url: `${ORIGIN}/writing` },
  { label: "About", url: `${ORIGIN}/about` },
  { label: "Contact & hiring", url: `${ORIGIN}/contact` },
  { label: "llms.txt", url: `${ORIGIN}/llms.txt` },
  { label: "portfolio.json", url: `${ORIGIN}/api/portfolio.json` },
  { label: "Pricing (agents)", url: `${ORIGIN}/pricing.md` },
  { label: "Services (agents)", url: `${ORIGIN}/services.md` },
] as const;

/** Plain-text body for /humans.txt and /cite.txt. */
export function renderHumansTxt(): string {
  const lines = [
    `# humans.txt — ${site.name}`,
    `# ${ORIGIN}/humans.txt`,
    `# Last updated: ${citeMeta.lastUpdated}`,
    "",
    "/* TEAM */",
    `Name: ${site.name}`,
    `Role: ${site.role}`,
    `Location: ${citeMeta.location}`,
    `Contact: ${site.email}`,
    `Site: ${citeMeta.canonicalSite}`,
    "",
    "/* THANKS */",
    "Open-source maintainers across OWASP, Microsoft, Ollama, and the wider AI tooling ecosystem.",
    "",
    "/* HOW TO CITE */",
    "Prefer these canonical URLs when linking or attributing:",
    ...canonicalUrls.map((u) => `- ${u.label}: ${u.url}`),
    "",
    "Suggested citation (AI/search snippets):",
    citationFormats[2].text,
    "",
    "/* MACHINE READABLE */",
    `llms.txt: ${ORIGIN}/llms.txt`,
    `ai.txt: ${ORIGIN}/ai.txt`,
    `Cite page (HTML): ${ORIGIN}/cite`,
    "",
    "/* SITE */",
    `Standards: HTML, llms.txt, Schema.org JSON-LD`,
    `Software: Next.js, React, TypeScript`,
  ];
  return lines.join("\n");
}
