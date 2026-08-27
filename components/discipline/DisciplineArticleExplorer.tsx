'use client'

import { useMemo, useState } from 'react'
import type { DisciplineArticle } from '@/data/disciplineArticles'
import type { DisciplineConfig } from '@/data/disciplines'
import DisciplineArticleCard from './DisciplineArticleCard'

export default function DisciplineArticleExplorer({
  articles,
  discipline,
}: {
  articles: DisciplineArticle[]
  discipline: DisciplineConfig
}) {
  const [selected, setSelected] = useState('全部')
  const filters = useMemo(
    () => [
      '全部',
      ...Array.from(new Set(articles.flatMap((item) => [item.category, ...item.tags]))),
    ],
    [articles]
  )
  const visible =
    selected === '全部'
      ? articles
      : articles.filter((item) => item.category === selected || item.tags.includes(selected))
  return (
    <>
      <div className="flex flex-wrap gap-2" aria-label={`${discipline.name}文章筛选`}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={selected === filter}
            onClick={() => setSelected(filter)}
            className={`min-h-11 cursor-pointer border px-3 py-2 text-xs font-bold transition ${selected === filter ? 'text-white' : 'border-black/15 bg-white/50 hover:bg-white dark:border-white/15 dark:bg-white/5'}`}
            style={
              selected === filter
                ? { backgroundColor: discipline.color, borderColor: discipline.color }
                : undefined
            }
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500" aria-live="polite">
        {selected === '全部'
          ? `全部 ${articles.length} 篇`
          : `“${selected}”共 ${visible.length} 篇`}
      </p>
      <div className="mt-6 grid border-t border-l border-black/15 md:grid-cols-2 lg:grid-cols-3 dark:border-white/15">
        {visible.map((article) => (
          <DisciplineArticleCard key={article.slug} article={article} discipline={discipline} />
        ))}
      </div>
    </>
  )
}
