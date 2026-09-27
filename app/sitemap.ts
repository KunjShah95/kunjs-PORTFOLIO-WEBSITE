import type { MetadataRoute } from "next";
import { ORIGIN, PUBLIC_ROUTES } from "@/lib/routes";

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
  return PUBLIC_ROUTES.map((route) => ({
    url: `${ORIGIN}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
