import { notFound } from 'next/navigation'
import DisciplineArticlePage from '@/components/discipline/DisciplineArticlePage'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug } from '@/data/disciplines'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getSpecialtyLeafArticles } from '@/data/leafArticleViews'
import { getDisciplineSpecialty } from '@/data/specialties'

type Params = {
  discipline: string
  specialty: string
  stage: string
  task: string
  article: string
}

const getLeafIndex = (value: string) => Number(value.match(/-(\d+)$/)?.[1])

function resolveLeaf(values: Params) {
  if (!isDisciplineSlug(values.discipline)) return undefined
  const selectedTask = getKnowledgeTask(values.discipline, values.stage, values.task)
  const specialty = getDisciplineSpecialty(values.discipline, decodeURIComponent(values.specialty))
  const index = getLeafIndex(values.article)
  if (!selectedTask || !Number.isInteger(index) || index < 1 || index > 50) return undefined
  const sourceArticles = getDisciplineArticles(values.discipline)
  const article = getSpecialtyLeafArticles({
    articles: sourceArticles,
    discipline: disciplines[values.discipline],
    specialty: specialty.name,
    stage: selectedTask.stage,
    task: selectedTask.task,
  })[index - 1]
  return { article, sourceArticles }
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolved = resolveLeaf(await params)
  if (!resolved) return {}
  return genPageMetadata({
    title: resolved.article.title,
    description: resolved.article.summary,
    robots: { index: false, follow: true },
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const values = await params
  const resolved = resolveLeaf(values)
  if (!resolved || !isDisciplineSlug(values.discipline)) notFound()
  return (
    <DisciplineArticlePage
      article={resolved.article}
      discipline={disciplines[values.discipline]}
      related={resolved.sourceArticles
        .filter((item) => item.slug !== resolved.article.sourceSlug)
        .slice(0, 3)}
    />
  )
}
