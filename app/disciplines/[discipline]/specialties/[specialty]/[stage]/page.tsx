import { notFound, permanentRedirect } from 'next/navigation'
import { isDisciplineSlug } from '@/data/disciplines'
import { getKnowledgeStages } from '@/data/knowledgeArchitecture'
import { getDisciplineSpecialty } from '@/data/specialties'
import { disciplineBeginnerPath } from '@/data/disciplineUrls'

type Params = { discipline: string; specialty: string; stage: string }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { discipline, specialty, stage } = await params
  if (
    !isDisciplineSlug(discipline) ||
    !getKnowledgeStages(discipline).some((item) => item.key === stage)
  )
    notFound()
  permanentRedirect(
    disciplineBeginnerPath(
      discipline,
      getDisciplineSpecialty(discipline, decodeURIComponent(specialty)).name,
      stage
    )
  )
}
