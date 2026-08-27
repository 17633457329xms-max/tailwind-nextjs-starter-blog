import PageHero from '@/components/PageHero'
import ConsultationForm from '@/components/contact/ConsultationForm'
import ContactCards from '@/components/contact/ContactCards'
import Link from '@/components/Link'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: '经管论文研究设计、Stata与论文润色咨询',
  description:
    '提交经管论文选题、方法、变量数据、Stata代码、写作或润色问题摘要，确认适合的诊断与辅导方式。',
})

export default function ConsultingPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '经管论文研究辅导与润色优化咨询',
    description: metadata.description,
    provider: { '@type': 'Person', name: siteMetadata.author },
    areaServed: 'CN',
    serviceType: ['选题诊断', '实证方法辅导', 'Stata代码复核', '论文写作反馈', '论文润色优化'],
    url: `${siteMetadata.siteUrl}/consulting/`,
  }

  return (
    <div className="pt-8 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <PageHero
        eyebrow="一对一问题诊断与阶段辅导"
        title="先说明问题，再确认适合的服务方式"
        description="提交论文阶段、研究方向和当前卡点。先进行需求分类，再确定适合单次诊断、论文润色优化还是阶段辅导。"
        actions={
          <Link
            href="/service-standards"
            className="rounded-xl border border-blue-600 px-5 py-3 text-sm font-bold hover:bg-white/10"
          >
            查看服务标准
          </Link>
        }
      />

      <section className="grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ConsultationForm />
        <div className="lg:sticky lg:top-24">
          <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
            <h2 className="font-black">希望直接联系？</h2>
            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
              可通过微信或QQ发送“论文阶段 + 研究方向 + 当前问题”。移动端建议保存二维码后识别。
            </p>
          </div>
          <ContactCards compact />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-black">咨询前建议准备</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['01', '研究阶段', '选题、开题、实证、写作、答辩或返修'],
            ['02', '当前材料', '已有选题、变量、数据和方法情况'],
            ['03', '具体卡点', '把最影响进度的问题放在第一位'],
            ['04', '时间安排', '希望完成的时间和可配合时段'],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
              <span className="text-xs font-black text-blue-700 dark:text-blue-300">{number}</span>
              <h3 className="mt-2 font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
