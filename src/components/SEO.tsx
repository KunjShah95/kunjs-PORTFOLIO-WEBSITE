import { Helmet } from 'react-helmet-async'
import { IDENTITY, SOCIALS } from '../data/portfolio'
import { SITE_URL } from '../lib/site'
import { isoDateToOgDateTime } from '../lib/seo-dates'

export interface SEOFaqItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  /** Absolute URL for this step (last should match page canonical). */
  item: string
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
  /** When set, emits FAQPage JSON-LD aligned with visible FAQ markup. */
  faqItems?: readonly SEOFaqItem[]
  datePublished?: string
  dateModified?: string
  /** `Article` / OG — plain title without site suffix. */
  articleHeadline?: string
  articleSection?: string
  articleTags?: string[]
  breadcrumbs?: readonly BreadcrumbItem[]
}

const defaultMeta = {
  title: 'Kunj Shah | AI Engineer & Agent Builder',
  description:
    'Kunj Shah is an AI engineer and agent builder in Ahmedabad, India. Portfolio of generative AI systems, autonomous agents, computer vision, and full-stack prototypes—Python, FastAPI, React, LangChain, and MLOps-style delivery.',
  image: `${SITE_URL}/og-image.png`,
  siteUrl: SITE_URL,
  twitterHandle: '@kunjshah_dev',
  siteName: 'Kunj Shah — Portfolio',
}

const knowsAbout = [
  'Generative AI',
  'Large language models',
  'Autonomous agents',
  'Retrieval-augmented generation',
  'LangChain',
  'Computer vision',
  'MLOps',
  'Python',
  'FastAPI',
  'React',
  'System design',
]

function uniqueSameAs(): string[] {
  const urls = SOCIALS.map((s) => s.url)
  return [...new Set(urls)]
}

function buildJsonLd(opts: {
  pageTitle: string
  articleHeadline: string
  description: string
  image: string
  url: string
  type: SEOProps['type']
  faqItems?: readonly SEOFaqItem[]
  datePublished?: string
  dateModified?: string
  articleSection?: string
  articleTags?: string[]
  breadcrumbs?: readonly BreadcrumbItem[]
}) {
  const {
    pageTitle,
    articleHeadline,
    description,
    image,
    url,
    type,
    faqItems,
    datePublished,
    dateModified,
    articleSection,
    articleTags,
    breadcrumbs,
  } = opts

  const person = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: IDENTITY.name,
    jobTitle: 'AI Engineer & Agent Builder',
    description: defaultMeta.description,
    url: SITE_URL,
    image: `${SITE_URL}${IDENTITY.profile_photo}`,
    email: `mailto:${IDENTITY.contact}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    knowsAbout,
    sameAs: uniqueSameAs(),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Indus University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressCountry: 'IN',
      },
    },
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: defaultMeta.siteName,
    url: SITE_URL,
    description: defaultMeta.description,
    publisher: { '@id': `${SITE_URL}/#publisher` },
    inLanguage: 'en',
  }

  const publisherOrg = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#publisher`,
    name: IDENTITY.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: defaultMeta.image,
    },
  }

  const graph: Record<string, unknown>[] = [person, website, publisherOrg]

  if (type === 'article') {
    const modified = dateModified || datePublished
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: articleHeadline,
      description,
      url,
      image: [image],
      ...(datePublished && { datePublished }),
      ...(modified && { dateModified: modified }),
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#publisher` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en-US',
      ...(articleSection && { articleSection }),
      ...(articleTags?.length && { keywords: articleTags.join(', ') }),
    })
  } else {
    graph.push({
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name: pageTitle,
      description,
      url,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en-US',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
      },
    })
  }

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: crumb.item,
      })),
    })
  }

  if (faqItems?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function SEO({
  title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.siteUrl,
  type = 'website',
  keywords = [
    'Kunj Shah',
    'AI engineer India',
    'AI engineer Ahmedabad',
    'autonomous agents developer',
    'LLM engineer',
    'LangChain developer',
    'generative AI portfolio',
    'hire AI developer',
    'FastAPI React AI',
    'computer vision engineer',
    'MLOps engineer',
  ],
  faqItems,
  datePublished,
  dateModified,
  articleHeadline: articleHeadlineProp,
  articleSection,
  articleTags,
  breadcrumbs,
}: SEOProps) {
  const pageTitle =
    title == null
      ? defaultMeta.title
      : title.includes('|')
        ? title
        : `${title} | Kunj Shah`

  const articleHeadline =
    articleHeadlineProp ??
    (pageTitle.includes('|') ? pageTitle.split('|')[0]!.trim() : pageTitle)

  const jsonLd = buildJsonLd({
    pageTitle,
    articleHeadline,
    description,
    image,
    url,
    type,
    faqItems,
    datePublished,
    dateModified,
    articleSection,
    articleTags,
    breadcrumbs,
  })

  const ogPublished = datePublished ? isoDateToOgDateTime(datePublished) : null
  const ogModified = (dateModified || datePublished)
    ? isoDateToOgDateTime(dateModified || datePublished!)
    : null

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={IDENTITY.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />

      <meta property="og:type" content={type === 'article' ? 'article' : type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={defaultMeta.siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      <meta property="og:locale" content="en_US" />

      {type === 'article' && ogPublished && (
        <meta property="article:published_time" content={ogPublished} />
      )}
      {type === 'article' && ogModified && (
        <meta property="article:modified_time" content={ogModified} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === 'article' &&
        articleTags?.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={pageTitle} />

      <link rel="canonical" href={url} />
      <link rel="me" href="https://github.com/KunjShah95" />
      <link rel="me" href="https://www.linkedin.com/in/kunjshah05" />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
