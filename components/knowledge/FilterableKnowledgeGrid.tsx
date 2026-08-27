'use client'

import { useMemo, useState } from 'react'
import type { Knowledge } from 'contentlayer/generated'
import type { CategoryConfig } from '@/data/knowledgeData'
import KnowledgeCard from './KnowledgeCard'

type Item = Omit<Knowledge, '_id' | '_raw' | 'body'>

const degreeFilters = ['专科论文', '本科论文', '硕士论文', '博士论文']

function matches(item: Item, filter: string, category: CategoryConfig) {
  if (category.slug === 'topics' && degreeFilters.includes(filter)) {
    const text = `${item.title} ${item.tags.join(' ')}`
    const explicitDegree = degreeFilters.find((degree) => text.includes(degree))
    return explicitDegree ? explicitDegree === filter : true
  }
  return item.tags.includes(filter) || item.stage.includes(filter)
}

export default function FilterableKnowledgeGrid({
  category,
  items,
}: {
  category: CategoryConfig
  items: Item[]
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [expanded, setExpanded] = useState(false)
  const filters = useMemo(() => {
    if (category.slug === 'topics') return category.filters
    return Array.from(new Set([...category.filters, ...items.flatMap((item) => item.tags)]))
  }, [category, items])
  const visibleFilters = expanded ? filters : filters.slice(0, 10)
  const visibleItems = selected.length
    ? items.filter((item) => selected.some((filter) => matches(item, filter, category)))
    : items

  function toggle(filter: string) {
    setSelected((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2" aria-label="文章标签筛选">
        {visibleFilters.map((filter) => {
          const active = selected.includes(filter)
          return (
            <button
              type="button"
              key={filter}
              aria-pressed={active}
              onClick={() => toggle(filter)}
              className={`cursor-pointer border px-3 py-2 text-xs font-semibold transition ${
                active ? category.theme.ctaButton : category.theme.filter
              }`}
            >
              {filter}
            </button>
          )
        })}
        {filters.length > 10 && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="cursor-pointer px-3 py-2 text-xs font-bold text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
          >
            {expanded ? '收起标签' : `展开全部（${filters.length}）`}
          </button>
        )}
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => setSelected([])}
            className="cursor-pointer px-3 py-2 text-xs font-bold text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
          >
            清除筛选
          </button>
        )}
      </div>
      <p className="mt-4 text-xs text-slate-500" aria-live="polite">
        {selected.length
          ? `已按“${selected.join('、')}”筛选，共 ${visibleItems.length} 篇`
          : `全部 ${items.length} 篇`}
      </p>
      <div className="mt-6 grid border-t border-black/10 md:grid-cols-2 lg:grid-cols-3 dark:border-white/10">
        {visibleItems.map((item) => (
          <KnowledgeCard key={item.path} item={item} />
        ))}
      </div>
      {visibleItems.length === 0 && (
        <p className="border-b border-black/10 py-10 text-center text-sm text-slate-500 dark:border-white/10">
          暂无匹配内容，请减少筛选条件。
        </p>
      )}
    </>
  )
}
