'use client'

import { usePathname, useRouter } from 'next/navigation'
import { disciplines, disciplineOrder } from '@/data/disciplines'

function currentTenant(pathname: string) {
  if (pathname.startsWith('/disciplines/')) return pathname.split('/')[2]
  if (pathname === '/') return ''
  return 'economics-management'
}

export default function TenantSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const current = currentTenant(pathname)

  return (
    <label className="hidden items-center gap-2 border-l border-black/15 pl-3 md:flex dark:border-white/15">
      <span className="sr-only">切换一级学科</span>
      <select
        aria-label="切换一级学科，可选择经济学与管理学、法学、教育学、中国语言文学、艺术学、马克思主义理论"
        value={current}
        onChange={(event) => {
          const value = event.target.value
          router.push(
            value === 'economics-management' ? '/economics-management' : `/disciplines/${value}`
          )
        }}
        className="max-w-40 cursor-pointer border-0 bg-transparent py-2 pr-8 text-xs font-bold text-slate-700 focus:ring-0 dark:text-slate-200"
      >
        <option value="" disabled>
          切换学科
        </option>
        {disciplineOrder.map((slug) => (
          <option key={slug} value={slug}>
            {disciplines[slug].name}
          </option>
        ))}
      </select>
    </label>
  )
}
