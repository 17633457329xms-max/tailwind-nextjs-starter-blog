import { notFound } from 'next/navigation'
import ConsultingPage from '@/app/consulting/page'
import { disciplineOrder, isDisciplineSlug } from '@/data/disciplines'

export const generateStaticParams = () =>
  disciplineOrder
    .filter((discipline) => discipline !== 'economics-management')
    .map((discipline) => ({ discipline }))

export default async function Page({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params
  if (!isDisciplineSlug(discipline) || discipline === 'economics-management') notFound()
  return <ConsultingPage />
}
