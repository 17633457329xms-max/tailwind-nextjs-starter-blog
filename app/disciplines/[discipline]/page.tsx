import { notFound } from 'next/navigation'
import DisciplinePage from '@/components/DisciplinePage'
import { disciplines, disciplineOrder, isDisciplineSlug } from '@/data/disciplines'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getDisciplineSpecialty } from '@/data/specialties'

export const generateStaticParams = () => disciplineOrder.map((discipline) => ({ discipline }))

export async function generateMetadata({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params
  if (!isDisciplineSlug(discipline)) return {}
  const item = disciplines[discipline]
  return genPageMetadata({
    title: `${item.name}论文选题、研究方法与写作辅导`,
    description: `${item.statement}${item.audience}`,
  })
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ discipline: string }>
  searchParams: Promise<{ specialty?: string; stage?: string; task?: string }>
}) {
  const { discipline } = await params
  const { specialty, stage, task } = await searchParams
  if (!isDisciplineSlug(discipline)) notFound()
  const selectedSpecialty = getDisciplineSpecialty(discipline, specialty)
  const selectedTask = getKnowledgeTask(discipline, stage ?? 'topic', task ?? 'direction')
  return (
    <DisciplinePage
      discipline={disciplines[discipline]}
      articles={getDisciplineArticles(discipline)}
      specialty={selectedSpecialty.name}
      stageKey={selectedTask?.stage.key}
      taskKey={selectedTask?.task.key}
    />
  )
}
