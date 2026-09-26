import type { Metadata } from 'next'

import { IDENTITY, SITE_URL } from './site'

export const SITE_NAME = 'Kunj Shah'

export const SITE_DESCRIPTION =
  'An interactive engineering laboratory, editorial portfolio and systems journal. Retrieval pipelines, agent orchestration, edge computer vision, and the engineering decisions behind them.'

export const OG_IMAGE = '/og-image.png'

export function absolute(path = '/') {
  return new URL(path, SITE_URL).toString()
}

/** Page metadata with canonical, Open Graph and X card filled consistently.
 *  Every route builds its metadata through here, so the three can never
 *  drift apart. */
export function pageMeta({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  tags,
}: {
  title: string
  description: string
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absolute(path) },
    openGraph: {
      title,
      description,
      url: absolute(path),
      siteName: SITE_NAME,
      type,
      locale: 'en',
      images: [
        {
          url: absolute(OG_IMAGE),
          width: 1200,
          height: 630,
          alt: `${IDENTITY.name} — ${IDENTITY.role}`,
        },
      ],
      ...(type === 'article' ? { publishedTime, authors: [IDENTITY.name], tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@kunjshah_dev',
      images: [absolute(OG_IMAGE)],
    },
  }
}

export const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: IDENTITY.name,
  url: SITE_URL,
  image: absolute('/profile.png'),
  jobTitle: 'AI Engineer',
  description: IDENTITY.personaLine,
  email: `mailto:${IDENTITY.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressCountry: 'IN',
  },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Indus University' },
  knowsAbout: [
    'Retrieval-augmented generation',
    'AI agents',
    'LangGraph',
    'Vector databases',
    'Computer vision',
    'TensorRT',
    'Next.js',
    'FastAPI',
  ],
  sameAs: [
    IDENTITY.github,
    IDENTITY.githubAlt,
    IDENTITY.linkedin,
    IDENTITY.x,
    IDENTITY.huggingface,
    IDENTITY.peerlist,
    IDENTITY.medium,
  ],
}

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  author: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en',
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  }
}

/** "2026-03" to "2026-03-01". Source dates are month-precision, so the day
 *  is the first of the month by convention and is never shown to readers. */
export function isoFromMonth(ym: string) {
  return /^\d{4}-\d{2}$/.test(ym) ? `${ym}-01` : ym
}

/* ------------------------------------------------------------------ *
 * Work and writing. Claims are copied from the content record, never
 * restated, so structured data cannot drift from the page.
 * ------------------------------------------------------------------ */

export function projectLd(p: {
  slug: string
  title: string
  summary: string
  year: string
  tech: string[]
  github: string
  demo?: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}/work/${p.slug}#work`,
    name: p.title,
    headline: p.title,
    description: p.summary,
    url: absolute(`/work/${p.slug}`),
    genre: p.category,
    dateCreated: p.year,
    keywords: p.tech.join(', '),
    author: { '@id': `${SITE_URL}/#person` },
    codeRepository: p.github,
    ...(p.demo ? { liveUrl: p.demo } : {}),
  }
}

export function articleLd(n: {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
  wordCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/writing/${n.slug}#article`,
    headline: n.title,
    description: n.excerpt,
    url: absolute(`/writing/${n.slug}`),
    datePublished: isoFromMonth(n.date),
    dateModified: isoFromMonth(n.date),
    articleSection: n.category,
    keywords: n.tags.join(', '),
    inLanguage: 'en',
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(n.wordCount ? { wordCount: n.wordCount } : {}),
  }
}

export function itemListLd(
  name: string,
  items: Array<{ name: string; path: string; description?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: absolute(it.path),
      ...(it.description ? { description: it.description } : {}),
    })),
  }
}
