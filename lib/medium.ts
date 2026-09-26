/* ==========================================================================
   Medium posts, read from the public RSS feed.

   Revalidated hourly (ISR), so a new Medium post shows up on the site
   without a redeploy. Parsed with a few targeted regexes rather than an XML
   dependency: the feed shape is stable and we only need six fields. Returns
   `null` on any failure so callers can render a fallback.
   ========================================================================== */

import { site } from "@/lib/site-data";

const HANDLE = "kkshah2005";
const FEED_URL = `https://medium.com/feed/@${HANDLE}`;
export const MEDIUM_PROFILE = site.links.medium;
const REVALIDATE_SECONDS = 3600;
const WORDS_PER_MINUTE = 230;

export type MediumPost = {
  title: string;
  url: string;
  /** ISO timestamp. */
  date: string;
  tags: string[];
  /** First image in the post, if any (Medium CDN). */
  image: string | null;
  excerpt: string;
  readMinutes: number;
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&nbsp;": " ",
};

function decode(text: string) {
  return text
    .replace(/&(amp|lt|gt|quot|nbsp|#39|#x27);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function cdata(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match ? match[1].trim() : "";
}

function toText(html: string) {
  return decode(html.replace(/<figcaption[\s\S]*?<\/figcaption>/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/[ ​]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** First real paragraph, trimmed to a sentence boundary near `max` chars. */
function excerptOf(html: string, max = 170) {
  const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map((m) => toText(m[1]))
    .filter((p) => p.length > 60);
  const text = paragraphs[0] ?? toText(html);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "));
  return stop > 80 ? cut.slice(0, stop + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function parse(xml: string): MediumPost[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const html = cdata(item, "content:encoded");
    const words = toText(html).split(" ").length;
    return {
      title: decode(cdata(item, "title")),
      url: cdata(item, "link").split("?")[0],
      date: new Date(cdata(item, "pubDate")).toISOString(),
      tags: [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map((m) =>
        m[1].replace(/-/g, " "),
      ),
      image: html.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null,
      excerpt: excerptOf(html),
      readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    };
  });
}

export async function getMediumPosts(): Promise<MediumPost[] | null> {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio feed reader)" },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["medium-posts"] },
    });
    if (!res.ok) {
      console.warn(`[medium] feed failed: ${res.status}`);
      return null;
    }
    const posts = parse(await res.text()).filter((p) => p.title && p.url);
    return posts.length ? posts : null;
  } catch (error) {
    console.warn("[medium] feed error", error);
    return null;
  }
}

/** "Aug 2026" */
export function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
