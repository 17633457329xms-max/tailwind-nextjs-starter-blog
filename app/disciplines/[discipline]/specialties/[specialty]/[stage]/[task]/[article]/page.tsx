import { notFound } from 'next/navigation'
import DisciplineArticlePage from '@/components/discipline/DisciplineArticlePage'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'
import { disciplines, isDisciplineSlug } from '@/data/disciplines'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getSpecialtyLeafArticles } from '@/data/leafArticleViews'
import { getDisciplineSpecialty } from '@/data/specialties'
import { disciplineLibraryPath } from '@/data/disciplineUrls'
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/components/StructuredData'

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
  const specialty = getDisciplineSpecialty(values.discipline, decodeURIComponent(values.specialty))
  const selectedTask = getKnowledgeTask(values.discipline, values.stage, values.task)
  const basePath = `/disciplines/${values.discipline}/specialties/${values.specialty}/${values.stage}/${values.task}`
  const articlePath = `${basePath}/${values.article}`
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: resolved.article.title,
          summary: resolved.article.summary,
          path: articlePath,
          date: resolved.article.date,
        })}
      />
      {selectedTask && (
        <JsonLd
          data={breadcrumbJsonLd([
            { name: '学科首页', path: '/' },
            {
              name: disciplines[values.discipline].name,
              path: `/disciplines/${values.discipline}`,
            },
            // 特化与阶段没有独立路由，只作为层级名称出现，避免重复指向同一 URL。
            { name: specialty.name },
            { name: selectedTask.stage.title },
            {
              name: selectedTask.task.title,
              path: disciplineLibraryPath(
                values.discipline,
                specialty.name,
                selectedTask.stage.key,
                selectedTask.task.key
              ),
            },
            { name: resolved.article.title, path: articlePath },
          ])}
        />
      )}
      <DisciplineArticlePage
        article={resolved.article}
        discipline={disciplines[values.discipline]}
        related={resolved.sourceArticles
          .filter((item) => item.slug !== resolved.article.sourceSlug)
          .slice(0, 3)}
      />
    </>
  )
}
