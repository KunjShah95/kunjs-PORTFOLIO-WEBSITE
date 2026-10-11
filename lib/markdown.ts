import { citationFormats, canonicalUrls } from "@/lib/cite";
import { legalDocuments, type LegalDocument } from "@/lib/legal";
import { ORIGIN, PUBLIC_ROUTES } from "@/lib/routes";
import {
  articles,
  contributions,
  directChannels,
  education,
  hackathons,
  hiringFaqs,
  jobs,
  labs,
  principles,
  projectBySlug,
  projects,
  services,
  site,
  skillGroups,
  type Project,
} from "@/lib/site-data";

/* ==========================================================================
   Markdown twins of the HTML pages.

   Served to agents that send `Accept: text/markdown` (see proxy.ts), so a
   tool can read a page without parsing the React tree. Built from the same
   data as the pages, so the two cannot drift apart. Each document opens with
   its canonical HTML URL so a citation always points at the real page.
   ========================================================================== */

type Doc = { title: string; body: string };

const list = (items: readonly string[]) => items.map((i) => `- ${i}`).join("\n");

function frame(path: string, { title, body }: Doc): string {
  return `# ${title}\n\n> Canonical: ${ORIGIN}${path || "/"} · ${site.name}, ${site.role}\n\n${body.trim()}\n\n---\n\n${footer()}\n`;
}

function footer(): string {
  const pages = PUBLIC_ROUTES.map((r) => `[${r.path || "/"}](${ORIGIN}${r.path || "/"})`).join(" · ");
  return `Contact: ${site.email} · ${ORIGIN}/contact\n\nPages: ${pages}\n\nFull site summary: ${ORIGIN}/llms-full.txt`;
}

function projectSection(p: Project, level = "##"): string {
  const parts = [
    level ? `${level} ${p.title}` : "",
    `${p.category} · ${p.status}`,
    p.description,
    p.metrics.length ? list(p.metrics.map((m) => `${m.value} ${m.label}`)) : "",
    `Stack: ${p.stack.join(", ")}`,
  ];
  if (level === "##") {
    parts.push(`Case study: ${ORIGIN}/projects/${p.slug}`);
  } else {
    if (p.role) parts.push(`**Role.** ${p.role}`);
    parts.push(`## How it works\n\n${p.body}`);
    if (p.challenges) parts.push(`## Challenges\n\n${p.challenges}`);
    if (p.evaluation) parts.push(`## Evaluation\n\n${p.evaluation}`);
    if (p.limitations) parts.push(`## Limitations\n\n${p.limitations}`);
    if (p.lessons) parts.push(`## Lessons\n\n${p.lessons}`);
  }
  const links = [p.demo && `Live demo: ${p.demo}`, p.github && `Source: ${p.github}`].filter(Boolean);
  if (links.length) parts.push(links.join("\n"));
  return parts.filter(Boolean).join("\n\n");
}

function legal(doc: LegalDocument): Doc {
  const sections = doc.sections.map((s, i) => {
    const blocks = s.blocks.map((b) => {
      switch (b.kind) {
        case "p":
          return b.text;
        case "h3":
          return `### ${b.text}`;
        case "ul":
          return list(b.items);
        case "ol":
          return b.items.map((item, n) => `${n + 1}. ${item}`).join("\n");
        case "note":
          return `> **${b.title}** ${b.text}`;
      }
    });
    return `## ${i + 1}. ${s.title}\n\n${blocks.join("\n\n")}`;
  });
  return { title: doc.title, body: `${doc.lead}\n\nEffective: ${doc.effective}\n\n${sections.join("\n\n")}` };
}

const pages: Record<string, () => Doc> = {
  "": () => ({
    title: `${site.name} — ${site.role}`,
    body: `${site.hero}\n\n${hiringFaqs[0].answer}\n\n## Selected projects\n\n${list(
      projects.slice(0, 6).map((p) => `[${p.title}](${ORIGIN}/projects/${p.slug}) — ${p.summary}`),
    )}\n\n## Services\n\n${list(services.map((s) => `**${s.title}.** ${s.body}`))}\n\nPricing: ${ORIGIN}/pricing.md`,
  }),
  "/projects": () => ({
    title: "Projects",
    body: projects.map((p) => projectSection(p)).join("\n\n"),
  }),
  "/about": () => ({
    title: `About ${site.name}`,
    body: `${hiringFaqs.map((f) => `## ${f.question}\n\n${f.answer}`).join("\n\n")}\n\nLocation: ${site.locationLong} (${site.timezone})`,
  }),
  "/skills": () => ({
    title: "Skills",
    body: skillGroups.map((g) => `## ${g.title}\n\n${g.description}\n\n${list(g.skills)}`).join("\n\n"),
  }),
  "/writing": () => ({
    title: "Writing",
    body: `${list(articles.map((a) => `**${a.title}** (${a.date}, ${a.readTime}) — ${a.excerpt}`))}\n\nAll essays: ${site.links.medium}`,
  }),
  "/experience": () => ({
    title: "Experience",
    body: jobs
      .map((j) => `## ${j.role} — ${j.company}\n\n${j.period} · ${j.kind}\n\n${j.description}\n\nSkills: ${j.skills.join(", ")}`)
      .join("\n\n"),
  }),
  "/hackathons": () => ({
    title: "Hackathons",
    body: hackathons
      .map((h) => `## ${h.title} — ${h.event} ${h.year}\n\n${h.placement} · ${h.team}\n\n${h.description}`)
      .join("\n\n"),
  }),
  "/open-source": () => ({
    title: "Open source",
    body: contributions
      .map((c) => `## ${c.org} (${c.kind}, ${c.tag})\n\n${c.title}\n\n${c.url}`)
      .join("\n\n"),
  }),
  "/labs": () => ({
    title: "Labs",
    body: labs
      .map((l) => `## ${l.id} ${l.title} (${l.status})\n\n${l.description}\n\nStack: ${l.stack.join(", ")}${l.url ? `\n\n${l.url}` : ""}`)
      .join("\n\n"),
  }),
  "/manifesto": () => ({
    title: "Manifesto",
    body: principles
      .map((p) => `## ${p.number}. ${p.title}\n\n${p.body}\n\n${list(p.ships.map((s) => `${s.claim} (${ORIGIN}/projects/${s.project})`))}`)
      .join("\n\n"),
  }),
  "/education": () => ({
    title: "Education",
    body: `## ${education.degree} — ${education.institution}\n\n${education.period} · ${education.year} · ${education.location}\n\nSpecialization: ${education.specialization}\n\n${education.summary}\n\nCoursework:\n\n${list(education.coursework)}`,
  }),
  "/contact": () => ({
    title: "Contact and hiring",
    body: `Email ${site.email}, or send the form at ${ORIGIN}/contact (fields: name, email, company optional, focus, timeline, details of 20+ characters). Submitting sends one email; replies within a day.\n\n## Services\n\n${list(
      services.map((s) => `**${s.title}.** ${s.body} Outcome: ${s.outcome}`),
    )}\n\n## Channels\n\n${list(directChannels.map((c) => `${c.label}: ${c.href}`))}\n\nPricing: ${ORIGIN}/pricing.md · Services: ${ORIGIN}/services.md`,
  }),
  "/cite": () => ({
    title: `How to cite ${site.name}`,
    body: `${citationFormats.map((f) => `## ${f.label}\n\n${f.text}`).join("\n\n")}\n\n## Canonical URLs\n\n${list(canonicalUrls.map((u) => `${u.label}: ${u.url}`))}`,
  }),
  ...Object.fromEntries(legalDocuments.map((doc) => [doc.path, () => legal(doc)])),
};

/** Markdown for a public path, or `null` when no such page exists. */
export function renderMarkdown(path: string): string | null {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  const project = clean.match(/^\/projects\/([^/]+)$/);
  if (project) {
    const p = projectBySlug(project[1]);
    return p ? frame(clean, { title: p.title, body: projectSection(p, "") }) : null;
  }
  const page = pages[clean];
  return page ? frame(clean, page()) : null;
}

export function notFoundMarkdown(path: string): string {
  return `# Not found\n\nThere is no page at \`${path}\` on ${ORIGIN}.\n\n---\n\n${footer()}\n`;
}
