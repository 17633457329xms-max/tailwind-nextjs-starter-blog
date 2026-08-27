import { allKnowledge } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import CategoryPage from '@/components/knowledge/CategoryPage'
import { categories, categoryOrder, isCategorySlug } from '@/data/knowledgeData'
import { genPageMetadata } from '@/app/seo'
import { notFound } from 'next/navigation'

export const generateStaticParams = () => categoryOrder.map((category) => ({ category }))

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!isCategorySlug(category)) return {}
  const config = categories[category]
  return genPageMetadata({
    title: `${config.name} - ${config.featuredQueries.join('、')}`,
    description: config.description,
  })
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  if (!isCategorySlug(category)) notFound()

  const items = allCoreContent(
    sortPosts(allKnowledge.filter((item) => item.category === category && !item.draft))
  )

  return <CategoryPage category={categories[category]} items={items} />
}
