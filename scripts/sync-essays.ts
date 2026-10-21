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
  mediumUrl: string;
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

    return {
      slug,
      title: dashless(item.title),
      date: item.date,
      category: categoryFor(item.title, item.tags),
      tags: item.tags,
      excerpt: dashless(excerptOf(item.body)),
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

  // The discovery files are static, so their writing sections are generated
  // here rather than written by hand. Hand-written lists of essays are how
  // the site ended up advertising eleven posts that did not exist: the
  // archive and the index disagreed, and the index was the one crawlers read.
  refreshWritingSection(join(ROOT, "public", "llms.txt"), essays, (essay) => {
    const summary = essay.excerpt.length > 120 ? `${essay.excerpt.slice(0, 117).trimEnd()}…` : essay.excerpt;
    return `- [${essay.title}](https://kunjshah.in/writing/${essay.slug}): ${summary}`;
  });
  refreshWritingSection(join(ROOT, "public", "llms-full.txt"), essays, (essay) => {
    const date = new Date(essay.date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
    return `- [${essay.title}](https://kunjshah.in/writing/${essay.slug}) (${date}): ${essay.readMinutes} min read, ${essay.wordCount} words. ${essay.excerpt}`;
  });

  console.log(`Wrote ${essays.length} essays to content/essays.json`);
  for (const essay of essays) {
    console.log(`  ${essay.slug.padEnd(62)} ${essay.wordCount} words`);
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
