import { notFound } from 'next/navigation'
import DisciplinePage from '@/components/DisciplinePage'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug, isPublicDiscipline } from '@/data/disciplines'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getDisciplineSpecialty } from '@/data/specialties'

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
  return (
    <DisciplinePage
      discipline={disciplines[discipline]}
      articles={getDisciplineArticles(discipline)}
      specialty={selectedSpecialty.name}
      stageKey={selectedTask.stage.key}
      taskKey={selectedTask.task.key}
    />
  )
}
