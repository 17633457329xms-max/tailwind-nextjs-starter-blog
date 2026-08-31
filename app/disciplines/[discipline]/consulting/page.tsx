import { notFound } from 'next/navigation'
import ConsultingPage from '@/app/consulting/page'
import { isDisciplineSlug, publicDisciplineOrder } from '@/data/disciplines'

export const generateStaticParams = () =>
  publicDisciplineOrder.map((discipline) => ({ discipline }))

export default async function Page({ params }: { params: Promise<{ discipline: string }> }) {
  const { discipline } = await params
  if (!isDisciplineSlug(discipline)) notFound()
  return <ConsultingPage />
}
