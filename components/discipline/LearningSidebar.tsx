'use client'

import { useState } from 'react'
import type { DisciplineConfig } from '@/data/disciplines'
import { getKnowledgeStages } from '@/data/knowledgeArchitecture'
import { getAdvancedTopics } from '@/data/leafArticleViews'
import { disciplineAdvancedPath, disciplineBeginnerPath } from '@/data/disciplineUrls'
import Link from '@/components/Link'

export default function LearningSidebar({
  discipline,
  specialty,
  selectedStage,
  selectedMode,
  selectedTopic,
}: {
  discipline: DisciplineConfig
  specialty: string
  selectedStage?: string
  selectedMode?: 'beginner' | 'advanced'
  selectedTopic?: string
}) {
  const [collapsed, setCollapsed] = useState(false)
  const stages = getKnowledgeStages(discipline.slug)

  return (
    <aside
      className="lg:sticky lg:top-24 lg:self-start"
      aria-label={`${discipline.name}论文知识库导航`}
    >
      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        aria-expanded={!collapsed}
        className="mb-3 flex min-h-11 w-full items-center justify-between border border-black/15 bg-white/55 px-4 text-left text-sm font-black dark:border-white/15 dark:bg-white/5"
      >
        <span>{collapsed ? '展开学习导航' : `${specialty}论文导航`}</span>
        <span aria-hidden="true">{collapsed ? '+' : '−'}</span>
      </button>
      {!collapsed && (
        <div className="border border-black/15 bg-white/35 dark:border-white/15 dark:bg-white/5">
          {stages.map((stage) => {
            const activeStage = selectedStage === stage.key
            const topics = getAdvancedTopics(stage)
            return (
              <details
                key={stage.key}
                open={activeStage}
                className="border-b border-black/15 last:border-b-0 dark:border-white/15"
              >
                <summary className="flex min-h-12 cursor-pointer items-center justify-between px-4 text-sm font-black marker:hidden hover:bg-black/5 dark:hover:bg-white/10">
                  <span>{stage.title}</span>
                  <span aria-hidden="true">⌄</span>
                </summary>
                <div className="border-t border-black/10 bg-white/45 py-2 dark:border-white/10 dark:bg-white/5">
                  <Link
                    href={disciplineBeginnerPath(discipline.slug, specialty, stage.key)}
                    aria-current={activeStage && selectedMode === 'beginner' ? 'page' : undefined}
                    className={`mx-3 block rounded-md px-3 py-2.5 text-sm ${
                      activeStage && selectedMode === 'beginner'
                        ? 'font-black text-white'
                        : 'font-semibold text-slate-700 hover:bg-black/5 dark:text-slate-200 dark:hover:bg-white/10'
                    }`}
                    style={
                      activeStage && selectedMode === 'beginner'
                        ? { backgroundColor: discipline.color }
                        : undefined
                    }
                  >
                    零基础入门
                  </Link>
                  <p className="px-6 pt-3 pb-1 text-xs font-black tracking-wide text-slate-500">
                    进阶阅读
                  </p>
                  <ul>
                    {topics.map((topic) => {
                      const active =
                        activeStage && selectedMode === 'advanced' && selectedTopic === topic.key
                      return (
                        <li key={topic.key}>
                          <Link
                            href={disciplineAdvancedPath(
                              discipline.slug,
                              specialty,
                              stage.key,
                              topic.key
                            )}
                            aria-current={active ? 'page' : undefined}
                            className={`flex items-center justify-between px-6 py-2 text-sm ${
                              active
                                ? 'font-black text-white'
                                : 'font-semibold text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10'
                            }`}
                            style={active ? { backgroundColor: discipline.color } : undefined}
                          >
                            <span>{topic.title}</span>
                            <span className="text-xs opacity-70">50</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </details>
            )
          })}
        </div>
      )}
    </aside>
  )
}
