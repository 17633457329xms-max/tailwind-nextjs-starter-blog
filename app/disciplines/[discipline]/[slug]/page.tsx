import { notFound, permanentRedirect } from 'next/navigation'
import DisciplineArticlePage from '@/components/discipline/DisciplineArticlePage'
import {
  disciplineArticles,
  getDisciplineArticle,
  getDisciplineArticles,
} from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug, isPublicDiscipline } from '@/data/disciplines'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getSpecialtyLeafArticles } from '@/data/leafArticleViews'
import { getDisciplineSpecialty } from '@/data/specialties'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'
import { disciplineLeafArticlePath } from '@/data/disciplineUrls'
import { isIndexableDisciplineArticle } from '@/data/contentQuality'

export const generateStaticParams = () =>
  disciplineArticles
    .filter(
      (article) => isPublicDiscipline(article.discipline) && isIndexableDisciplineArticle(article)
    )
    .map((article) => ({ discipline: article.discipline, slug: article.slug }))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ discipline: string; slug: string }>
}) {
  const { discipline, slug } = await params
  const article = getDisciplineArticle(discipline, slug)
  if (!article) return {}
  return genPageMetadata({
    title: article.title,
    description: article.summary,
    robots:
      isPublicDiscipline(discipline) && isIndexableDisciplineArticle(article)
        ? undefined
        : { index: false, follow: true },
  })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ discipline: string; slug: string }>
  searchParams: Promise<{ specialty?: string; stage?: string; task?: string; leaf?: string }>
}) {
  const { discipline, slug } = await params
  const { specialty, stage, task, leaf } = await searchParams
  if (!isDisciplineSlug(discipline)) notFound()
  const article = getDisciplineArticle(discipline, slug)
  if (!article) notFound()
  const selectedTask = getKnowledgeTask(discipline, stage, task)
  const selectedSpecialty = getDisciplineSpecialty(discipline, specialty)
  const leafNumber = Number(leaf)
  if (selectedTask && Number.isInteger(leafNumber) && leafNumber >= 1 && leafNumber <= 50) {
    permanentRedirect(
      disciplineLeafArticlePath({
        discipline,
        specialty: selectedSpecialty.name,
        stage: selectedTask.stage.key,
        task: selectedTask.task.key,
        sourceSlug: slug,
        leafIndex: leafNumber,
      })
    )
  }
  if (specialty || stage || task || leaf) {
    permanentRedirect(`/disciplines/${discipline}/${slug}`)
  }
  const displayedArticle =
    selectedTask && Number.isInteger(leafNumber) && leafNumber >= 1 && leafNumber <= 50
      ? getSpecialtyLeafArticles({
          articles: getDisciplineArticles(discipline),
          discipline: disciplines[discipline],
          specialty: selectedSpecialty.name,
          stage: selectedTask.stage,
          task: selectedTask.task,
        })[leafNumber - 1]
      : article
  const related = getDisciplineArticles(discipline)
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: displayedArticle.title,
    description: displayedArticle.summary,
    datePublished: displayedArticle.date,
    dateModified: displayedArticle.date,
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
        article={displayedArticle}
        discipline={disciplines[discipline]}
        related={related}
      />
    </>
  )
}
