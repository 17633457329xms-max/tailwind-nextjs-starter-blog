import { MetadataRoute } from 'next'
import { allKnowledge } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { disciplineArticles } from '@/data/disciplineArticles'
import { disciplineOrder } from '@/data/disciplines'

export const dynamic = 'force-static'

const staticRoutes = [
  '',
  'topics',
  'methods',
  'variables',
  'literature',
  'stata',
  'writing',
  'polishing',
  'consulting',
  'service-standards',
  'contact',
  'about',
  'privacy',
  'economics-management',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date().toISOString().slice(0, 10)
  const staticPages = staticRoutes.map((route) => ({
    url: `${siteMetadata.siteUrl}${route ? `/${route}` : ''}`,
    lastModified: updated,
  }))
  const knowledgePages = allKnowledge
    .filter((item) => !item.draft)
    .map((item) => ({
      url: `${siteMetadata.siteUrl}/${item.path}`,
      lastModified: item.lastmod || item.date,
    }))
  const disciplinePages = disciplineOrder
    .filter((discipline) => discipline !== 'economics-management')
    .map((discipline) => ({
      url: `${siteMetadata.siteUrl}/disciplines/${discipline}`,
      lastModified: updated,
    }))
  const disciplineKnowledgePages = disciplineArticles.map((article) => ({
    url: `${siteMetadata.siteUrl}/disciplines/${article.discipline}/${article.slug}`,
    lastModified: article.date,
  }))

  return [...staticPages, ...knowledgePages, ...disciplinePages, ...disciplineKnowledgePages]
}
