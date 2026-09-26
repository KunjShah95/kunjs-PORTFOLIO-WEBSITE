/**
 * Public route manifest, shared by the sitemap and robots generators.
 * Generated `.txt` / `.json` endpoints are intentionally excluded — they are
 * discovery helpers for crawlers, not pages.
 */
export const ORIGIN = "https://kunjshah.vercel.app";

export const PUBLIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/projects", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/skills", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/writing", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/experience", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/hackathons", priority: 0.75, changeFrequency: "yearly" as const },
  { path: "/open-source", priority: 0.75, changeFrequency: "daily" as const },
  { path: "/labs", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/manifesto", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/education", priority: 0.65, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.75, changeFrequency: "yearly" as const },
];
