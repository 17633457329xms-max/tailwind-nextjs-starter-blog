import { notFound } from 'next/navigation'
import DisciplineArticlePage from '@/components/discipline/DisciplineArticlePage'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug } from '@/data/disciplines'
import { getKnowledgeStages } from '@/data/knowledgeArchitecture'
import { getAdvancedTopic, getSpecialtyLeafArticles } from '@/data/leafArticleViews'
import { getDisciplineSpecialty } from '@/data/specialties'

type Params = {
  discipline: string
  specialty: string
  stage: string
  topic: string
  article: string
}

function resolve(values: Params) {
  if (!isDisciplineSlug(values.discipline)) return undefined
  const stage = getKnowledgeStages(values.discipline).find((item) => item.key === values.stage)
  const topic = stage ? getAdvancedTopic(stage, values.topic) : undefined
  const index = Number(values.article.match(/-(\d+)$/)?.[1])
  if (!stage || !topic || !Number.isInteger(index) || index < 1 || index > 50) return undefined
  const specialty = getDisciplineSpecialty(
    values.discipline,
    decodeURIComponent(values.specialty)
  ).name
  const task = stage.tasks.find((item) => item.key === topic.taskKey)
  if (!task) return undefined
  const sourceArticles = getDisciplineArticles(values.discipline)
  const articles = getSpecialtyLeafArticles({
    articles: sourceArticles,
    discipline: disciplines[values.discipline],
    specialty,
    stage,
    task,
    themeIndex: topic.themeIndex,
  })
  return {
    discipline: disciplines[values.discipline],
    sourceArticles,
    articles,
    article: articles[index - 1],
    topic,
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params)
  if (!resolved) return {}
  return genPageMetadata({ title: resolved.article.title, description: resolved.article.summary })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params)
  if (!resolved) notFound()
  return (
    <DisciplineArticlePage
      article={resolved.article}
      discipline={resolved.discipline}
      related={resolved.articles
        .filter((item) => item.leafIndex !== resolved.article.leafIndex)
        .slice(0, 3)}
      advancedTopic={resolved.topic}
    />
  )
}
