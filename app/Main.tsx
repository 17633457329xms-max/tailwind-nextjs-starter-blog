import type { Knowledge } from 'contentlayer/generated'
import Link from '@/components/Link'
import KnowledgeCard from '@/components/knowledge/KnowledgeCard'
import { homeFaq, services } from '@/data/knowledgeData'
import { disciplines, publicDisciplineOrder } from '@/data/disciplines'
import { consultingEnabled } from '@/data/siteFeatures'

interface HomeProps {
  featured: Omit<Knowledge, '_id' | '_raw' | 'body'>[]
  totalCount: number
}

const beginnerPaths = [
  {
    label: '01 / 管理学',
    title: '从你的具体专业进入：选题、材料与研究设计一起看',
    href: '/disciplines/management',
  },
  {
    label: '02 / 经济学',
    title: '从你的具体专业进入：问题、数据与实证逻辑一起看',
    href: '/disciplines/economics',
  },
  ...(consultingEnabled
    ? [
        {
          label: '03 / 咨询辅导',
          title: '尚未确定所属专业或研究阶段？先提交你的具体问题',
          href: '/consulting',
        },
      ]
    : []),
]

export default function Home({ featured, totalCount }: HomeProps) {
  return (
    <div className="pt-8 sm:pt-10">
      <section className="border-y-2 border-slate-950 bg-[#efe5d5] text-slate-950 dark:border-slate-200 dark:bg-[#25211c] dark:text-white">
        <div className="grid min-h-[32rem] lg:grid-cols-[15rem_1fr]">
          <aside className="flex flex-col justify-between border-b border-slate-950/20 p-6 lg:border-r lg:border-b-0 lg:p-9 dark:border-white/20">
            <p className="text-xs leading-6 font-bold tracking-[0.22em] text-[#9b3425] dark:text-[#e89b8f]">
              RESEARCH NOTES
              <br />
              论文研究支持
            </p>
            <div>
              <div className="font-serif text-4xl font-black">{totalCount}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                篇持续核验的
                <br />
                中文问题指南
              </p>
            </div>
          </aside>

          <div className="flex flex-col justify-between px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
            <div>
              <p className="text-sm font-bold text-[#9b3425] dark:text-[#e89b8f]">
                面向国内学生 · 从问题判断到表达优化
              </p>
              <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[1.08] font-black tracking-tight sm:text-7xl lg:text-[5.4rem]">
                把论文问题
                <br />
                <span className="text-[#9b3425] dark:text-[#e89b8f]">拆清楚，再解决。</span>
              </h1>
              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-300">
                从选题、文献、变量和数据，到实证方法、Stata、SPSS、Python、论文表达与格式规范，提供可检索的中文知识内容。
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-slate-950/20 pt-6 dark:border-white/20">
              {consultingEnabled && (
                <Link
                  href="/consulting"
                  className="bg-[#9b3425] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#7f291e]"
                >
                  提交论文问题
                </Link>
              )}
              <Link
                href="/disciplines/management"
                className="border border-slate-950 px-6 py-3.5 text-sm font-bold transition hover:bg-slate-950 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-slate-950"
              >
                选择专业进入
              </Link>
              <span className="text-xs text-slate-500 sm:ml-auto dark:text-slate-400">
                选题 · 方法 · 数据 · 文献 · 软件 · 写作
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold text-[#9b3425] dark:text-[#e89b8f]">按专业进入</p>
            <h2 className="mt-2 font-serif text-3xl font-black tracking-tight sm:text-5xl">
              先选专业，再进入对应的研究任务
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-slate-600 lg:justify-self-end dark:text-slate-400">
            每个专业都按自己的研究规范组织选题、文献、材料、方法与论文写作内容，避免跨专业套用模板。
          </p>
        </div>

        <div className="grid border-t border-l border-black/15 md:grid-cols-2 lg:grid-cols-3 dark:border-white/15">
          {publicDisciplineOrder.map((slug) => {
            const discipline = disciplines[slug]
            return (
              <Link
                key={slug}
                href={`/disciplines/${slug}`}
                className="group flex min-h-72 flex-col justify-between border-r border-b border-black/15 bg-[#f5eee4] p-7 transition hover:brightness-[0.97] dark:border-white/15 dark:bg-slate-900 dark:hover:brightness-110"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    DISCIPLINE
                  </span>
                  <span className="h-1 w-12 bg-[#9b3425] dark:bg-[#e89b8f]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-black text-slate-950 dark:text-white">
                    {discipline.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {discipline.audience}
                  </p>
                  <p className="mt-5 text-xs font-bold text-[#9b3425] dark:text-[#e89b8f]">
                    {discipline.research.slice(0, 2).join(' · ')}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-y border-slate-950 py-12 dark:border-slate-200">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#9b3425] dark:text-[#e89b8f]">零基础起步</p>
            <h2 className="mt-2 font-serif text-3xl font-black">第一次做论文，先完成这三步</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            不预设统计基础，也不要求先会写代码
          </p>
        </div>
        <div className="grid divide-y divide-slate-300 lg:grid-cols-3 lg:divide-x lg:divide-y-0 dark:divide-slate-700">
          {beginnerPaths.map((item) => (
            <Link key={item.href} href={item.href} className="group py-6 lg:px-7 lg:first:pl-0">
              <span className="text-xs font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
              <h3 className="mt-4 font-serif text-xl leading-8 font-black group-hover:text-[#9b3425] dark:group-hover:text-[#e89b8f]">
                {item.title}
              </h3>
              <span className="mt-5 inline-block text-sm font-bold">开始阅读 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mb-9 grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-bold text-[#9b3425] dark:text-[#e89b8f]">
              从内容到一对一支持
            </p>
            <h2 className="mt-2 font-serif text-3xl font-black">选择适合当前阶段的服务</h2>
          </div>
          <p className="text-sm leading-7 text-slate-600 lg:justify-self-end lg:text-right dark:text-slate-400">
            先通过免费内容自查；仍无法判断时，再选择单次诊断、论文润色优化一对一定制或阶段辅导。
          </p>
        </div>
        <div className="grid border-y border-slate-300 lg:grid-cols-3 lg:divide-x lg:divide-slate-300 dark:border-slate-700 dark:lg:divide-slate-700">
          {services
            .filter((service) => consultingEnabled || service.href !== '/consulting')
            .map((service) => (
              <div key={service.title} className="py-7 lg:px-7 lg:first:pl-0">
                <h3 className="font-serif text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
                <p className="mt-5 border-t border-slate-300 pt-4 text-xs leading-6 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  交付：{service.deliverable}
                </p>
                <Link
                  href={service.href}
                  className="mt-5 inline-flex text-sm font-bold text-[#9b3425] hover:underline dark:text-[#e89b8f]"
                >
                  查看服务说明 →
                </Link>
              </div>
            ))}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#9b3425] dark:text-[#e89b8f]">近期内容</p>
            <h2 className="mt-2 font-serif text-3xl font-black">从高频问题开始阅读</h2>
          </div>
          <Link href="/disciplines/management" className="text-sm font-bold hover:underline">
            进入管理学专业 →
          </Link>
        </div>
        <div className="grid border-t border-l border-black/10 md:grid-cols-2 lg:grid-cols-3 dark:border-white/10">
          {featured.map((item) => (
            <KnowledgeCard key={item.path} item={item} />
          ))}
        </div>
      </section>

      {consultingEnabled && (
        <section className="grid gap-10 border-t-2 border-slate-950 py-12 lg:grid-cols-[0.75fr_1.25fr] dark:border-slate-200">
          <div>
            <p className="text-sm font-bold text-[#9b3425] dark:text-[#e89b8f]">常见问题</p>
            <h2 className="mt-2 font-serif text-3xl font-black">咨询前先了解这些</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              服务目录、材料准备、润色范围和隐私处理都会在确认前说明清楚。
            </p>
            <Link
              href="/service-standards"
              className="mt-6 inline-flex text-sm font-bold hover:underline"
            >
              查看完整服务标准 →
            </Link>
          </div>
          <div className="divide-y divide-slate-300 dark:divide-slate-700">
            {homeFaq.map(([question, answer]) => (
              <details key={question} className="group py-5 first:pt-0 last:pb-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950 dark:text-white">
                  {question}
                  <span className="text-[#9b3425] transition group-open:rotate-45 dark:text-[#e89b8f]">
                    ＋
                  </span>
                </summary>
                <p className="pt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
