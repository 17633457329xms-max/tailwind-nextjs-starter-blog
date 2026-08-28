'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/Link'
import type { DisciplineConfig } from '@/data/disciplines'
import type { DisciplineArticle } from '@/data/disciplineArticles'
import DisciplineArticleExplorer from './discipline/DisciplineArticleExplorer'

export default function DisciplinePage({
  discipline,
  articles,
}: {
  discipline: DisciplineConfig
  articles: DisciplineArticle[]
}) {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const sections = [
    [
      '博士层级研究议题',
      discipline.research,
      '议题不是现成题目。应继续限定研究对象、时空边界、核心概念与证据来源。',
    ],
    [
      '核心方法路径',
      discipline.methods,
      '方法选择由研究问题决定，并需交代适用条件、材料边界与可能的替代解释。',
    ],
    [
      '学术质量底线',
      discipline.standards,
      '博士层级写作尤其重视原创问题、证据透明、概念一致及对既有研究的实质推进。',
    ],
    [
      '具体专业学习路径',
      ['按专业查看选题与问题', '按专业查看常用材料与方法', '按专业查看写作与引用规范'],
      '选择顶部“具体专业”后，可用专业名称筛选当前学科覆盖的全部专业方向，并进入对应文章学习。',
    ],
  ] as const

  useEffect(() => {
    const readHash = () => {
      const section = Number(window.location.hash.replace('#section-', ''))
      setActiveSection(section >= 1 && section <= sections.length ? section : null)
    }

    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [sections.length])

  const visibleSections = activeSection
    ? sections.filter((_, index) => index + 1 === activeSection)
    : sections
  const activeNavSection = activeSection
    ? (['research', 'methods', 'standards', 'specialties'] as const)[activeSection - 1]
    : null
  const visibleArticles = activeNavSection
    ? articles.filter((article) => article.navSection === activeNavSection)
    : articles
  const articleLibraryTitle = activeSection
    ? `${sections[activeSection - 1][0]}内容库`
    : '从方法、证据和真实研究问题开始'
  return (
    <div className="py-10 sm:py-14">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/">学科首页</Link>
        <span className="mx-2">/</span>
        {discipline.name}
      </nav>
      <header
        className="border-y-2 border-slate-950 py-12 dark:border-slate-200"
        style={{ borderTopColor: discipline.color }}
      >
        <p className="text-xs font-black tracking-[0.2em]" style={{ color: discipline.color }}>
          {discipline.english}
        </p>
        <h1 className="mt-4 font-serif text-5xl font-black">{discipline.name}论文研究中心</h1>
        <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600 dark:text-slate-300">
          {discipline.statement}
        </p>
        <p className="mt-3 text-sm text-slate-500">{discipline.audience}</p>
      </header>
      <div
        className={`grid gap-0 border-l border-black/15 dark:border-white/15 ${
          activeSection ? 'lg:grid-cols-1' : 'lg:grid-cols-3'
        }`}
        aria-live="polite"
      >
        {visibleSections.map(([title, items, note]) => {
          const index = sections.findIndex(([sectionTitle]) => sectionTitle === title)
          return (
            <section
              id={`section-${index + 1}`}
              key={title}
              className="border-r border-b border-black/15 p-7 dark:border-white/15"
            >
              <p
                className="text-xs font-black tracking-[0.18em]"
                style={{ color: discipline.color }}
              >
                0{index + 1}
              </p>
              <h2 className="mt-4 font-serif text-2xl font-black">{title}</h2>
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-black/10 pt-4 text-sm font-bold dark:border-white/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-7 text-slate-500">{note}</p>
            </section>
          )
        })}
      </div>
      <section className="border-b border-black/15 py-12 sm:py-16 dark:border-white/15">
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.18em]" style={{ color: discipline.color }}>
              深度内容库
            </p>
            <h2 className="mt-3 font-serif text-3xl font-black">{articleLibraryTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {activeSection
                ? `当前仅展示“${sections[activeSection - 1][0]}”下的 ${visibleArticles.length} 篇专属文章。每篇均提供可操作的研究步骤、证据边界、常见误区和权威资料入口。`
                : '每篇内容均提供可操作的研究步骤、证据矩阵、常见误区和权威资料入口。请选择顶部栏目查看对应的专属文章。'}
            </p>
          </div>
          <p className="text-sm font-black text-slate-500">
            {activeSection ? `当前 ${visibleArticles.length} 篇` : `共 ${articles.length} 篇`} ·
            持续更新
          </p>
        </div>
        <DisciplineArticleExplorer articles={visibleArticles} discipline={discipline} />
      </section>
      <section
        className="mt-10 grid gap-8 border p-8 lg:grid-cols-[1fr_auto] lg:items-center"
        style={{ borderColor: discipline.color }}
      >
        <div>
          <h2 className="font-serif text-2xl font-black">一对一定制研究辅导与论文润色优化</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            通过微信或QQ简要说明培养层次、研究方向和当前卡点，再确认选题诊断、方法辅导、写作反馈或论文润色优化一对一定制的范围。
          </p>
        </div>
        <Link
          href={`/disciplines/${discipline.slug}/consulting`}
          className="px-6 py-3 text-sm font-black text-white"
          style={{ backgroundColor: discipline.color }}
        >
          微信、QQ咨询
        </Link>
      </section>
    </div>
  )
}
