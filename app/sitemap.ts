import type { MetadataRoute } from "next";
import { ORIGIN, PUBLIC_ROUTES } from "@/lib/routes";
import { essaysByDate } from "@/lib/essays";
import { projects } from "@/lib/site-data";
import { projectVideo, xmlEscape } from "@/lib/project-video";

/**
 * `lastModified` only where the date is real.
 *
 * This used to be the build stamp on every route and case study, so each
 * deploy told crawlers that 34 pages had all changed in the same millisecond.
 * Google uses `lastmod` only when it proves accurate over time, and a stamp
 * that moves on every deploy teaches it to ignore the field for the whole
 * site, essays included. Now: essays carry their publish date, the home page
 * and the writing index carry the newest essay's date (the content that
 * actually changes them), and everything else omits the field, which is the
 * honest answer when no per-page date exists.
 */
const NEWEST_ESSAY = essaysByDate[0] ? new Date(essaysByDate[0].date) : undefined;
const DATED_BY_NEWEST_ESSAY = new Set(["", "/writing"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PUBLIC_ROUTES.map((route) => ({
    url: `${ORIGIN}${route.path}`,
    ...(DATED_BY_NEWEST_ESSAY.has(route.path) && NEWEST_ESSAY ? { lastModified: NEWEST_ESSAY } : {}),
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
  // deliberately not listed: sitemaps are for indexable pages, and those files
  // are served `noindex` so Google does not weigh them as thin pages of the
  // site. AI agents still find them through the <link> hints in the root
  // layout and the Link header; they are listed in lib/routes.ts
  // DISCOVERY_ASSETS.

  return [...pages, ...caseStudies, ...essays];
}
