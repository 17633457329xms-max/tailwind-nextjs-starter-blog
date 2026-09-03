import { notFound, permanentRedirect } from 'next/navigation'
import { genPageMetadata } from '@/app/seo'
import { disciplines, isDisciplineSlug, isPublicDiscipline } from '@/data/disciplines'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getDisciplineSpecialty } from '@/data/specialties'
import { getAdvancedTopics } from '@/data/leafArticleViews'
import { disciplineAdvancedPath } from '@/data/disciplineUrls'

type Params = { discipline: string; specialty: string; stage: string; task: string }

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { discipline, specialty, stage, task } = await params
  if (!isDisciplineSlug(discipline)) return {}
  const selectedSpecialty = getDisciplineSpecialty(discipline, decodeURIComponent(specialty))
  const selectedTask = getKnowledgeTask(discipline, stage, task)
  if (!selectedTask) return {}
  return genPageMetadata({
    title: `${selectedSpecialty.name}${selectedTask.stage.title}：${selectedTask.task.title}`,
    description: `${selectedTask.task.description}面向${selectedSpecialty.name}硕士论文学习，提供研究步骤、公开材料和质量自检。`,
    robots: isPublicDiscipline(discipline) ? undefined : { index: false, follow: true },
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { discipline, specialty, stage, task } = await params
  if (!isDisciplineSlug(discipline)) notFound()
  const selectedSpecialty = getDisciplineSpecialty(discipline, decodeURIComponent(specialty))
  const selectedTask = getKnowledgeTask(discipline, stage, task)
  if (!selectedTask) notFound()
  const defaultTopic = getAdvancedTopics(selectedTask.stage).find(
    (item) => item.taskKey === selectedTask.task.key
  )
  if (!defaultTopic) notFound()
  permanentRedirect(
    disciplineAdvancedPath(
      discipline,
      selectedSpecialty.name,
      selectedTask.stage.key,
      defaultTopic.key
    )
  )
}
