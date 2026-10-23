/**
 * Public route manifest, shared by the sitemap and robots generators.
 * Generated `.txt` / `.json` endpoints are intentionally excluded — they are
 * discovery helpers for crawlers, not pages.
 */
export const ORIGIN = "https://kunjshah.in";

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
  { path: "/ai-developer-ahmedabad", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.75, changeFrequency: "yearly" as const },
  { path: "/cite", priority: 0.55, changeFrequency: "yearly" as const },
  // Legal. Indexed deliberately: a client running vendor diligence looks for
  // these by name, and hiding them makes the site look less trustworthy.
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
];

/**
 * Markdown/JSON discovery files for crawlers and AI agents. Listed in the
 * sitemap so they are not orphaned behind HTML-only navigation.
 */
export const DISCOVERY_ASSETS = [
  { path: "/llms.txt", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/llms-full.txt", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/ai.txt", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/.well-known/ai.txt", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pricing.md", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/services.md", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/api/portfolio.json", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/rss.xml", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/humans.txt", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/cite.txt", priority: 0.5, changeFrequency: "yearly" as const },
] as const;
