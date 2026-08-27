import PageHero from '@/components/PageHero'
import Link from '@/components/Link'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: '经管论文润色优化 - 语言、结构、逻辑与格式',
  description:
    '提供经管论文中文语言润色、结构逻辑优化、术语统一、标题摘要、图表表述、引用格式和返修说明优化。',
})

const scope = [
  ['语言表达', '处理病句、歧义、冗余、口语化和语气不一致，使表达准确、清晰、克制。'],
  ['结构逻辑', '检查章节关系、段落衔接、论点与证据对应，以及研究问题与结论是否一致。'],
  ['标题摘要', '突出研究对象、问题、方法、主要发现和贡献，并保持中英文信息一致。'],
  ['术语与变量', '统一变量名称、缩写、时态、符号、表题和正文中的表达口径。'],
  ['图表与结果', '优化表题、图注、显著性说明和结果叙述，减少重复罗列数值。'],
  ['引用与格式', '按学校或期刊模板检查标题层级、编号、脚注、参考文献和版式细节。'],
  ['返修说明', '梳理审稿/导师意见、修改位置、修改内容和回复逻辑，形成可核对的差异清单。'],
  ['最终自查', '提供术语一致性表、遗留问题标注和提交前自查清单。'],
]

export default function PolishingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '经管论文润色优化',
    description: metadata.description,
    provider: { '@type': 'Person', name: siteMetadata.author },
    areaServed: 'CN',
    serviceType: scope.map(([title]) => title),
    url: `${siteMetadata.siteUrl}/polishing/`,
  }

  return (
    <div className="pt-8 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="论文润色优化"
        title="不只改句子，也检查结构、逻辑和格式是否一致"
        description="根据论文阶段和现有问题，处理语言表达、章节逻辑、术语、标题摘要、图表结果、引用格式与返修说明，并通过修订痕迹和批注说明修改理由。"
        actions={
          <>
            <Link
              href="/consulting"
              className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-blue-950 hover:bg-amber-300"
            >
              提交润色需求
            </Link>
            <Link
              href="/writing"
              className="rounded-xl border border-blue-600 px-5 py-3 text-sm font-bold hover:bg-white/10"
            >
              查看写作教程
            </Link>
          </>
        }
      />

      <section className="py-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold text-blue-700 dark:text-blue-300">润色范围</p>
          <h2 className="mt-2 text-3xl font-black">按问题选择处理层级</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            实际范围根据篇幅、稿件阶段、时间、目标格式和复查次数确认，不使用模糊的“全包”表述。
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scope.map(([title, description], index) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="text-xs font-black text-blue-700 dark:text-blue-300">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-[2rem] bg-slate-900 p-7 text-white sm:p-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-amber-300">建议交付物</p>
          <h2 className="mt-2 text-3xl font-black">每一处修改都能追踪和复查</h2>
        </div>
        <ul className="grid gap-3 text-sm leading-7 text-slate-200 sm:grid-cols-2">
          {[
            '带修订痕迹的文档',
            '问题批注与修改说明',
            '术语一致性清单',
            '格式核验清单',
            '需作者确认的问题',
            '约定次数的复查反馈',
          ].map((item) => (
            <li key={item} className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
              ✓ {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
