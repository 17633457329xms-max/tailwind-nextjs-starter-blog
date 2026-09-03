import { notFound, permanentRedirect } from 'next/navigation'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug } from '@/data/disciplines'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getAdvancedTopics, getSpecialtyLeafArticles } from '@/data/leafArticleViews'
import { getDisciplineSpecialty } from '@/data/specialties'
import { disciplineAdvancedArticlePath } from '@/data/disciplineUrls'

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
  const selectedTask = getKnowledgeTask(values.discipline, values.stage, values.task)
  const leafIndex = getLeafIndex(values.article)
  const topic =
    selectedTask && Number.isInteger(leafIndex)
      ? getAdvancedTopics(selectedTask.stage).find(
          (item) =>
            item.taskKey === selectedTask.task.key && item.themeIndex === (leafIndex - 1) % 5
        )
      : undefined
  if (!topic) notFound()
  permanentRedirect(
    disciplineAdvancedArticlePath({
      discipline: values.discipline,
      specialty: getDisciplineSpecialty(values.discipline, decodeURIComponent(values.specialty))
        .name,
      stage: values.stage,
      topic: topic.key,
      sourceSlug: resolved.article.sourceSlug ?? resolved.article.slug,
      leafIndex,
    })
  )
}
