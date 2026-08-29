import Link from '@/components/Link'
import { disciplines, disciplineOrder } from '@/data/disciplines'

export default function DisciplinePortal() {
  return (
    <div className="py-12 sm:py-16">
      <section className="border-y-2 border-slate-950 py-12 dark:border-slate-200">
        <p className="text-sm font-black tracking-[0.22em] text-[#9b3425]">论文研究与写作辅导</p>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight font-black sm:text-6xl">
          先选择你的一级学科，进入对应的研究方法与内容体系
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
          不同学科使用不同的问题意识、证据规则和写作规范。本站提供选题诊断、研究方法辅导、写作反馈与论文润色优化一对一定制，不提供代写、数据伪造或成果冒用。
        </p>
      </section>
      <section className="grid border-t border-l border-black/15 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/15">
        {disciplineOrder.map((slug, index) => {
          const item = disciplines[slug]
          const href = `/disciplines/${slug}`
          return (
            <Link
              key={slug}
              href={href}
              className="group min-h-72 border-r border-b border-black/15 bg-white/35 p-7 transition hover:bg-white dark:border-white/15 dark:bg-white/3 dark:hover:bg-white/8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-[0.18em] text-slate-500">
                  0{index + 1}
                </span>
                <span className="h-3 w-3" style={{ backgroundColor: item.color }} />
              </div>
              <h2 className="mt-10 font-serif text-3xl font-black">{item.name}</h2>
              <p className="mt-1 text-xs tracking-wider text-slate-500">{item.english}</p>
              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.statement}
              </p>
              <span className="mt-7 inline-flex text-sm font-black group-hover:underline">
                进入学科 →
              </span>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
