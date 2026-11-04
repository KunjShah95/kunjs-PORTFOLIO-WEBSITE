import archive from "@/content/essays.json";
import localArchive from "@/content/essays-local.json";
import paaArchive from "@/content/essay-paa.json";
import { ORIGIN } from "@/lib/routes";
import { nodesToText, parseArticleHtml } from "@/lib/article-html";

/* ==========================================================================
   The essay archive.

   Two committed sources, merged at module load:

   1. `content/essays.json` - the snapshot of the Medium feed, refreshed with
      `npm run sync:essays`.
   2. `content/essays-local.json` - original essays written for this site,
      never posted anywhere else. They carry `mediumUrl: null`: there is no
      external original, and the page says so instead of linking nowhere.

   Because both are committed, the site never depends on a third party being
   up to serve a page, and the article pages, the markdown twins, the RSS
   feed, portfolio.json and the command palette all read the same records.
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
  /** The original post, kept as the sameAs target for the article schema.
   *  `null` for essays written for this site; the page and schema then omit
   *  the Medium link and the sameAs entirely. */
  mediumUrl: string | null;
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

type LocalEssay = Omit<Essay, "wordCount" | "readMinutes">;

/** Word count and reading time for site-original essays, computed from the
 *  body through the same allowlist parser the page uses — so the number on
 *  the page always matches what the page renders. */
const localEssays: Essay[] = (localArchive.essays as LocalEssay[]).map((essay) => {
  const words = nodesToText(parseArticleHtml(essay.body)).split(" ").filter(Boolean).length;
  return {
    ...essay,
    wordCount: words,
    readMinutes: Math.max(1, Math.round(words / 230)),
  };
});

const essays = [...(archive.essays as Essay[]), ...localEssays];

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

/* ---------------------------------------------------- people also ask (AEO) */

export type EssayPaa = { question: string; answer: string };

/**
 * "People also ask" entries for an essay, keyed by slug in
 * content/essay-paa.json. Empty for an essay with no authored entries — the
 * page then renders no section and emits no FAQPage schema, rather than
 * padding the page with generic filler.
 */
export function essayPaa(slug: string): EssayPaa[] {
  const table = paaArchive.paa as Record<string, EssayPaa[]>;
  return table[slug] ?? [];
}
