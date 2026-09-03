import ContactCards from '@/components/contact/ContactCards'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: '经管论文研究设计、Stata与论文润色一对一定制咨询',
  description:
    '通过微信或QQ直接联系，沟通经管论文选题、方法、变量数据、Stata代码、写作或润色优化一对一定制需求。',
})

export default function ConsultingPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '经管论文研究辅导与润色优化一对一定制咨询',
    description: metadata.description,
    provider: { '@type': 'Person', name: siteMetadata.author },
    areaServed: 'CN',
    serviceType: [
      '选题诊断',
      '实证方法辅导',
      'Stata代码复核',
      '论文写作反馈',
      '论文润色优化一对一定制',
    ],
    url: `${siteMetadata.siteUrl}/consulting/`,
  }

  return (
    <div className="py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ContactCards compact />
    </div>
  )
}
