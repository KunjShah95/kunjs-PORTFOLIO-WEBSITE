import type { MetadataRoute } from "next";
import { ORIGIN, PUBLIC_ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${ORIGIN}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
