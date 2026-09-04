import Link from '@/components/Link'
import type { ReactNode } from 'react'
import CopyableCodeBlock from './CopyableCodeBlock'
import ChartActions from './ChartActions'
import type { DisciplineArticle } from '@/data/disciplineArticles'
import type { DisciplineConfig } from '@/data/disciplines'
import DisciplineArticleCard from './DisciplineArticleCard'
import { getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getDisciplineSpecialty } from '@/data/specialties'
import { disciplineLibraryPath } from '@/data/disciplineUrls'

function PublicDataChart({
  chart,
  color,
}: {
  chart: NonNullable<DisciplineArticle['chart']>
  color: string
}) {
  const max = Math.max(...chart.values.map((item) => item.value))
  const barWidth = 132
  const gap = 60
  const plotStart = 72
  const chartWidth = Math.max(
    720,
    plotStart + chart.values.length * barWidth + (chart.values.length - 1) * gap + 48
  )
  const axisEnd = chartWidth - 28

  return (
    <figure className="not-prose relative my-10 border border-black/15 p-5 dark:border-white/15">
      <figcaption className="font-serif text-xl font-black">{chart.title}</figcaption>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {chart.description}
      </p>
      {chart.dataUpdatedAt && (
        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
          数据更新：{chart.dataUpdatedAt}
        </p>
      )}
      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} 280`}
          role="img"
          aria-label={`${chart.title}，单位：${chart.unit}`}
          className="block h-auto w-full max-w-none min-w-160"
          data-chart-svg
        >
          <line x1="54" y1="228" x2={axisEnd} y2="228" stroke="currentColor" strokeOpacity="0.25" />
          {chart.values.map((item, index) => {
            const x = plotStart + index * (barWidth + gap)
            const height = (item.value / max) * 170
            const y = 228 - height
            return (
              <g key={item.label}>
                <rect x={x} y={y} width={barWidth} height={height} fill={color} opacity="0.88" />
                <text
                  x={x + barWidth / 2}
                  y={y - 10}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                >
                  {item.value}
                </text>
                <text x={x + barWidth / 2} y="255" textAnchor="middle" fontSize="16">
                  {item.label}
                </text>
              </g>
            )
          })}
          <text x="54" y="28" fontSize="14" fill="currentColor" opacity="0.7">
            单位：{chart.unit}
          </text>
        </svg>
      </div>
      <ChartActions title={chart.title} unit={chart.unit} values={chart.values} />
      <p className="mt-4 text-xs leading-6 text-slate-500">
        数据来源：
        <a href={chart.sourceUrl} target="_blank" rel="noreferrer" className="font-bold underline">
          {chart.sourceLabel}
        </a>
      </p>
    </figure>
  )
}

function renderInlineMath(text: string) {
  const expression = /([A-Za-z\u0370-\u03FF]+)_([A-Za-z0-9]+)/g
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = expression.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    nodes.push(
      <span key={`${match.index}-${match[0]}`} className="inline-block whitespace-nowrap">
        {match[1]}
        <sub className="ml-px align-sub text-[0.7em] leading-none">{match[2]}</sub>
      </span>
    )
    cursor = match.index + match[0].length
  }

  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes.length > 0 ? nodes : text
}

export default function DisciplineArticlePage({
  article,
  discipline,
  related,
}: {
  article: DisciplineArticle
  discipline: DisciplineConfig
  related: DisciplineArticle[]
}) {
  const specialty = getDisciplineSpecialty(discipline.slug, article.specialties?.[0])
  const task = getKnowledgeTask(discipline.slug, article.knowledgeStage, article.knowledgeTask)
  const libraryHref = disciplineLibraryPath(
    discipline.slug,
    specialty.name,
    task?.stage.key,
    task?.task.key
  )
  return (
    <div className="py-8 sm:py-12">
      <nav className="mb-6 text-sm text-slate-500" aria-label="面包屑">
        <Link href="/">学科首页</Link>
        <span className="mx-2">/</span>
        <Link href={`/disciplines/${discipline.slug}`}>{discipline.name}</Link>
        <span className="mx-2">/</span>
        <Link href={libraryHref}>{specialty.name}</Link>
        {task && (
          <>
            <span className="mx-2">/</span>
            <Link href={libraryHref}>{task.stage.title}</Link>
            <span className="mx-2">/</span>
            <Link href={libraryHref}>{task.task.title}</Link>
          </>
        )}
      </nav>
      <article>
        <header
          className="border-y-2 border-slate-950 py-10 sm:py-14 dark:border-slate-200"
          style={{ borderTopColor: discipline.color }}
        >
          <div className="flex flex-wrap gap-2 text-xs font-black">
            <span className="px-3 py-1.5 text-white" style={{ backgroundColor: discipline.color }}>
              {article.category}
            </span>
            <span className="border border-black/15 px-3 py-1.5 dark:border-white/15">
              {article.difficulty}
            </span>
          </div>
          <h1 className="mt-6 max-w-5xl font-serif text-3xl leading-tight font-black sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600 dark:text-slate-300">
            {article.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-500">
            <span>谢老师讲论文编辑部</span>
            <time dateTime={article.date}>更新：{article.date}</time>
            <span>约 {article.readingMinutes} 分钟阅读</span>
          </div>
        </header>
        <div className="mx-auto grid max-w-6xl gap-12 py-12 xl:grid-cols-[13rem_minmax(0,48rem)]">
          <aside className="hidden xl:block">
            <nav
              className="sticky top-24 border-t-2 pt-4"
              style={{ borderColor: discipline.color }}
            >
              <p className="mb-3 text-xs font-black tracking-widest text-slate-500">本文目录</p>
              {article.sections.map((section, index) => (
                <a
                  key={section.heading}
                  href={`#section-${index + 1}`}
                  className="block border-b border-black/10 py-3 text-sm leading-6 hover:underline dark:border-white/10"
                >
                  {section.heading}
                </a>
              ))}
            </nav>
          </aside>
          <div className="min-w-0">
            <section className="mb-10 border border-black/15 p-6 dark:border-white/15">
              <p className="text-xs font-black tracking-widest" style={{ color: discipline.color }}>
                原创研究框架
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-5">
                {['提出问题', '界定材料', '选择方法', '反例检验', '限定结论'].map((step, index) => (
                  <div
                    key={step}
                    className="border-t-2 bg-black/3 p-3 text-center text-sm font-black dark:bg-white/5"
                    style={{ borderColor: discipline.color }}
                  >
                    <span className="block text-xs text-slate-400">0{index + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </section>
            {article.caseStudy && (
              <section
                className="mb-10 border-l-4 bg-black/3 p-6 dark:bg-white/5"
                style={{ borderColor: discipline.color }}
              >
                <p
                  className="text-xs font-black tracking-widest"
                  style={{ color: discipline.color }}
                >
                  公开案例与材料起点
                </p>
                <h2 className="mt-3 font-serif text-2xl font-black">{article.caseStudy.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
                  {article.caseStudy.context}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {article.caseStudy.takeaway}
                </p>
                <a
                  href={article.caseStudy.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-black underline"
                  style={{ color: discipline.color }}
                >
                  查看公开材料来源：{article.caseStudy.sourceLabel} →
                </a>
              </section>
            )}
            {article.chart && <PublicDataChart chart={article.chart} color={discipline.color} />}
            {article.codeExample && (
              <CopyableCodeBlock
                code={article.codeExample.code}
                language={article.codeExample.language}
                title={article.codeExample.title}
                note={article.codeExample.note}
                color={discipline.color}
              />
            )}
            <div className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-24 max-w-none">
              {article.sections.map((section, index) => (
                <section id={`section-${index + 1}`} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderInlineMath(paragraph)}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((item) => (
                        <li key={item}>{renderInlineMath(item)}</li>
                      ))}
                    </ul>
                  )}
                  {section.table && (
                    <figure className="not-prose my-8 overflow-x-auto">
                      <table className="w-full min-w-150 border-collapse text-left text-sm">
                        <caption className="mb-3 text-left font-black">
                          {section.table.caption}
                        </caption>
                        <thead>
                          <tr>
                            {section.table.headers.map((header) => (
                              <th
                                key={header}
                                className="border border-black/15 bg-black/5 p-3 dark:border-white/15 dark:bg-white/10"
                              >
                                {renderInlineMath(header)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join('|')}>
                              {row.map((cell) => (
                                <td
                                  key={cell}
                                  className="border border-black/15 p-3 align-top leading-6 dark:border-white/15"
                                >
                                  {renderInlineMath(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </figure>
                  )}
                </section>
              ))}
              <h2>权威资料与延伸阅读</h2>
              <ul>
                {article.references.map((reference) => (
                  <li key={reference.url}>
                    <a href={reference.url} target="_blank" rel="noreferrer">
                      {reference.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-500">
                外部资料用于核对法源、数据与研究背景；访问时请以发布机构最新页面为准。
              </p>
            </div>
            <section className="mt-12 border p-7" style={{ borderColor: discipline.color }}>
              <h2 className="font-serif text-xl font-black">需要结合你的材料进一步判断？</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                可提交研究阶段、题目、材料类型和当前卡点，确认适合选题诊断、方法辅导或论文润色优化一对一定制。
              </p>
              <Link
                href="/consulting"
                className="mt-4 inline-flex font-black hover:underline"
                style={{ color: discipline.color }}
              >
                微信、QQ咨询 →
              </Link>
            </section>
          </div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="border-t border-black/15 py-12 dark:border-white/15">
          <h2 className="mb-6 font-serif text-2xl font-black">继续阅读</h2>
          <div className="grid border-t border-l border-black/15 md:grid-cols-3 dark:border-white/15">
            {related.map((item) => (
              <DisciplineArticleCard key={item.slug} article={item} discipline={discipline} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
