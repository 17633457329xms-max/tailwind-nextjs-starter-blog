import type { DisciplineSlug } from './disciplines'

export function disciplineLibraryPath(
  discipline: DisciplineSlug,
  specialty: string,
  stage = 'topic',
  task?: string
) {
  if (!task) return disciplineBeginnerPath(discipline, specialty, stage)
  return `/disciplines/${discipline}/specialties/${encodeURIComponent(specialty)}/${stage}/${task}`
}

export function disciplineBeginnerPath(
  discipline: DisciplineSlug,
  specialty: string,
  stage = 'topic'
) {
  return `/disciplines/${discipline}/specialties/${encodeURIComponent(specialty)}/${stage}/beginner`
}

export function disciplineAdvancedPath(
  discipline: DisciplineSlug,
  specialty: string,
  stage: string,
  topic: string
) {
  return `/disciplines/${discipline}/specialties/${encodeURIComponent(specialty)}/${stage}/advanced/${topic}`
}

export function disciplineAdvancedArticlePath({
  discipline,
  specialty,
  stage,
  topic,
  sourceSlug,
  leafIndex,
}: {
  discipline: DisciplineSlug
  specialty: string
  stage: string
  topic: string
  sourceSlug: string
  leafIndex: number
}) {
  return `${disciplineAdvancedPath(discipline, specialty, stage, topic)}/${sourceSlug}-${leafIndex}`
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
