import { notFound } from 'next/navigation'
import DisciplineArticlePage from '@/components/discipline/DisciplineArticlePage'
import {
  disciplineArticles,
  getDisciplineArticle,
  getDisciplineArticles,
} from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug } from '@/data/disciplines'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'

export const generateStaticParams = () =>
  disciplineArticles.map((article) => ({ discipline: article.discipline, slug: article.slug }))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ discipline: string; slug: string }>
}) {
  const { discipline, slug } = await params
  const article = getDisciplineArticle(discipline, slug)
  if (!article) return {}
  return genPageMetadata({ title: article.title, description: article.summary })
}

export default async function Page({
  params,
}: {
  params: Promise<{ discipline: string; slug: string }>
}) {
  const { discipline, slug } = await params
  if (!isDisciplineSlug(discipline) || discipline === 'economics-management') notFound()
  const article = getDisciplineArticle(discipline, slug)
  if (!article) notFound()
  const related = getDisciplineArticles(discipline)
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: 'zh-CN',
    author: { '@type': 'Person', name: siteMetadata.author },
    publisher: { '@type': 'Person', name: siteMetadata.author },
    mainEntityOfPage: `${siteMetadata.siteUrl}/disciplines/${discipline}/${slug}`,
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DisciplineArticlePage
        article={article}
        discipline={disciplines[discipline]}
        related={related}
      />
    </>
  )
}
