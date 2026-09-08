import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ['/', '/about', '/early-learning', '/medical', '/interactive', '/events', '/give', '/contact', '/privacy', '/terms'].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
  }))
}
