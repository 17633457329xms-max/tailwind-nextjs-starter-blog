import { MetadataRoute } from 'next'
import { allKnowledge } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { disciplineArticles } from '@/data/disciplineArticles'
import { disciplineOrder } from '@/data/disciplines'
import { isIndexableDisciplineArticle } from '@/data/contentQuality'
import { disciplineSpecialties } from '@/data/specialties'
import { disciplineLibraryPath } from '@/data/disciplineUrls'

export const dynamic = 'force-static'

const validDate = (value?: string | Date) => {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

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
      lastModified: validDate(item.lastmod || item.date),
    }))
  const disciplinePages = disciplineOrder.map((discipline) => ({
    url: `${siteMetadata.siteUrl}/disciplines/${discipline}`,
    lastModified: updated,
  }))
  const specialtyPages = disciplineOrder.flatMap((discipline) =>
    disciplineSpecialties[discipline].map((specialty) => ({
      url: `${siteMetadata.siteUrl}${disciplineLibraryPath(discipline, specialty.name)}`,
      lastModified: updated,
    }))
  )
  const disciplineKnowledgePages = disciplineArticles
    .filter(isIndexableDisciplineArticle)
    .map((article) => ({
      url: `${siteMetadata.siteUrl}/disciplines/${article.discipline}/${article.slug}`,
      lastModified: validDate(article.date),
    }))

  return [
    ...staticPages,
    ...knowledgePages,
    ...disciplinePages,
    ...specialtyPages,
    ...disciplineKnowledgePages,
  ]
}
