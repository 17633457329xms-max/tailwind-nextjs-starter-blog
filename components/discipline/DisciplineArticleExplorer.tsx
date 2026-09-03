'use client'

import { useEffect, useMemo, useState } from 'react'
import type { DisciplineArticle } from '@/data/disciplineArticles'
import type { DisciplineConfig } from '@/data/disciplines'
import DisciplineArticleCard from './DisciplineArticleCard'

const pageSizeOptions = [6, 12, 18] as const

function articleFilters(article: DisciplineArticle): string[] {
  return [
    article.difficulty,
    ...(article.caseStudy ? ['公开案例'] : []),
    ...(article.chart ? ['数据图表'] : []),
    ...(article.codeExample ? ['代码示例'] : []),
    ...(article.knowledgeStage === 'tools' ? ['模板与工具'] : []),
  ]
}

export default function DisciplineArticleExplorer({
  articles,
  discipline,
  context,
}: {
  articles: DisciplineArticle[]
  discipline: DisciplineConfig
  context?: { specialty: string; stage?: string; task?: string; topic?: string; mode?: 'advanced' }
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(6)
  const [jumpPage, setJumpPage] = useState('')
  const articleKey = articles.map((article) => article.slug).join('|')
  const filters = useMemo(
    () => ['全部', ...Array.from(new Set(articles.flatMap(articleFilters)))],
    [articles]
  )
  const visible = selected.length
    ? articles.filter((item) => selected.some((filter) => articleFilters(item).includes(filter)))
    : articles
  const totalPages = Math.max(1, Math.ceil(visible.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const pagedArticles = visible.slice((safePage - 1) * pageSize, safePage * pageSize)
  const pageItems = (() => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, index) => index + 1)
    const items: Array<number | 'ellipsis-left' | 'ellipsis-right'> = [1, 2, 3]
    if (safePage > 4 && safePage < totalPages - 2) {
      items.push('ellipsis-left', safePage, 'ellipsis-right')
    } else if (safePage >= totalPages - 2) {
      items.push('ellipsis-left', totalPages - 2, totalPages - 1)
    } else {
      items.push('ellipsis-right')
    }
    items.push(totalPages)
    return Array.from(new Set(items))
  })()

  useEffect(() => {
    setSelected([])
    setPage(1)
  }, [articleKey])

  const toggle = (filter: string) => {
    setPage(1)
    if (filter === '全部') return setSelected([])
    setSelected((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    )
  }

  const changePageSize = (value: (typeof pageSizeOptions)[number]) => {
    setPageSize(value)
    setPage(1)
    setJumpPage('')
  }

  const submitJump = () => {
    const target = Number(jumpPage)
    if (Number.isInteger(target) && target >= 1 && target <= totalPages) setPage(target)
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
              className={`min-h-11 cursor-pointer border px-3 py-2 text-xs font-bold transition ${
                active
                  ? 'text-white'
                  : 'border-black/15 bg-white/50 hover:bg-white dark:border-white/15 dark:bg-white/5'
              }`}
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
        {visible.length > pageSize ? ` · 第 ${safePage}/${totalPages} 页` : ''}
      </p>
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setSelected([])
            setPage(1)
          }}
          className="mt-3 min-h-11 cursor-pointer text-xs font-bold text-slate-600 underline-offset-4 hover:underline dark:text-slate-300"
        >
          清除筛选
        </button>
      )}
      <div className="mt-6 grid border-t border-l border-black/15 md:grid-cols-2 lg:grid-cols-3 dark:border-white/15">
        {pagedArticles.map((article) => (
          <DisciplineArticleCard
            key={article.slug}
            article={article}
            discipline={discipline}
            context={context}
          />
        ))}
      </div>
      {visible.length === 0 && (
        <p className="border-b border-black/15 py-10 text-center text-sm text-slate-500 dark:border-white/15">
          暂无匹配内容，请减少筛选标签。
        </p>
      )}
      {totalPages > 1 && (
        <nav className="mt-8 flex flex-wrap items-center gap-2" aria-label="文章分页">
          <label className="flex min-h-11 items-center gap-2 border border-black/15 px-3 text-xs font-bold dark:border-white/15">
            每页
            <select
              value={pageSize}
              onChange={(event) =>
                changePageSize(Number(event.target.value) as (typeof pageSizeOptions)[number])
              }
              className="bg-transparent font-black outline-none"
              aria-label="每页文章数"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}篇
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="min-h-11 border border-black/15 px-4 text-xs font-black disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15"
          >
            上一页
          </button>
          {pageItems.map((item) =>
            typeof item === 'number' ? (
              <button
                key={item}
                type="button"
                aria-current={safePage === item ? 'page' : undefined}
                onClick={() => setPage(item)}
                className={`min-h-11 min-w-11 border px-3 text-xs font-black ${
                  safePage === item
                    ? 'text-white'
                    : 'border-black/15 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10'
                }`}
                style={
                  safePage === item
                    ? { backgroundColor: discipline.color, borderColor: discipline.color }
                    : undefined
                }
              >
                {item}
              </button>
            ) : (
              <span
                key={item}
                className="min-w-8 text-center text-sm text-slate-500"
                aria-hidden="true"
              >
                …
              </span>
            )
          )}
          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="min-h-11 border border-black/15 px-4 text-xs font-black disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15"
          >
            下一页
          </button>
          <div className="flex min-h-11 items-center gap-2 border border-black/15 px-2 dark:border-white/15">
            <label htmlFor="article-page-jump" className="px-1 text-xs font-bold">
              跳至
            </label>
            <input
              id="article-page-jump"
              inputMode="numeric"
              value={jumpPage}
              onChange={(event) => setJumpPage(event.target.value.replace(/\D/g, ''))}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitJump()
              }}
              className="w-10 bg-transparent text-center text-xs font-black outline-none"
              aria-label="跳转页码"
            />
            <button
              type="button"
              onClick={submitJump}
              className="px-2 text-xs font-black underline-offset-4 hover:underline"
            >
              跳转
            </button>
          </div>
        </nav>
      )}
    </>
  )
}
