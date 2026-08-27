import Link from '@/components/Link'
import { categories, isCategorySlug } from '@/data/knowledgeData'
import type { Knowledge } from 'contentlayer/generated'

interface KnowledgeCardProps {
  item: Omit<Knowledge, '_id' | '_raw' | 'body'>
}

export default function KnowledgeCard({ item }: KnowledgeCardProps) {
  const category = isCategorySlug(item.category) ? categories[item.category] : categories.methods

  return (
    <article className="group relative flex h-full flex-col border-r border-b border-black/10 bg-white/45 p-6 transition hover:bg-white dark:border-white/10 dark:bg-slate-950/25 dark:hover:bg-slate-900/70">
      <span className={`absolute top-0 left-0 h-1 w-14 ${category.theme.cardRule}`} />
      <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold">
        <span className={`px-2.5 py-1 ${category.theme.cardBadge}`}>{item.difficulty}</span>
        {item.stage.slice(0, 2).map((stage) => (
          <span
            key={stage}
            className="border border-black/10 px-2.5 py-1 text-slate-600 dark:border-white/15 dark:text-slate-300"
          >
            {stage}
          </span>
        ))}
      </div>
      <h2 className="font-serif text-xl leading-8 font-black text-slate-950 dark:text-white">
        <Link href={`/${item.path}`}>{item.title}</Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
        {item.summary}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-black/8 pt-4 text-xs text-slate-500 dark:border-white/10">
        <span>约 {Math.max(1, Math.ceil(item.readingTime.minutes))} 分钟阅读</span>
        <span className={`font-bold ${category.theme.cardLink}`}>阅读全文 →</span>
      </div>
    </article>
  )
}
