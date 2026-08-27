import PageHero from '@/components/PageHero'
import Link from '@/components/Link'
import { genPageMetadata } from '@/app/seo'
import { services } from '@/data/knowledgeData'

export const metadata = genPageMetadata({
  title: '研究辅导与论文润色服务说明',
  description:
    '查看选题诊断、实证方法、Stata代码、写作反馈、论文润色优化和阶段辅导的适用阶段、材料与交付标准。',
})

export default function ServiceStandardsPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <PageHero
        eyebrow="服务说明与交付标准"
        title="咨询前，把适用阶段、材料和交付物说明清楚"
        description="网站提供问题诊断、方法教学、示范讲解、代码复核、润色优化、修改建议和阶段复盘。具体范围在确认服务前形成可核对的说明。"
        actions={
          <Link
            href="/consulting"
            className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-blue-950 hover:bg-amber-300"
          >
            提交问题摘要
          </Link>
        }
      />

      <section className="py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900"
            >
              <h2 className="text-xl font-black">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
                <strong>交付：</strong>
                {service.deliverable}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {[
          [
            '确认前需要明确',
            [
              '当前研究阶段与核心问题',
              '用户可提供的必要材料',
              '沟通方式与预计时间',
              '具体交付物和复查次数',
            ],
          ],
          [
            '材料与隐私',
            [
              '首次只提交问题摘要',
              '必要材料按约定方式传递',
              '联系方式与正文不进入分析事件',
              '页面案例仅使用已获授权内容',
            ],
          ],
          [
            '润色服务口径',
            [
              '明确篇幅和稿件阶段',
              '区分语言润色与结构优化',
              '说明目标学校或期刊格式',
              '交付修订痕迹和问题清单',
            ],
          ],
          [
            '服务完成标准',
            ['约定问题已逐项反馈', '交付文件版本清晰', '遗留问题有明确标注', '复查按确认次数完成'],
          ],
        ].map(([title, items]) => (
          <article
            key={title as string}
            className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-xl font-black">{title}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {(items as string[]).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  )
}
