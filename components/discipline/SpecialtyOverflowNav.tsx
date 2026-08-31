'use client'

import { useEffect, useRef, useState } from 'react'
import type { DisciplineSlug } from '@/data/disciplines'
import { disciplineSpecialties } from '@/data/specialties'
import Link from '@/components/Link'
import { disciplineLibraryPath } from '@/data/disciplineUrls'

export default function SpecialtyOverflowNav({
  discipline,
  selectedSpecialty,
}: {
  discipline: DisciplineSlug
  selectedSpecialty: string
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [canMoveLeft, setCanMoveLeft] = useState(false)
  const [canMoveRight, setCanMoveRight] = useState(false)

  const updateControls = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    setCanMoveLeft(viewport.scrollLeft > 2)
    setCanMoveRight(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 2)
  }

  useEffect(() => {
    updateControls()
    const viewport = viewportRef.current
    if (!viewport) return
    const observer = new ResizeObserver(updateControls)
    observer.observe(viewport)
    window.addEventListener('resize', updateControls)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateControls)
    }
  }, [])

  const move = (direction: 1 | -1) => {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollBy({
      left: direction * Math.max(180, viewport.clientWidth * 0.72),
      behavior: 'smooth',
    })
  }

  const baseHref = `/disciplines/${discipline}`
  return (
    <nav className="hidden min-w-0 items-center gap-1 lg:flex" aria-label="具体专业导航">
      {canMoveLeft && (
        <button
          type="button"
          onClick={() => move(-1)}
          className="grid h-9 w-8 shrink-0 cursor-pointer place-items-center border border-black/15 text-base font-black transition hover:bg-white dark:border-white/15 dark:hover:bg-slate-900"
          aria-label="显示前面的专业"
        >
          ‹
        </button>
      )}
      <div
        ref={viewportRef}
        onScroll={updateControls}
        className="flex max-w-[min(52vw,43rem)] min-w-0 items-center gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {disciplineSpecialties[discipline].map((specialty) => {
          const active = selectedSpecialty === specialty.name
          return (
            <Link
              key={specialty.name}
              href={disciplineLibraryPath(discipline, specialty.name)}
              aria-current={active ? 'page' : undefined}
              className={`shrink-0 px-2.5 py-2 text-sm font-semibold transition ${
                active
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900'
              }`}
            >
              {specialty.name}
            </Link>
          )
        })}
      </div>
      {canMoveRight && (
        <button
          type="button"
          onClick={() => move(1)}
          className="grid h-9 w-8 shrink-0 cursor-pointer place-items-center border border-black/15 text-base font-black transition hover:bg-white dark:border-white/15 dark:hover:bg-slate-900"
          aria-label="显示后面的专业"
        >
          ›
        </button>
      )}
      <Link
        href={`${baseHref}/consulting`}
        className="shrink-0 px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-900"
      >
        咨询辅导
      </Link>
    </nav>
  )
}
