import { notFound } from 'next/navigation'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug } from '@/data/disciplines'
import { getKnowledgeStages } from '@/data/knowledgeArchitecture'
import { getAdvancedTopic } from '@/data/leafArticleViews'
import { getDisciplineSpecialty } from '@/data/specialties'
import { AdvancedReadingPage } from '@/components/discipline/LearningPathPage'

type Params = { discipline: string; specialty: string; stage: string; topic: string }

function resolve(values: Params) {
  if (!isDisciplineSlug(values.discipline)) return undefined
  const stage = getKnowledgeStages(values.discipline).find((item) => item.key === values.stage)
  const topic = stage ? getAdvancedTopic(stage, values.topic) : undefined
  if (!stage || !topic) return undefined
  return {
    discipline: disciplines[values.discipline],
    specialty: getDisciplineSpecialty(values.discipline, decodeURIComponent(values.specialty)).name,
    stage,
    topic,
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params)
  if (!resolved) return {}
  return genPageMetadata({
    title: `${resolved.specialty}${resolved.stage.title}进阶阅读：${resolved.topic.title}`,
    description: `汇集${resolved.specialty}${resolved.stage.title}中“${resolved.topic.title}”的细分学习文章。`,
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params)
  if (!resolved) notFound()
  return (
    <AdvancedReadingPage {...resolved} articles={getDisciplineArticles(resolved.discipline.slug)} />
  )
}
