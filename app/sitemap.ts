import type { MetadataRoute } from "next";
import { DISCOVERY_ASSETS, ORIGIN, PUBLIC_ROUTES } from "@/lib/routes";
import { essaysByDate } from "@/lib/essays";
import { projects } from "@/lib/site-data";

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
  const caseStudies = projects.map((project) => ({
    url: `${ORIGIN}/projects/${project.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // The essays themselves. These were missing entirely, which is why a
  // crawler found no content to cite: the archive existed as a list of
  // titles, but no page was ever served for one.
  const essays = essaysByDate.map((essay) => ({
    url: `${ORIGIN}/writing/${essay.slug}`,
    lastModified: new Date(essay.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const assets = DISCOVERY_ASSETS.map((asset) => ({
    url: `${ORIGIN}${asset.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: asset.changeFrequency,
    priority: asset.priority,
  }));

  return [...pages, ...caseStudies, ...essays, ...assets];
}
