import type { Metadata } from "next";
import { ORIGIN } from "@/lib/routes";
import { site } from "@/lib/site-data";

const BRAND_SUFFIX = ` | ${site.name}`;
/** Search results truncate near 60 characters; Ahrefs and Google both flag past it. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 158;

/**
 * Fit a page title into the 60-character budget the SERP gives it.
 *
 * Returns what to hand to Next's `title`: the bare string when it still fits
 * with the brand suffix the root template appends, an `absolute` title (no
 * suffix) when only the bare title fits, and otherwise a trimmed one that
 * keeps the lead clause. The full headline is still used for og:title, the
 * <h1> and JSON-LD, so nothing is lost for readers or for citation.
 */
export function fitTitle(title: string): string | { absolute: string } {
  const bare = title.trim();
  if (bare.length + BRAND_SUFFIX.length <= TITLE_MAX) return bare;
  if (bare.length <= TITLE_MAX) return { absolute: bare };

  // Prefer cutting at a natural break so the result still reads as a title.
  const head = bare.slice(0, TITLE_MAX + 1);
  const breaks = [": ", " - ", " — ", " (", "? ", ". ", ", "];
  let best = -1;
  for (const mark of breaks) {
    const at = head.lastIndexOf(mark);
    if (at >= 28 && at > best) best = at;
  }
  if (best > 0) {
    const cut = bare.slice(0, best).replace(/[\s:,.—-]+$/, "");
    // A lone question or clause that ends at the break keeps its mark.
    return { absolute: bare[best] === "?" ? `${cut}?` : cut };
  }
  return { absolute: wordCut(bare, TITLE_MAX) };
}

/** Trim a meta description to a length search results show in full. */
export function fitDescription(description: string): string {
  const text = description.replace(/\s+/g, " ").trim();
  if (text.length <= DESCRIPTION_MAX + 2) return text;
  const head = text.slice(0, DESCRIPTION_MAX);
  const sentence = Math.max(head.lastIndexOf(". "), head.lastIndexOf("? "), head.lastIndexOf("! "));
  if (sentence >= 110) return head.slice(0, sentence + 1);
  return wordCut(text, DESCRIPTION_MAX);
}

/** Cut at a word boundary and add an ellipsis, staying within `max`. */
function wordCut(text: string, max: number): string {
  const head = text.slice(0, max - 1);
  const space = head.lastIndexOf(" ");
  const cut = space > max * 0.6 ? head.slice(0, space) : head;
  return `${cut.replace(/[\s:,;.—-]+$/, "")}…`;
}

/**
 * Per-route metadata builder.
 *
 * Every public page must supply its own `alternates.canonical`. Next.js merges
 * parent metadata into children, so a `canonical` set in the root layout would
 * be inherited by every route and quietly tell crawlers that all twelve pages
 * are duplicates of the home page. Hence the required parameter here.
 */
export function pageMeta({
  path,
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  image,
  publishedTime,
  authors,
  type = "website",
}: {
  /** Route path with a leading slash; `""` for the home page. */
  path: string;
  /** Bare page title. The root template appends the brand. */
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  /** Social image. Defaults to the site-wide card. */
  image?: { url: string; width: number; height: number; alt: string };
  /** ISO date, for article pages. */
  publishedTime?: string;
  authors?: { name: string; url: string }[];
  /** Open Graph type. Articles use "article". */
  type?: "website" | "article";
}): Metadata {
  const url = `${ORIGIN}${path}`;
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;
  const socialImage = image ?? {
    url: `${ORIGIN}/og-image.png`,
    width: 1200,
    height: 630,
    alt: socialTitle,
  };

  return {
    title: fitTitle(title),
    description: fitDescription(description),
    keywords,
    authors,
    alternates: {
      canonical: path === "" ? "/" : path,
    },
    openGraph: {
      type,
      url,
      siteName: `${site.name} | Portfolio`,
      title: socialTitle,
      description: socialDescription,
      locale: "en_IN",
      ...(publishedTime ? { publishedTime, modifiedTime: publishedTime } : {}),
      // Absolute URL: relative image paths are dropped by some scrapers, and
      // `metadataBase` alone is not applied to images by every consumer.
      images: [
        {
          url: socialImage.url,
          width: socialImage.width,
          height: socialImage.height,
          alt: socialImage.alt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [socialImage.url],
    },
  };
}
