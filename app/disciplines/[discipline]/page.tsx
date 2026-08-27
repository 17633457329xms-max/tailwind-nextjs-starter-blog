import { notFound } from 'next/navigation'
import DisciplinePage from '@/components/DisciplinePage'
import { disciplines, disciplineOrder, isDisciplineSlug } from '@/data/disciplines'
import { genPageMetadata } from '@/app/seo'
import { getDisciplineArticles } from '@/data/disciplineArticles'

export const generateStaticParams = () =>
  disciplineOrder
    .filter((slug) => slug !== 'economics-management')
    .map((discipline) => ({ discipline }))

export async function generateMetadata({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params
  if (!isDisciplineSlug(discipline)) return {}
  const item = disciplines[discipline]
  return genPageMetadata({
    title: `${item.name}论文选题、研究方法与写作辅导`,
    description: `${item.statement}${item.audience}`,
  })
}

export default async function Page({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params
  if (!isDisciplineSlug(discipline) || discipline === 'economics-management') notFound()
  return (
    <DisciplinePage
      discipline={disciplines[discipline]}
      articles={getDisciplineArticles(discipline)}
    />
  )
}
