import PageHero from '@/components/PageHero'
import Link from '@/components/Link'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: '关于谢老师讲论文',
  description: '了解谢老师讲论文网站的内容方向、更新原则、研究辅导与论文润色优化方式。',
})

export default function AboutPage() {
  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: siteMetadata.author,
      description: '谢老师讲论文网站维护者，持续整理经管论文研究方法、Stata代码与写作润色内容。',
      knowsAbout: ['经管论文选题', '实证方法', '变量数据', 'Stata', '论文写作', '论文润色'],
    },
  }

  return (
    <div className="pt-8 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <PageHero
        eyebrow="关于本站"
        title="把复杂的论文问题拆成可以执行的下一步"
        description="谢老师讲论文面向国内经管学生，持续整理选题、文献、变量数据、实证方法、Stata代码、论文写作与润色优化内容，并提供一对一问题诊断入口。"
        actions={
          <Link
            href="/contact"
            className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-blue-950 hover:bg-amber-300"
          >
            联系谢老师
          </Link>
        }
      />

      <section className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-950 text-3xl font-black text-white">
            谢
          </div>
          <h2 className="mt-5 text-2xl font-black">谢老师</h2>
          <p className="mt-2 text-sm text-slate-500">谢老师讲论文 · 网站维护者</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['论文选题', '实证方法', 'Stata', '写作润色'].map((item) => (
              <span
                key={item}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200"
              >
                {item}
              </span>
            ))}
          </div>
        </aside>
        <div className="space-y-6">
          {[
            [
              '内容怎么产生',
              '围绕国内经管学生会实际搜索和咨询的问题组织内容。每篇页面先定义问题，再说明判断条件、操作步骤、常见错误和继续阅读路径。',
            ],
            [
              '内容如何核验',
              '方法、命令和数据口径在发布前进行人工检查；页面显示发布日期和最后核验时间，发现问题可以通过联系入口反馈。',
            ],
            [
              '一对一如何开展',
              '首次通过问题摘要判断需求，随后确认材料、沟通方式、交付物、预计周期和复查次数。',
            ],
            [
              '视频如何联动',
              '同一主题会派生为B站、视频号、抖音、小红书、知乎或公众号内容，网站保留更完整的文字、代码和清单。',
            ],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
