'use client'

import { useEffect, useState } from 'react'
import type { DisciplineConfig } from '@/data/disciplines'
import { getKnowledgeStages } from '@/data/knowledgeArchitecture'
import Link from '@/components/Link'

export default function KnowledgeSidebar({
  discipline,
  specialty,
  selectedStage,
  selectedTask,
}: {
  discipline: DisciplineConfig
  specialty: string
  selectedStage?: string
  selectedTask?: string
}) {
  const [expanded, setExpanded] = useState(selectedStage ?? 'topic')
  const baseHref = `/disciplines/${discipline.slug}`
  const withContext = (stage: string, task: string) =>
    `${baseHref}?specialty=${encodeURIComponent(specialty)}&stage=${stage}&task=${task}`

  useEffect(() => {
    setExpanded(selectedStage ?? 'topic')
  }, [selectedStage])

  return (
    <aside
      className="lg:sticky lg:top-24 lg:self-start"
      aria-label={`${discipline.name}论文知识库导航`}
    >
      <div className="border border-black/15 bg-white/35 p-4 dark:border-white/15 dark:bg-white/5">
        <p className="text-xs font-black tracking-[0.16em]" style={{ color: discipline.color }}>
          论文知识库
        </p>
        <Link
          href={withContext('topic', 'direction')}
          className="mt-2 block font-serif text-xl font-black"
        >
          {specialty}论文
        </Link>
        <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
          按需要完成的论文产出物进入学习。
        </p>
      </div>
      <nav className="mt-3 border-t border-black/15 dark:border-white/15">
        {getKnowledgeStages(discipline.slug).map((stage) => {
          const isExpanded = expanded === stage.key
          const isActive = selectedStage === stage.key
          return (
            <section key={stage.key} className="border-b border-black/15 dark:border-white/15">
              <button
                type="button"
                onClick={() => setExpanded((current) => (current === stage.key ? '' : stage.key))}
                aria-expanded={isExpanded}
                className={`flex min-h-12 w-full cursor-pointer items-center justify-between px-4 text-left text-sm font-black transition hover:bg-black/5 dark:hover:bg-white/10 ${
                  isActive ? 'bg-black/5 dark:bg-white/10' : ''
                }`}
              >
                <span>{stage.title}</span>
                <span className="text-lg font-normal" aria-hidden="true">
                  {isExpanded ? '−' : '+'}
                </span>
              </button>
              {isExpanded && (
                <ul className="border-t border-black/10 bg-white/45 py-1 dark:border-white/10 dark:bg-white/5">
                  {stage.tasks.map((task) => {
                    const active = selectedStage === stage.key && selectedTask === task.key
                    // 每个“专业 × 产出物 × 具体任务”节点使用独立的 50 篇细分文章池。
                    const count = 50
                    return (
                      <li key={task.key}>
                        <Link
                          href={withContext(stage.key, task.key)}
                          aria-current={active ? 'page' : undefined}
                          className={`block px-5 py-2.5 text-sm transition ${
                            active
                              ? 'font-black text-white'
                              : 'font-semibold text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10'
                          }`}
                          style={active ? { backgroundColor: discipline.color } : undefined}
                        >
                          <span>{task.title}</span>
                          <span className="ml-2 text-xs opacity-70">{count}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </nav>
    </aside>
  )
}
