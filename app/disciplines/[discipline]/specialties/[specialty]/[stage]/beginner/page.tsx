import { notFound } from 'next/navigation'
import { genPageMetadata } from '@/app/seo'
import { disciplines, isDisciplineSlug } from '@/data/disciplines'
import { getKnowledgeStages } from '@/data/knowledgeArchitecture'
import { getDisciplineSpecialty } from '@/data/specialties'
import { BeginnerGuidePage } from '@/components/discipline/LearningPathPage'

type Params = { discipline: string; specialty: string; stage: string }

function resolve(values: Params) {
  if (!isDisciplineSlug(values.discipline)) return undefined
  const stage = getKnowledgeStages(values.discipline).find((item) => item.key === values.stage)
  if (!stage) return undefined
  return {
    discipline: disciplines[values.discipline],
    specialty: getDisciplineSpecialty(values.discipline, decodeURIComponent(values.specialty)).name,
    stage,
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params)
  if (!resolved) return {}
  return genPageMetadata({
    title: `${resolved.specialty}${resolved.stage.title}零基础入门`,
    description: `从零开始讲解${resolved.specialty}${resolved.stage.title}的目标、材料准备、执行步骤与常见错误。`,
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const resolved = resolve(await params)
  if (!resolved) notFound()
  return <BeginnerGuidePage {...resolved} />
}
