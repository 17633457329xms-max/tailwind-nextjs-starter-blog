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
  const [selected, setSelected] = useState<string[]>([])
  const filters = useMemo(
    () => [
      '全部',
      ...Array.from(new Set(articles.flatMap((item) => [item.category, ...item.tags]))),
    ],
    [articles]
  )
  const visible = selected.length
    ? articles.filter((item) =>
        selected.some((filter) => item.category === filter || item.tags.includes(filter))
      )
    : articles
  const toggle = (filter: string) => {
    if (filter === '全部') return setSelected([])
    setSelected((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    )
  }
  return (
    <>
      <div className="flex flex-wrap gap-2" aria-label={`${discipline.name}文章筛选`}>
        {filters.map((filter) => {
          const active = filter === '全部' ? selected.length === 0 : selected.includes(filter)
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(filter)}
              className={`min-h-11 cursor-pointer border px-3 py-2 text-xs font-bold transition ${active ? 'text-white' : 'border-black/15 bg-white/50 hover:bg-white dark:border-white/15 dark:bg-white/5'}`}
              style={
                active
                  ? { backgroundColor: discipline.color, borderColor: discipline.color }
                  : undefined
              }
            >
              {filter}
            </button>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500" aria-live="polite">
        {selected.length
          ? `已按“${selected.join('、')}”筛选，共 ${visible.length} 篇`
          : `全部 ${articles.length} 篇`}
      </p>
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => setSelected([])}
          className="mt-3 min-h-11 cursor-pointer text-xs font-bold text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
        >
          清除筛选
        </button>
      )}
      <div className="mt-6 grid border-t border-l border-black/15 md:grid-cols-2 lg:grid-cols-3 dark:border-white/15">
        {visible.map((article) => (
          <DisciplineArticleCard key={article.slug} article={article} discipline={discipline} />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="border-b border-black/15 py-10 text-center text-sm text-slate-500 dark:border-white/15">
          暂无匹配内容，请减少筛选标签。
        </p>
      )}
    </>
  )
}
