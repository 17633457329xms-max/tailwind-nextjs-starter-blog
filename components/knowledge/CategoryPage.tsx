import PageHero from '@/components/PageHero'
import KnowledgeCard from './KnowledgeCard'
import Link from '@/components/Link'
import type { CategoryConfig } from '@/data/knowledgeData'
import type { Knowledge } from 'contentlayer/generated'

interface CategoryPageProps {
  category: CategoryConfig
  items: Omit<Knowledge, '_id' | '_raw' | 'body'>[]
}

export default function CategoryPage({ category, items }: CategoryPageProps) {
  return (
    <div className="pt-8 sm:pt-10">
      <PageHero
        eyebrow={category.eyebrow}
        title={category.name}
        description={category.description}
        index={category.index}
        theme={category.theme}
        actions={
          <Link
            href="/consulting"
            className={`px-5 py-3 text-sm font-black transition ${category.theme.action}`}
          >
            提交具体问题
          </Link>
        }
      />

      <section
        className={`mt-8 border-y border-black/8 px-5 py-12 sm:px-8 ${category.theme.surface}`}
      >
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={`text-sm font-bold ${category.theme.sectionLabel}`}>
              国内学生常见检索问题
            </p>
            <h2 className="mt-2 font-serif text-3xl font-black text-slate-950 dark:text-white">
              从具体问题开始
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.filters.map((filter) => (
              <span
                key={filter}
                className={`border px-3 py-1.5 text-xs font-semibold ${category.theme.filter}`}
              >
                {filter}
              </span>
            ))}
          </div>
        </div>
        <div className="grid border-t border-black/10 md:grid-cols-2 lg:grid-cols-3 dark:border-white/10">
          {items.map((item) => (
            <KnowledgeCard key={item.path} item={item} />
          ))}
        </div>
      </section>

      <section className={`mt-10 border p-7 sm:p-9 ${category.theme.cta}`}>
        <p className={`text-sm font-bold ${category.theme.sectionLabel}`}>没有找到你的具体情况？</p>
        <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300">
            提交研究阶段、当前问题和已有材料情况，先判断适合阅读哪类内容，还是需要单次诊断。
          </p>
          <Link
            href="/consulting"
            className={`shrink-0 px-5 py-3 text-center text-sm font-bold ${category.theme.ctaButton}`}
          >
            前往咨询
          </Link>
        </div>
      </section>
    </div>
  )
}
