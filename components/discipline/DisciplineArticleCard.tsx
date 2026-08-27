import Link from '@/components/Link'
import type { DisciplineArticle } from '@/data/disciplineArticles'
import type { DisciplineConfig } from '@/data/disciplines'

export default function DisciplineArticleCard({
  article,
  discipline,
}: {
  article: DisciplineArticle
  discipline: DisciplineConfig
}) {
  const href = `/disciplines/${article.discipline}/${article.slug}`
  return (
    <article className="group relative flex h-full flex-col border-r border-b border-black/15 bg-white/40 p-6 transition hover:bg-white dark:border-white/15 dark:bg-white/3 dark:hover:bg-white/8">
      <span
        className="absolute top-0 left-0 h-1 w-16"
        style={{ backgroundColor: discipline.color }}
      />
      <div className="flex flex-wrap gap-2 text-xs font-bold">
        <span className="px-2.5 py-1 text-white" style={{ backgroundColor: discipline.color }}>
          {article.category}
        </span>
        <span className="border border-black/15 px-2.5 py-1 dark:border-white/15">
          {article.difficulty}
        </span>
      </div>
      <h2 className="mt-5 font-serif text-xl leading-8 font-black">
        <Link href={href} className="hover:underline">
          {article.title}
        </Link>
      </h2>
      <Link
        href={href}
        className="mt-3 flex-1 cursor-pointer text-sm leading-7 text-slate-600 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white"
      >
        {article.summary}
      </Link>
      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span key={tag} className="bg-black/5 px-2 py-1 text-xs dark:bg-white/10">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 text-xs dark:border-white/10">
        <span className="text-slate-500">约 {article.readingMinutes} 分钟</span>
        <Link
          href={href}
          className="cursor-pointer font-black hover:underline"
          style={{ color: discipline.color }}
        >
          阅读全文 →
        </Link>
      </div>
    </article>
  )
}
