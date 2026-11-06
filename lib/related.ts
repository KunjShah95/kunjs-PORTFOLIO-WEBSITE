import { essaysByDate, type Essay } from "@/lib/essays";
import { projects, type Project } from "@/lib/site-data";

/**
 * Cross-links between essays and case studies.
 *
 * Most search visitors land on one essay or the home page and leave from it.
 * An essay about model routing should point at the system that does model
 * routing, and that case study should point back at the essay that explains
 * the idea. Scoring is plain keyword overlap, computed at build time from the
 * same data the pages render, so a new essay or project links itself.
 */

const STOPWORDS = new Set(
  "the and for with from that this into your you are how what why who does its not but all any one two can than then them they their our out per via use using used vs only more most just over also very python software development artificial intelligence programming personal data production what".split(
    " ",
  ),
);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ")
    .split(" ")
    .map((word) => word.replace(/^\.+|\.+$/g, ""))
    .filter((word) => word.length >= 3 && !STOPWORDS.has(word));
}

/** Essay categories map to words a matching project uses about itself. */
const CATEGORY_HINTS: Record<string, string[]> = {
  agents: ["agent", "agents", "agentic"],
  edge: ["vision", "edge", "yolov8", "inspection"],
  genai: ["llm", "rag", "retrieval", "model"],
  mlops: ["infrastructure", "benchmark", "serving", "pipeline"],
  ml: ["ml", "xgboost", "classification", "prediction"],
  security: ["security", "owasp", "fairness", "audit"],
};

function essayTerms(essay: Essay): Map<string, number> {
  const weights = new Map<string, number>();
  const add = (words: string[], weight: number) => {
    for (const word of words) weights.set(word, Math.max(weights.get(word) ?? 0, weight));
  };
  add(tokens(essay.excerpt), 1);
  add(tokens(essay.title), 2);
  add(essay.tags.flatMap(tokens), 3);
  add(CATEGORY_HINTS[essay.category] ?? [], 1);
  return weights;
}

function projectText(project: Project): Set<string> {
  return new Set(
    tokens(
      [project.title, project.category, project.description, project.summary, ...project.stack].join(" "),
    ),
  );
}

function score(essay: Essay, project: Project): number {
  const words = projectText(project);
  let total = 0;
  for (const [word, weight] of essayTerms(essay)) if (words.has(word)) total += weight;
  return total;
}

/** A match has to share more than one incidental word to be worth a link. */
const MIN_SCORE = 5;

function ranked<T>(items: readonly T[], scoreOf: (item: T) => number, limit: number): T[] {
  return items
    .map((item, index) => ({ item, index, score: scoreOf(item) }))
    .filter((entry) => entry.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((entry) => entry.item);
}

/** Case studies an essay's reader would want next, best match first. */
export function projectsForEssay(essay: Essay, limit = 2): Project[] {
  return ranked(projects, (project) => score(essay, project), limit);
}

/** Essays that explain the ideas behind a case study, best match first. */
export function essaysForProject(project: Project, limit = 3): Essay[] {
  return ranked(essaysByDate, (essay) => score(essay, project), limit);
}
