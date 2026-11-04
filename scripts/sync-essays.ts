/* ==========================================================================
   Refresh the essay archive from the Medium feed.

     npm run sync:essays

   The site used to advertise a hand-written list of eleven essays that were
   never published: the Medium profile does not contain them, so every link
   that pointed at them resolved to a redirect and no engine could cite a
   single one. This script replaces that list with the posts that actually
   exist, captured with their full bodies.

   The output is committed, so the site never depends on Medium being up: the
   article pages, the markdown twins, the RSS feed, portfolio.json and the
   command palette all read the same archive. Re-run it when a new essay is
   published; the diff shows exactly what changed.

   Essays written for this site live in content/essays-local.json and are
   merged in for the discovery-file writing sections only; this script never
   writes to that file.

     npm run sync:essays -- --offline

   skips the feed and leaves content/essays.json untouched: it only rebuilds
   the discovery-file writing sections from the committed archives. Run it
   after editing content/essays-local.json.
   ========================================================================== */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "content", "essays.json");
const FEED_URL = "https://medium.com/feed/@kkshah2005";

/** Markers around the generated writing block in the discovery files. */
const START_MARKER = "<!-- writing:start -->";
const END_MARKER = "<!-- writing:end -->";

type EssayRow = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  image: string | null;
  readMinutes: number;
  wordCount: number;
  /** `null` for site-original essays (content/essays-local.json). */
  mediumUrl: string | null;
  body: string;
};

/** Tags and titles vary; the site groups essays into a small fixed set.
 *  Order matters: the first rule that matches wins, so the more specific
 *  readings come first. */
const CATEGORY_RULES: { id: string; match: RegExp }[] = [
  { id: "agents", match: /\bagent|orchestrat|langgraph|crewai|multi-ai|\bmcp\b/i },
  { id: "edge", match: /\bedge\b|vision|yolo|tensorrt|cuda|jetson|quantiz|onnx/i },
  { id: "mlops", match: /mlops|deploy|production|serving|infrastructure|observab|serverless|serverful/i },
  { id: "security", match: /secur|fairness|bias|\baudit|rl-a2a|privacy/i },
  { id: "genai", match: /prompt|\brag\b|\bllm|\beval|reason|generat|token|unit test/i },
  { id: "ml", match: /statistic|memory|garbage|anomal|\bmodel|train|learn/i },
];

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  trade: "™",
  reg: "®",
  copy: "©",
  middot: "·",
  bull: "•",
  deg: "°",
  euro: "€",
  pound: "£",
  yen: "¥",
  times: "×",
  minus: "−",
};

function decode(text: string) {
  return text
    .replace(/&(#[xX]?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]{1,31});/g, (match, entity: string) => {
      if (entity.startsWith("#")) {
        const hex = entity[1] === "x" || entity[1] === "X";
        const code = Number.parseInt(hex ? entity.slice(2) : entity.slice(1), hex ? 16 : 10);
        return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
      }
      return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
    });
}

function cdata(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match ? match[1].trim() : "";
}

function toText(html: string) {
  return decode(
    html
      .replace(/<figcaption[\s\S]*?<\/figcaption>/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[‌‍]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Medium ends every post URL with the post id, e.g.
 * `.../some-title-0e182a380301`. Dropping the id leaves a readable slug.
 */
function slugFromUrl(url: string): string {
  const path = url.split("?")[0].replace(/\/+$/, "");
  const last = path.split("/").pop() ?? "";
  const base = last.replace(/-[0-9a-f]{8,}$/i, "");
  const normalized = base
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Cap the length without leaving a half word at the end.
  const capped = normalized.length <= 64 ? normalized : normalized.slice(0, 64);
  const cut = normalized.length <= 64 ? capped : capped.replace(/[^-]*$/, "");
  return cut.replace(/-+$/, "");
}

/**
 * Strip em dashes from imported Medium text.
 *
 * The site's own copy never uses them, so a title or excerpt that arrives
 * with one is normalised on the way in. Article bodies are left exactly as
 * Medium published them.
 */
function dashless(text: string): string {
  return text.split("\u2014").join("-");
}

/**
 * Per-essay SEO overrides, keyed by slug.
 *
 * The feed owns publication mechanics (slug, date, body), but the words in a
 * title and excerpt decide whether a search result gets clicked, and Medium's
 * own wording does not always match how people query the topic. Anything set
 * here is applied after the feed is parsed, so `npm run sync:essays` can never
 * silently undo it.
 *
 * Only touch a field when the feed version is actively wrong for search:
 * query-word order, a missing keyword phrase, or an excerpt that reads as a
 * cliffhanger instead of a promise.
 */
const SEO_OVERRIDES: Record<string, { title?: string; excerpt?: string }> = {
  "the-internet-was-built-for-humans-ai-agents-are-breaking-that": {
    // "Web" outperforms "Internet" as a search term, and the tags are about
    // browser automation agents - say that instead of the abstract noun.
    title: "The Web Was Built for Humans. AI Browser Agents Are Breaking It.",
    excerpt:
      "AI agents that browse the web, fill forms and complete tasks - why they break on CAPTCHAs, logins and layout shifts, and what reliability actually requires.",
  },
  "serverful-vs-serverless-architecture-understanding-the-trade": {
    // Searchers type "serverless vs serverful"; the Medium headline ran the
    // pair the other way round and the excerpt never contained the phrase.
    title: "Serverless vs Serverful Architecture: Trade-Offs From First Principles",
    excerpt:
      "Serverless vs serverful: cold starts, cost at scale, latency and ops burden - the trade-offs from first principles, for SaaS, AI agents and RAG pipelines.",
  },
  "i-looked-at-112-ai-tools-so-you-dont-have-to-here-s-what": {
    // Title already fronts "112 AI Tools"; the excerpt said nothing about
    // the topic it actually covers.
    excerpt:
      "Most AI projects don’t fail because the model is bad - they fail on the AI infrastructure picked backwards: a vector database when prompt caching would do.",
  },
  "ai-evals-are-the-unit-tests-of-llm-applications": {
    // Title is already keyword-perfect; the excerpt read like a story opening.
    excerpt:
      "What AI evals are and how to build an evaluation suite that catches regressions in your LLM application before users do - the unit tests of LLM apps.",
  },
  "the-difference-between-completing-tasks-and-solving-problems": {
    title: "Shallow vs Deep Agents: Why Task Completion Isn’t Problem Solving",
    excerpt:
      "Completing tasks vs solving problems - what separates shallow agents from deep agents, and why it decides whether your agentic system actually ships.",
  },
  "how-memory-works-in-python-the-complete-guide-from-variables-to": {
    // "Python memory management" is the query; "how memory works" competes
    // with nothing and implies trivia.
    title: "Python Memory Management: The Complete Guide (Variables to Garbage Collection)",
    excerpt:
      "How Python memory management actually works: where variables point, references, reference counting and garbage collection - from x = 10 to the GC.",
  },
  "a-comprehensive-guide-to-key-topics-in-statistics": {
    title: "Statistics Fundamentals: The Complete Guide (Part 1)",
    excerpt:
      "Statistics fundamentals from first principles: probability, distributions, inference and the key concepts every data scientist and ML engineer needs.",
  },
  "rl-a2a-enhanced-the-next-generation-of-secure-multi-ai-agent": {
    title: "Secure Multi-AI Agent Systems: The Next Generation (RL-A2A Enhanced)",
    excerpt:
      "How multiple AI agents collaborate securely in real time - RL-A2A’s agent-to-agent protocol and enterprise-grade security for multi-agent systems.",
  },
  "agentic-ai-future-directions-opportunities-and-cybersecurity": {
    // The Medium title carried invisible hair spaces (\u200a) around a hyphen,
    // which defeats exact-match rendering in SERPs.
    title: "Agentic AI: Future Directions, Opportunities and Cybersecurity",
    excerpt:
      "What agentic AI is, where it’s headed, the opportunities it opens and the cybersecurity risks it introduces - autonomous agents in production.",
  },
  "building-ai-agents-that-handle-captchas": {
    // Title already fronts the query ("AI agents handle CAPTCHAs"); the
    // excerpt named no keyword.
    excerpt:
      "AI agents browsing the web hit CAPTCHAs constantly - what building agents that handle them taught about reliability, security and what actually works.",
  },
  "my-owasp-journey": {
    // Medium's "--" is its em dash; the excerpt said nothing about the topic.
    excerpt:
      "Contributing to OWASP projects taught me that security isn’t a feature - it’s a discipline. Hard-won lessons from open-source application security work.",
  },
  "edge-computer-vision-realized": {
    excerpt:
      "YOLOv8 on edge devices like NVIDIA Jetson: real-time object detection without cloud bills - latency, power draw and deployment on hardware you own.",
  },
};

function categoryFor(title: string, tags: string[]) {
  const haystack = `${title} ${tags.join(" ")}`;
  for (const rule of CATEGORY_RULES) {
    if (rule.match.test(haystack)) return rule.id;
  }
  return "genai";
}

/**
 * The biggest version of a Medium image.
 *
 * The feed links the thumbnail the post was published with, which is often
 * 500px wide. The same CDN serves the original, so the cover image is
 * upgraded rather than upscaled by the browser.
 */
function largestImage(src: string | null): string | null {
  if (!src) return null;
  return src.replace(/\/max\/\d+\//, "/max/1024/");
}

/** First real paragraph, trimmed to a sentence boundary near `max` characters. */
function excerptOf(html: string, max = 180) {  const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map((match) => toText(match[1]))
    .filter((p) => p.length > 60);
  const text = paragraphs[0] ?? toText(html);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return stop > 80 ? cut.slice(0, stop + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

type FeedItem = {
  title: string;
  mediumUrl: string;
  date: string;
  tags: string[];
  image: string | null;
  body: string;
};

function parseFeed(xml: string): FeedItem[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const body = cdata(item, "content:encoded");
    const link = cdata(item, "link").split("?")[0];
    return {
      title: decode(cdata(item, "title")),
      mediumUrl: link,
      date: new Date(cdata(item, "pubDate")).toISOString(),
      tags: [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map((m) =>
        m[1].replace(/-/g, " "),
      ),
      image: body.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null,
      body,
    };
  });
}
async function main() {
  if (process.argv.includes("--offline")) {
    const archive = JSON.parse(readFileSync(OUTPUT, "utf8")) as { essays: EssayRow[] };
    refreshDiscoveryFiles(archive.essays);
    return;
  }

  const response = await fetch(FEED_URL, { headers: { "User-Agent": "Mozilla/5.0 (portfolio archive sync)" } });
  if (!response.ok) throw new Error(`Feed request failed: ${response.status}`);
  const items = parseFeed(await response.text());

  const used = new Set<string>();
  const essays = items.map((item) => {
    let slug = slugFromUrl(item.mediumUrl);
    let n = 2;
    while (used.has(slug)) slug = `${slug}-${n++}`;
    used.add(slug);

    const text = toText(item.body);
    const words = text.split(" ").filter(Boolean).length;
    const override = SEO_OVERRIDES[slug];

    return {
      slug,
      title: override?.title ?? dashless(item.title),
      date: item.date,
      category: categoryFor(item.title, item.tags),
      tags: item.tags,
      excerpt: override?.excerpt ?? dashless(excerptOf(item.body)),
      image: largestImage(item.image),
      readMinutes: Math.max(1, Math.round(words / 230)),
      wordCount: words,
      mediumUrl: item.mediumUrl,
      body: item.body,
    };
  });

  const document = {
    $schema: "https://kunjshah.in/content/essays.json",
    generatedAt: new Date().toISOString(),
    source: FEED_URL,
    sourceProfile: "https://medium.com/@kkshah2005",
    essays,
  };

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, `${JSON.stringify(document, null, 2)}\n`, "utf8");
  refreshDiscoveryFiles(essays);

  console.log(`Wrote ${essays.length} essays to content/essays.json`);
  for (const essay of essays) {
    console.log(`  ${essay.slug.padEnd(62)} ${essay.wordCount} words`);
  }
}

function refreshDiscoveryFiles(essays: EssayRow[]) {
  // The discovery files are static, so their writing sections are generated
  // here rather than written by hand. Hand-written lists of essays are how
  // the site ended up advertising eleven posts that did not exist: the
  // archive and the index disagreed, and the index was the one crawlers read.
  // Site-original essays are merged in so the list is exactly what is served.
  const localEssays = loadLocalEssays();
  const allEssays = [...essays, ...localEssays].sort((a, b) => b.date.localeCompare(a.date));
  console.log(`Merged ${localEssays.length} site-original essays for the discovery files`);
  refreshWritingSection(join(ROOT, "public", "llms.txt"), allEssays, (essay) => {
    const summary = essay.excerpt.length > 120 ? `${essay.excerpt.slice(0, 117).trimEnd()}…` : essay.excerpt;
    return `- [${essay.title}](https://kunjshah.in/writing/${essay.slug}): ${summary}`;
  });
  refreshWritingSection(join(ROOT, "public", "llms-full.txt"), allEssays, (essay) => {
    const date = new Date(essay.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    return `- [${essay.title}](https://kunjshah.in/writing/${essay.slug}) (${date}): ${essay.readMinutes} min read, ${essay.wordCount} words. ${essay.excerpt}`;
  });
}

/**
 * Site-original essays live in content/essays-local.json, never in the feed.
 * They are merged in for the discovery-file writing sections only — the
 * archive itself stays a pure feed snapshot — so llms.txt and llms-full.txt
 * list exactly what the build serves.
 */
function loadLocalEssays(): EssayRow[] {
  try {
    const raw = JSON.parse(readFileSync(join(ROOT, "content", "essays-local.json"), "utf8")) as {
      essays: Omit<EssayRow, "wordCount" | "readMinutes">[];
    };
    return raw.essays.map((essay) => {
      const words = toText(essay.body).split(" ").filter(Boolean).length;
      return { ...essay, wordCount: words, readMinutes: Math.max(1, Math.round(words / 230)) };
    });
  } catch {
    return [];
  }
}

/**
 * Replace the block between the writing markers in a discovery file.
 *
 * The markers are required: a file without them is left alone rather than
 * guessed at, so a typo can never silently blank out the whole file.
 */
function refreshWritingSection(
  path: string,
  essays: EssayRow[],
  line: (essay: EssayRow) => string,
) {
  const source = readFileSync(path, "utf8");
  const start = source.indexOf(START_MARKER);
  const end = source.indexOf(END_MARKER);
  if (start === -1 || end === -1 || end < start) {
    console.warn(`  skipped ${path}: writing markers not found`);
    return;
  }
  const before = source.slice(0, start + START_MARKER.length);
  const after = source.slice(end);
  const body = essays.map(line).join("\n");
  writeFileSync(path, `${before}\n${body}\n${after}`, "utf8");
  console.log(`  refreshed writing section in ${path}`);
}

await main();
