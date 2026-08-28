'use client'

import { usePathname } from 'next/navigation'
import headerNavLinks from '@/data/headerNavLinks'
import { categories, isCategorySlug } from '@/data/knowledgeData'
import Link from './Link'

function activeClass(href: string) {
  const slug = href.slice(1)
  if (isCategorySlug(slug)) return categories[slug].theme.navActive
  return 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
}

export default function HeaderNav() {
  const pathname = usePathname()
  const syncDisciplineSection = () => {
    window.setTimeout(() => window.dispatchEvent(new Event('hashchange')), 0)
  }

  if (pathname === '/') {
    return (
      <span className="hidden px-3 py-2 text-sm font-semibold text-slate-600 lg:block dark:text-slate-300">
        选择一级学科进入
      </span>
    )
  }

  if (pathname.startsWith('/disciplines/') || pathname === '/economics-management') {
    const disciplineBase =
      pathname === '/economics-management' ? pathname : pathname.split('/').slice(0, 3).join('/')
    return (
      <nav className="hidden items-center gap-1 lg:flex" aria-label="学科导航">
        {['研究议题', '方法路径', '质量标准', '具体专业'].map((title, index) => (
          <Link
            key={title}
            href={`${disciplineBase}#section-${index + 1}`}
            onClick={syncDisciplineSection}
            className="px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900"
          >
            {title}
          </Link>
        ))}
        <Link
          href={
            disciplineBase === '/economics-management'
              ? '/consulting'
              : `${disciplineBase}/consulting`
          }
          className="px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900"
        >
          咨询辅导
        </Link>
      </nav>
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
