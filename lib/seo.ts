import type { Metadata } from "next";
import { ORIGIN } from "@/lib/routes";
import { site } from "@/lib/site-data";

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
}: {
  /** Route path with a leading slash; `""` for the home page. */
  path: string;
  /** Bare page title. The root template appends the brand. */
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  const url = `${ORIGIN}${path}`;
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path === "" ? "/" : path,
    },
    openGraph: {
      type: "website",
      url,
      siteName: `${site.name} — Portfolio`,
      title: socialTitle,
      description: socialDescription,
      locale: "en_IN",
      // Absolute URL: relative image paths are dropped by some scrapers, and
      // `metadataBase` alone is not applied to images by every consumer.
      images: [
        {
          url: `${ORIGIN}/og-image.png`,
          width: 1200,
          height: 630,
          alt: socialTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [`${ORIGIN}/og-image.png`],
    },
  };
}
