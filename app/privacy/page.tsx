import PageHero from '@/components/PageHero'
import { genPageMetadata } from '@/app/seo'

export const metadata = genPageMetadata({
  title: '隐私说明',
  description: '说明谢老师讲论文网站的匿名访问统计与微信、QQ直接联系入口的使用方式。',
  robots: { index: true, follow: true },
})

export default function PrivacyPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <PageHero
        eyebrow="隐私说明"
        title="只收集完成咨询所需的必要信息"
        description="本站不设在线咨询表单；本页说明匿名访问统计与微信、QQ直接联系入口的使用方式。正式域名上线时将补充主体信息、联系渠道和具体保存期限。"
      />
      <article className="prose prose-slate dark:prose-invert mx-auto max-w-4xl py-12">
        <h2>站内不收集咨询信息</h2>
        <p>
          本站不提供在线咨询表单，也不在站内收集姓名、微信号、QQ号、邮箱、论文正文或研究数据。需要联系时，用户可自行通过页面展示的微信或QQ直接发起沟通。
        </p>
        <h2>直接联系的材料原则</h2>
        <p>
          首次沟通建议仅说明研究阶段、方向和问题类型，不发送完整论文、原始数据或与问题无关的个人信息。后续如确有必要交换材料，应由双方在直接沟通中另行确认范围与方式。
        </p>
        <h2>访问统计</h2>
        <p>
          网站可能使用匿名访问统计记录页面访问、来源、文章阅读、咨询入口点击和二维码查看等事件。统计事件不应携带姓名、微信号、QQ号、邮箱、论文标题、正文或原始数据。
        </p>
        <h2>站内数据保存</h2>
        <p>
          因本站不设咨询表单，不保存在线咨询记录或联系人数据库。网站所有者应仅在必要范围内处理用户通过微信、QQ主动发送的信息，并避免将相关内容用于公开展示或统计分析。
        </p>
        <h2>用户选择</h2>
        <p>
          用户可以选择不联系。涉及其主动发送材料的删除、更正或沟通记录问题，可通过相同微信或QQ联系方式提出。
        </p>
        <p className="text-sm text-slate-500">最后更新：2026年8月26日</p>
      </article>
    </div>
  )
}
