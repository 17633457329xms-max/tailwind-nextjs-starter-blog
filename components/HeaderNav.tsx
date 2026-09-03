'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import headerNavLinks from '@/data/headerNavLinks'
import { categories, isCategorySlug } from '@/data/knowledgeData'
import { isDisciplineSlug } from '@/data/disciplines'
import { getDisciplineSpecialty } from '@/data/specialties'
import Link from './Link'
import SpecialtyOverflowNav from './discipline/SpecialtyOverflowNav'

function activeClass(href: string) {
  const slug = href.slice(1)
  if (isCategorySlug(slug)) return categories[slug].theme.navActive
  return 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
}

export default function HeaderNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (pathname === '/') {
    return (
      <span className="hidden px-3 py-2 text-sm font-semibold text-slate-600 lg:block dark:text-slate-300">
        选择一级学科进入
      </span>
    )
  }

  if (pathname.startsWith('/disciplines/')) {
    const disciplineSlug = pathname.split('/')[2]
    if (!isDisciplineSlug(disciplineSlug)) return null
    const pathSegments = pathname.split('/')
    const specialtyFromPath =
      pathSegments[3] === 'specialties' && pathSegments[4]
        ? decodeURIComponent(pathSegments[4])
        : null
    return (
      <SpecialtyOverflowNav
        discipline={disciplineSlug}
        selectedSpecialty={
          getDisciplineSpecialty(disciplineSlug, specialtyFromPath || searchParams.get('specialty'))
            .name
        }
      />
    )
  }

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
      {headerNavLinks
        .filter((link) => link.href !== '/')
        .map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`px-2.5 py-2 text-sm font-semibold transition ${
                active
                  ? activeClass(link.href)
                  : 'text-slate-700 hover:bg-white hover:text-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white'
              }`}
            >
              {link.title}
            </Link>
          )
        })}
    </nav>
  )
}
