import PageHero from '@/components/PageHero'
import ContactCards from '@/components/contact/ContactCards'
import Link from '@/components/Link'
import { genPageMetadata } from '@/app/seo'

export const metadata = genPageMetadata({
  title: '微信与QQ联系方式',
  description:
    '通过微信或QQ联系谢老师，咨询经管论文选题、实证方法、Stata代码、论文写作和润色优化问题。',
})

export default function ContactPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <PageHero
        eyebrow="微信与QQ联系"
        title="发送论文阶段和具体问题，沟通会更高效"
        description="添加好友时建议备注“学位阶段 + 研究方向”。首次只需提供问题摘要，不要直接发送包含个人敏感信息的完整材料。"
        actions={
          <Link
            href="/consulting"
            className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-blue-950 hover:bg-amber-300"
          >
            先填写问题摘要
          </Link>
        }
      />
      <section className="mx-auto max-w-5xl py-12">
        <ContactCards />
      </section>
    </div>
  )
}
