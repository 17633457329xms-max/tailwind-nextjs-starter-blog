import Link from '@/components/Link'
import type { Knowledge } from 'contentlayer/generated'

interface KnowledgeCardProps {
  item: Omit<Knowledge, '_id' | '_raw' | 'body'>
}

export default function KnowledgeCard({ item }: KnowledgeCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800">
      <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
          {item.difficulty}
        </span>
        {item.stage.slice(0, 2).map((stage) => (
          <span
            key={stage}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {stage}
          </span>
        ))}
      </div>
      <h2 className="text-xl leading-8 font-black text-slate-950 group-hover:text-blue-800 dark:text-white dark:group-hover:text-blue-300">
        <Link href={`/${item.path}`}>{item.title}</Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
        {item.summary}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
        <time dateTime={item.lastmod || item.date}>
          更新于 {(item.lastmod || item.date).slice(0, 10)}
        </time>
        <span className="font-bold text-blue-700 dark:text-blue-300">查看详情 →</span>
      </div>
    </article>
  )
}
