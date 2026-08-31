import DisciplinePortal from '@/components/DisciplinePortal'
import { permanentRedirect } from 'next/navigation'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ viewId?: string }>
}) {
  const { viewId } = await searchParams
  if (viewId) permanentRedirect('/')
  return <DisciplinePortal />
}
