import type { ReactNode } from 'react'
import type { CategoryTheme } from '@/data/knowledgeData'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  index?: string
  theme?: Pick<CategoryTheme, 'hero' | 'eyebrow'>
  actions?: ReactNode
}

const defaultTheme = {
  hero: 'bg-[#30343b] dark:bg-[#202328]',
  eyebrow: 'text-[#e7aa9f]',
}

export default function PageHero({
  eyebrow,
  title,
  description,
  index,
  theme,
  actions,
}: PageHeroProps) {
  const resolvedTheme = theme || defaultTheme

  return (
    <section
      className={`relative overflow-hidden border-y border-black/10 text-white ${resolvedTheme.hero}`}
    >
      <div className="absolute inset-y-0 right-[11%] hidden w-px bg-white/15 lg:block" />
      <div className="grid min-h-[21rem] items-end gap-8 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_12rem] lg:px-14">
        <div className="relative max-w-3xl">
          <p className={`mb-5 text-xs font-bold tracking-[0.24em] ${resolvedTheme.eyebrow}`}>
            {eyebrow}
          </p>
          <h1 className="font-serif text-4xl leading-tight font-black tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
            {description}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {index && (
          <div
            className="hidden border-t border-white/30 pt-5 text-right font-serif text-7xl leading-none text-white/25 lg:block"
            aria-hidden="true"
          >
            {index}
          </div>
        )}
      </div>
    </section>
  )
}
