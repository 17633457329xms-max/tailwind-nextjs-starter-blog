import PageHero from '@/components/PageHero'
import { genPageMetadata } from '@/app/seo'

export const metadata = genPageMetadata({
  title: '隐私说明',
  description: '说明谢老师讲论文网站在咨询表单、访问统计和联系方式中的信息收集、使用和保护方式。',
  robots: { index: true, follow: true },
})

export default function PrivacyPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <PageHero
        eyebrow="隐私说明"
        title="只收集完成咨询所需的必要信息"
        description="本页说明咨询表单、访问统计和联系方式使用中的信息处理方式。正式域名上线时将补充主体信息、联系渠道和具体保存期限。"
      />
      <article className="prose prose-slate dark:prose-invert mx-auto max-w-4xl py-12">
        <h2>咨询表单收集的信息</h2>
        <p>
          咨询表单收集学科方向、学位阶段、研究阶段、服务类型、问题摘要和用户主动提供的联系方式，用于判断问题类型和后续联系。
        </p>
        <h2>首次沟通的材料原则</h2>
        <p>
          首次只需提交问题摘要。确认服务后，再通过双方约定的方式交换完成服务所需的材料，并尽量减少与问题无关的个人信息。
        </p>
        <h2>访问统计</h2>
        <p>
          网站可能使用自托管访问统计记录页面访问、来源、咨询按钮、二维码查看和表单结果等事件。统计事件不应携带姓名、微信号、QQ号、论文标题、正文或原始数据。
        </p>
        <h2>信息保存与通知</h2>
        <p>
          咨询通知通道由网站所有者配置。未配置通知通道时，表单只完成本地字段校验，并提示用户继续通过微信或QQ联系。
        </p>
        <h2>用户选择</h2>
        <p>
          用户可以选择不提交表单，直接通过页面展示的微信或QQ二维码联系。涉及材料删除、更正或咨询记录的问题，可通过相同联系方式提出。
        </p>
        <p className="text-sm text-slate-500">最后更新：2026年8月26日</p>
      </article>
    </div>
  )
}
