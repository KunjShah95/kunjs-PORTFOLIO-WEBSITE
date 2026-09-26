import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

/** All crawlers are allowed, including AI answer engines. Training-only
 *  scrapers are declined: being cited matters, being trained on does not. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
