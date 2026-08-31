import type { DisciplineSlug } from './disciplines'

export function disciplineLibraryPath(
  discipline: DisciplineSlug,
  specialty: string,
  stage = 'topic',
  task = 'direction'
) {
  return `/disciplines/${discipline}/specialties/${encodeURIComponent(specialty)}/${stage}/${task}`
}

export function disciplineLeafArticlePath({
  discipline,
  specialty,
  stage,
  task,
  sourceSlug,
  leafIndex,
}: {
  discipline: DisciplineSlug
  specialty: string
  stage: string
  task: string
  sourceSlug: string
  leafIndex: number
}) {
  return `${disciplineLibraryPath(discipline, specialty, stage, task)}/${sourceSlug}-${leafIndex}`
}
