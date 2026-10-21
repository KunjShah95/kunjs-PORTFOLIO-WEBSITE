import archive from "@/content/essays.json";
import { ORIGIN } from "@/lib/routes";

/* ==========================================================================
   The essay archive.

   A committed, build-time snapshot of the essays that actually exist. It used
   to be a hand-written list of eleven titles in lib/site-data.ts, but none of
   those posts were ever published — the Medium profile does not contain them,
   so every page that linked to them resolved to a redirect and no crawler
   could find a single citable article.

   The archive is refreshed from the Medium feed with `npm run sync:essays`.
   Because it is committed, the site never depends on a third party being up
   to serve a page, and the article pages, the markdown twins, the RSS feed,
   portfolio.json and the command palette all read the same records.
   ========================================================================== */

export type Essay = {
  slug: string;
  title: string;
  /** ISO timestamp. */
  date: string;
  /** Site category id, one of the ids in `ESSAY_CATEGORIES`. */
  category: string;
  tags: string[];
  excerpt: string;
  image: string | null;
  readMinutes: number;
  wordCount: number;
  /** The original post, kept as the sameAs target for the article schema. */
  mediumUrl: string;
  /** The body as published. Rendered through lib/article-html, never as raw HTML. */
  body: string;
};

export type EssayCategory = {
  id: string;
  label: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  agents: "Agents",
  edge: "Edge & Vision",
  genai: "Generative AI",
  mlops: "MLOps",
  ml: "Machine Learning",
  security: "Fairness & Safety",
};

export const ESSAY_CATEGORIES: readonly EssayCategory[] = [
  { id: "all", label: "All" },
  { id: "agents", label: "Agents" },
  { id: "edge", label: "Edge & Vision" },
  { id: "genai", label: "Generative AI" },
  { id: "mlops", label: "MLOps" },
  { id: "ml", label: "Machine Learning" },
  { id: "security", label: "Fairness & Safety" },
];

const essays = archive.essays as Essay[];

/** Newest first. */
export const essaysByDate: readonly Essay[] = [...essays].sort((a, b) => b.date.localeCompare(a.date));

export function essayBySlug(slug: string): Essay | undefined {
  return essays.find((essay) => essay.slug === slug);
}

/** Canonical URL of an essay page on this site. */
export function essayUrl(essay: Pick<Essay, "slug">): string {
  return `${ORIGIN}/writing/${essay.slug}`;
}

export function essayCategoryLabel(id: string): string {
  return CATEGORY_LABELS[id] ?? "Writing";
}

/** "Oct 2026" */
export function essayDateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Full date, for the article header and the schema. */
export function essayDateLong(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
