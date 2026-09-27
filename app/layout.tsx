import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BottomNav } from "@/components/shell/bottom-nav";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
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
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} — Portfolio`,
    title: `${site.name} — ${site.role} in Ahmedabad, India`,
    description:
      "Production AI systems: autonomous agents, RAG pipelines, edge computer vision, and full-stack AI apps. 12+ shipped systems, 44+ merged open-source PRs.",
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
  themeColor: "#fff8f5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
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
        {/* Entity graph: resolves "Kunj Shah" to a canonical person. */}
        <PersonSiteJsonLd />
      </body>
    </html>
  );
}
