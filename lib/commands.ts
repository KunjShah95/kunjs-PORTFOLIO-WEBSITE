import type { Command } from "@/lib/command-search";
import { legalDocuments } from "@/lib/legal";
import { essayCategoryLabel, essayDateLabel, essaysByDate } from "@/lib/essays";
import { indexItems, projects, site } from "@/lib/site-data";

/**
 * Command list behind the ⌘K palette, derived from `site-data` and the essay
 * archive at build time: adding a page, project or essay makes it searchable
 * with no extra wiring.
 *
 * Server-only in practice: it is served as static JSON by
 * `app/api/commands/route.ts`. Client code imports `lib/command-search`
 * instead, so this module's data never lands in a browser bundle.
 */

const RESUME = {
  label: "Resume",
  href: "/kunjshah_cv.pdf",
  detail: "PDF",
  external: true,
} as const;

export const commands: readonly Command[] = [
  // --- Navigate: every page in the site index ---------------------------
  ...indexItems.map(
    (item): Command => ({
      id: `nav:${item.href}`,
      label: item.label,
      detail: item.description,
      group: "Navigate",
      href: item.href,
      icon: item.icon,
    }),
  ),

  // --- Work: shipped projects -------------------------------------------
  ...projects.map(
    (project): Command => ({
      id: `project:${project.slug}`,
      label: project.title,
      detail: `${project.category} · ${project.metrics[0]?.value ?? ""} ${project.metrics[0]?.label.toLowerCase() ?? ""}`.trim(),
      group: "Work",
      href: `/projects/${project.slug}`,
      keywords: project.stack.join(" "),
    }),
  ),

  // --- Writing: essays, newest first ------------------------------------
  // Each entry points at the article page on this site, so a search result
  // can be opened directly.
  ...essaysByDate.map(
    (essay): Command => ({
      id: `article:${essay.slug}`,
      label: essay.title,
      detail: `${essayCategoryLabel(essay.category)} · ${essayDateLabel(essay.date)}`,
      group: "Writing",
      href: `/writing/${essay.slug}`,
      keywords: essay.tags.join(" "),
    }),
  ),

  // --- Actions: the ways to actually reach him --------------------------
  {
    id: "action:email",
    label: `Email ${site.name}`,
    detail: site.email,
    group: "Actions",
    href: `mailto:${site.email}`,
    external: true,
    icon: "mail",
  },
  {
    id: "action:resume",
    label: RESUME.label,
    detail: RESUME.detail,
    group: "Actions",
    href: RESUME.href,
    external: true,
    icon: "download",
  },
  {
    id: "action:github",
    label: "GitHub",
    detail: "Source and open-source work",
    group: "Actions",
    href: site.links.github,
    external: true,
    icon: "code_blocks",
  },
  {
    id: "action:linkedin",
    label: "LinkedIn",
    detail: "Professional profile",
    group: "Actions",
    href: site.links.linkedin,
    external: true,
  },
  {
    id: "action:x",
    label: "X",
    detail: "Notes and threads",
    group: "Actions",
    href: site.links.x,
    external: true,
  },
  {
    id: "action:huggingface",
    label: "Hugging Face",
    detail: "Models and datasets",
    group: "Actions",
    href: site.links.huggingface,
    external: true,
  },

  // --- Legal: what a client checks before sending an enquiry -------------
  ...legalDocuments.map(
    (doc): Command => ({
      id: `legal:${doc.path}`,
      label: doc.title,
      detail: doc.description,
      group: "Legal",
      href: doc.path,
      icon: doc.icon,
    }),
  ),
];
