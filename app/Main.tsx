import type { Knowledge } from 'contentlayer/generated'
import Link from '@/components/Link'
import KnowledgeCard from '@/components/knowledge/KnowledgeCard'
import { categories, categoryOrder, homeFaq, services } from '@/data/knowledgeData'

interface HomeProps {
  featured: Omit<Knowledge, '_id' | '_raw' | 'body'>[]
  totalCount: number
}

export default function Home({ featured, totalCount }: HomeProps) {
  return (
    <div className="pt-8 sm:pt-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-blue-950 px-6 py-14 text-white sm:px-10 sm:py-20 lg:px-16">
        <div className="absolute -top-28 right-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-blue-700 bg-blue-900/70 px-4 py-2 text-xs font-bold tracking-[0.18em] text-blue-100">
              面向国内经管学生的论文研究支持
            </p>
            <h1 className="max-w-4xl text-4xl leading-[1.12] font-black tracking-tight sm:text-6xl lg:text-7xl">
              把论文问题拆清楚，
              <span className="text-amber-300">再一步步解决。</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              从选题、文献、变量和数据，到实证方法、Stata代码、论文表达与格式规范，提供可检索的中文知识内容、论文润色优化和一对一咨询入口。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/consulting"
                className="rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-blue-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-300"
              >
                提交论文问题
              </Link>
              <Link
                href="/topics"
                className="rounded-xl border border-blue-600 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                浏览知识库
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {[
              ['6', '核心知识模块'],
              [String(totalCount), '中文问题指南'],
              ['2', '微信/QQ联系入口'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-blue-800 bg-blue-900/60 p-4 lg:p-5"
              >
                <div className="text-2xl font-black text-amber-300 sm:text-3xl">{value}</div>
                <div className="mt-1 text-xs leading-5 text-blue-200 sm:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mb-9 max-w-2xl">
          <p className="text-sm font-bold text-blue-700 dark:text-blue-300">按你当前的问题进入</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            六个经管论文知识入口
          </h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            每个页面只回答一个明确问题，正文提供判断步骤、常见错误和可继续阅读的关联内容。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categoryOrder.map((slug, index) => {
            const category = categories[slug]
            return (
              <Link
                key={slug}
                href={`/${slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <span className={`rounded-xl px-3 py-2 text-xs font-black ${category.color}`}>
                    0{index + 1}
                  </span>
                  <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                    →
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
                  {category.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.featuredQueries.slice(0, 2).map((query) => (
                    <span
                      key={query}
                      className="text-xs font-semibold text-blue-700 dark:text-blue-300"
                    >
                      #{query}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="rounded-[2rem] bg-slate-900 px-6 py-12 text-white sm:px-10 lg:px-12">
        <div className="mb-9 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold text-amber-300">从内容到一对一支持</p>
            <h2 className="mt-2 text-3xl font-black">选择适合当前阶段的服务</h2>
          </div>
          <p className="text-sm leading-7 text-slate-300 lg:justify-self-end lg:text-right">
            先通过免费内容自查；仍无法判断时，再选择单次诊断、论文润色优化或阶段辅导。
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-700 bg-slate-800/70 p-6"
            >
              <h3 className="text-xl font-black">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
              <p className="mt-5 border-t border-slate-700 pt-4 text-xs leading-6 text-amber-200">
                交付：{service.deliverable}
              </p>
              <Link
                href={service.href}
                className="mt-5 inline-flex text-sm font-bold text-white hover:text-amber-300"
              >
                查看服务说明 →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-blue-700 dark:text-blue-300">首批内容</p>
            <h2 className="mt-2 text-3xl font-black">从高频问题开始阅读</h2>
          </div>
          <Link
            href="/methods"
            className="text-sm font-bold text-blue-700 hover:underline dark:text-blue-300"
          >
            查看全部栏目 →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <KnowledgeCard key={item.path} item={item} />
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] dark:border-slate-800 dark:bg-slate-900">
        <div>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-300">常见问题</p>
          <h2 className="mt-2 text-3xl font-black">咨询前先了解这些</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            服务目录、材料准备、润色范围和隐私处理都会在确认前说明清楚。
          </p>
          <Link
            href="/service-standards"
            className="mt-6 inline-flex text-sm font-bold text-blue-700 hover:underline dark:text-blue-300"
          >
            查看完整服务标准 →
          </Link>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {homeFaq.map(([question, answer]) => (
            <details key={question} className="group py-4 first:pt-0 last:pb-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950 dark:text-white">
                {question}
                <span className="text-blue-600 transition group-open:rotate-45">＋</span>
              </summary>
              <p className="pt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
