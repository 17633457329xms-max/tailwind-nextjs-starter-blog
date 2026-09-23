import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { disciplineArticles } from '@/data/disciplineArticles'
import { isPublicDiscipline, publicDisciplineOrder } from '@/data/disciplines'
import { isIndexableDisciplineArticle } from '@/data/contentQuality'
import { disciplineSpecialties } from '@/data/specialties'
import { disciplineLibraryPath } from '@/data/disciplineUrls'
import { consultingEnabled } from '@/data/siteFeatures'

export const dynamic = 'force-static'

const validDate = (value?: string | Date) => {
  if (!value) return undefined
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

// 仅保留 middleware 与 next.config.js 允许直接访问的静态页；
// topics/methods/variables/literature/stata/writing/contact/consulting 已废弃并重定向到首页，不再提交。
const staticRoutes = [
  '',
  'polishing',
  'service-standards',
  'about',
  'privacy',
  ...(consultingEnabled ? ['consulting'] : []),
]

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date().toISOString().slice(0, 10)
  const staticPages = staticRoutes.map((route) => ({
    url: `${siteMetadata.siteUrl}${route ? `/${route}` : ''}`,
    lastModified: updated,
  }))
  // 学科知识库为页面主入口：学科页、特化页与学科文章页。
  const disciplinePages = publicDisciplineOrder.map((discipline) => ({
    url: `${siteMetadata.siteUrl}/disciplines/${discipline}`,
    lastModified: updated,
  }))
  const specialtyPages = publicDisciplineOrder.flatMap((discipline) =>
    disciplineSpecialties[discipline].map((specialty) => ({
      url: `${siteMetadata.siteUrl}${disciplineLibraryPath(discipline, specialty.name)}`,
      lastModified: updated,
    }))
  )
  const disciplineKnowledgePages = disciplineArticles
    .filter(
      (article) => isPublicDiscipline(article.discipline) && isIndexableDisciplineArticle(article)
    )
    .map((article) => ({
      url: `${siteMetadata.siteUrl}/disciplines/${article.discipline}/${article.slug}`,
      lastModified: validDate(article.date),
    }))

  return [...staticPages, ...disciplinePages, ...specialtyPages, ...disciplineKnowledgePages]
}
