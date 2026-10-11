import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BottomNav } from "@/components/shell/bottom-nav";
import { LazyCommandPalette } from "@/components/shell/lazy-command-palette";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { themeScript } from "@/components/shell/theme-toggle";
import { PersonSiteJsonLd } from "@/components/seo/json-ld";
import { ORIGIN } from "@/lib/routes";
import { site } from "@/lib/site-data";
import "./globals.css";

/* Geist for everything readable; Geist Mono only for data (dates, numbers,
   repo paths). Both are variable fonts, so no weight list is needed. */
const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Without this, Next.js emits relative OG/canonical URLs that crawlers
  // cannot resolve against an unknown host.
  metadataBase: new URL(ORIGIN),
  title: {
    default: `${site.name} — ${site.role} in Ahmedabad, India`,
    // Child pages supply a bare title and get the brand appended.
    template: `%s | ${site.name}`,
  },
  description:
    "Kunj Shah is an AI engineer in Ahmedabad, India building production AI systems: autonomous agents, RAG pipelines, edge computer vision, and full-stack AI applications.",
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: `${ORIGIN}/` }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "AI engineer Ahmedabad",
    "AI engineer India",
    "machine learning engineer Ahmedabad",
    "AI agent developer",
    "LLM engineer India",
    "RAG developer",
    "generative AI engineer",
    "freelance AI engineer India",
    "edge computer vision",
    "Kunj Shah",
  ],
  category: "technology",
  // Deliberately no `alternates.canonical` here: it would be inherited by every
  // child route and mark all twelve pages as duplicates of the home page. Each
  // page sets its own canonical via `pageMeta()` in lib/seo.ts.
  // Lets crawlers discover the human-readable markdown/JSON mirrors.
  other: {
    "ai-content-declaration": "ai-train=no, search=yes, ai-input=no",
  },
  // Point readers and aggregators at the writing feed.
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${site.name} — Writing` }],
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role} in Ahmedabad, India`,
    description:
      "Production AI systems: autonomous agents, RAG pipelines, edge computer vision, and full-stack AI apps. 17+ shipped systems, 60+ merged open-source PRs.",
    locale: "en_IN",
    // Absolute URL: relative image paths are dropped by some scrapers, and
    // `metadataBase` alone is not applied to images by every consumer.
    images: [
      {
        url: `${ORIGIN}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role} in Ahmedabad, India`,
    description:
      "Production AI systems: autonomous agents, RAG pipelines, edge computer vision, and full-stack AI apps.",
    images: [`${ORIGIN}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  // Two entries so the browser/OS chrome follows the theme. The light value
  // matches --color-surface; the dark value matches the dark surface token.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#141110" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-theme` is seeded light so server HTML is self-consistent; the
    // inline script below upgrades it to the stored/system preference before
    // the first paint, so there is no flash.
    //
    // `suppressHydrationWarning` covers that script. It mutates <html> during
    // parsing, so by the time React hydrates, the DOM attribute holds the
    // visitor's real theme while the RSC payload still says "light" — a
    // disagreement on the root element, which React reports as error #418
    // ("the server rendered HTML didn't match the client"). The flag tells
    // React to keep the DOM and discard its own output here, so the pre-paint
    // script wins. This is the pattern Next.js documents for exactly this case
    // (dist/docs/.../preventing-flash-before-hydration.md, "Themes").
    //
    // Note: the deployed build was observed throwing #418 on <html> while local
    // Turbopack and webpack builds did not, so a stale cached shell against
    // newer chunks may also be involved. This flag is correct and harmless
    // either way, but if #418 survives a fresh deploy, purge the ISR cache
    // rather than changing code here.
    <html
      className={`${sans.variable} ${mono.variable}`}
      data-theme="light"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          href={`${ORIGIN}/llms.txt`}
          rel="alternate"
          title="LLM site context (llms.txt)"
          type="text/markdown"
        />
        <link href={`${ORIGIN}/ai.txt`} rel="alternate" title="AI crawler policy (ai.txt)" type="text/markdown" />
        <link href={`${ORIGIN}/api/portfolio.json`} rel="alternate" title="Portfolio JSON" type="application/json" />
      </head>
      <body className="bg-surface text-text-primary font-body-md text-body-md antialiased">
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-3 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-on-primary"
          href="#main"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <BottomNav />
        {/* ⌘K search. Mounted last so its trigger sits above the header row.
            Deferred until first use: it is reachable only by keyboard or the
            header button, so keeping it out of the first-load bundle is free. */}
        <LazyCommandPalette />
        {/* Cookieless pageview + custom-event analytics. Renders nothing.
            It reads `useSearchParams()`, so React streams a
            BAILOUT_TO_CLIENT_SIDE_RENDERING boundary here — correct and cheap:
            the subtree renders `null`, its Suspense fallback is `null`, and the
            script can only be injected client-side anyway. Verified to leave
            all 18 routes statically prerendered. */}
        <Analytics />
        {/* Entity graph: resolves "Kunj Shah" to a canonical person. */}
        <PersonSiteJsonLd />
      </body>
    </html>
  );
}
