import type { IconName } from "@/components/icon";
import { articles, indexItems, projects, site } from "@/lib/site-data";

/**
 * Command model behind the ⌘K palette.
 *
 * Kept in `lib/` rather than inside the palette component so the list is
 * derived from `site-data` at build time: adding a page or a project to the
 * data file makes it searchable with no extra wiring.
 *
 * Ranking is a small hand-rolled scorer rather than a fuzzy-match dependency.
 * The corpus is a few dozen short strings, so a subsequence match over
 * word-initial characters is both faster and more predictable than
 * Levenshtein — it rewards "pjs" -> "Projects" without the noise that
 * edit-distance matching introduces on words this short.
 */

export type CommandGroup = "Navigate" | "Work" | "Writing" | "Actions";

export type Command = {
  id: string;
  label: string;
  /** Secondary line: a description, a date, or a hint. */
  detail?: string;
  group: CommandGroup;
  href?: string;
  /** External links open in a new tab. */
  external?: boolean;
  /** Keywords that match but do not appear in the label. */
  keywords?: string;
  icon?: IconName;
};

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
      href: "/projects",
      keywords: project.stack.join(" "),
    }),
  ),

  // --- Writing: essays, newest first ------------------------------------
  ...articles.map(
    (article): Command => ({
      id: `article:${article.slug}`,
      label: article.title,
      detail: `${article.categoryLabel} · ${article.date}`,
      group: "Writing",
      href: "/writing",
      keywords: article.category,
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
];

/**
 * Score a command against a lowercased query. Higher is better; `null` means
 * no match at all.
 *
 * Three passes, each stronger than the next:
 *   1. label starts with the query        -> 100
 *   2. label contains the query           ->  60
 *   3. keywords / detail contain it       ->  25
 * A subsequence match over word initials gets 40, which is what makes
 * "pjs" resolve to "Projects" and "cv" to "Resume".
 */
export function scoreCommand(command: Command, query: string): number | null {
  if (!query) return 0;

  const label = command.label.toLowerCase();
  const haystack = `${command.detail ?? ""} ${command.keywords ?? ""}`.toLowerCase();

  if (label.startsWith(query)) return 100;
  if (label.includes(query)) return 60;
  if (haystack.includes(query)) return 25;
  if (matchesInitials(label, query)) return 40;

  return null;
}

/** `pjs` matches "projects"; `cv` matches "resume" only via keywords. */
function matchesInitials(label: string, query: string): boolean {
  if (query.length < 2) return false;
  let i = 0;
  for (const char of label) {
    if (char === " " || char === "-") {
      i = 0;
      continue;
    }
    if (char === query[i]) i += 1;
    if (i === query.length) return true;
  }
  return false;
}

/** Filter and order the corpus for a query. */
export function searchCommands(query: string, limit = 12): Command[] {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    // Empty query: show the navigation spine so the palette is never blank.
    return commands.filter((c) => c.group === "Navigate").slice(0, limit);
  }

  return commands
    .map((command) => ({ command, score: scoreCommand(command, trimmed) }))
    .filter((entry): entry is { command: Command; score: number } => entry.score !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.command);
}
