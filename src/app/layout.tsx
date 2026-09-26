import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, JetBrains_Mono, Geist } from 'next/font/google'

import { Masthead } from '@/components/masthead/Masthead'
import { SiteFooter } from '@/components/site/SiteFooter'
import { CursorLayer } from '@/components/cursor/CursorLayer'
import { JsonLd } from '@/components/seo/JsonLd'
import { personLd, websiteLd } from '@/lib/seo'
import { IDENTITY, SITE_URL } from '@/lib/site'

import './globals.css'

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display-loaded',
  display: 'swap',
})

const body = Geist({
  subsets: ['latin'],
  variable: '--font-body-loaded',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${IDENTITY.name} — ${IDENTITY.role}`,
    template: `%s — ${IDENTITY.name}`,
  },
  description:
    'An interactive engineering laboratory and systems journal. Retrieval pipelines, agent orchestration, edge computer vision, and the engineering decisions behind them.',
  applicationName: `${IDENTITY.name} — Lab`,
  authors: [{ name: IDENTITY.name, url: SITE_URL }],
  creator: IDENTITY.name,
  publisher: IDENTITY.name,
  keywords: [
    'AI engineer',
    'retrieval augmented generation',
    'RAG pipeline',
    'agent orchestration',
    'LLM systems',
    'computer vision',
    'edge inference',
    'Kunj Shah',
  ],
  category: 'technology',
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/rss.xml`,
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: IDENTITY.name,
    title: `${IDENTITY.name} — ${IDENTITY.role}`,
    description:
      'An interactive engineering laboratory and systems journal. Retrieval pipelines, agent orchestration, edge computer vision.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${IDENTITY.name} — ${IDENTITY.role}`,
    description: 'An interactive engineering laboratory and systems journal.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#101013',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
      </head>
      <body>
        <JsonLd data={[personLd, websiteLd]} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Masthead />
        <main id="main">{children}</main>
        <SiteFooter />
        <CursorLayer />
      </body>
    </html>
  )
}
