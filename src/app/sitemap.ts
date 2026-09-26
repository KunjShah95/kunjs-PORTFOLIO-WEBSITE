import type { MetadataRoute } from 'next'

import { getLab, getNoteSlugs, getNotes, getProjectSlugs, getProjects } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/lab`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/writing`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/stack`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/timeline`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/open-source`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ]

  const projects = getProjects()
  for (const slug of getProjectSlugs()) {
    const p = projects.find((x) => x.slug === slug)
    routes.push({
      url: `${SITE_URL}/work/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
      ...(p ? { images: [] } : {}),
    })
  }

  const notes = getNotes()
  for (const slug of getNoteSlugs()) {
    const n = notes.find((x) => x.slug === slug)
    routes.push({
      url: `${SITE_URL}/writing/${slug}`,
      lastModified: n ? new Date(`${n.date}-01T00:00:00Z`) : now,
      changeFrequency: 'yearly',
      priority: 0.7,
    })
  }

  for (const slug of getLab().map((l) => l.slug)) {
    routes.push({
      url: `${SITE_URL}/lab/${slug}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    })
  }

  return routes
}
