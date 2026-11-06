import type { MetadataRoute } from "next";
import { ORIGIN, PUBLIC_ROUTES } from "@/lib/routes";
import { essaysByDate } from "@/lib/essays";
import { projects } from "@/lib/site-data";
import { projectVideo, xmlEscape } from "@/lib/project-video";

/**
 * The build stamp, so `lastModified` is a genuine content-change signal rather
 * than `Date.now()` at request time. A fresh build means the content may have
 * changed, which is exactly what a crawler wants to know.
 *
 * Set at build time: every route in one deployment shares the same stamp.
 */
const LAST_MODIFIED = new Date(
  Number(process.env.NEXT_PUBLIC_BUILD_TIME) || Date.parse("2026-09-27T00:00:00Z"),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PUBLIC_ROUTES.map((route) => ({
    url: `${ORIGIN}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // One case study per shipped project, generated from the same data the
  // pages are built from so the two cannot drift.
  // A case study with a demo recording is that video's watch page, so its
  // entry carries the video too (Google's video sitemap extension).
  const caseStudies = projects.map((project) => {
    const video = projectVideo(project);
    return {
      url: `${ORIGIN}/projects/${project.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(video
        ? {
            videos: [
              {
                title: xmlEscape(video.title),
                description: xmlEscape(video.description),
                thumbnail_loc: video.thumbnailUrl,
                content_loc: video.contentUrl,
                duration: video.seconds,
                publication_date: video.uploaded,
                family_friendly: "yes" as const,
              },
            ],
          }
        : {}),
    };
  });

  // The essays themselves. These were missing entirely, which is why a
  // crawler found no content to cite: the archive existed as a list of
  // titles, but no page was ever served for one.
  const essays = essaysByDate.map((essay) => ({
    url: `${ORIGIN}/writing/${essay.slug}`,
    lastModified: new Date(essay.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  // Non-HTML discovery files (llms.txt, portfolio.json, rss.xml, ...) are
  // deliberately not listed: Google ignores them in a sitemap, and sitemaps
  // are for indexable pages. They stay reachable — linked via <link> hints in
  // the root layout and submitted to Bing through IndexNow — and listed in
  // lib/routes.ts DISCOVERY_ASSETS.

  return [...pages, ...caseStudies, ...essays];
}
