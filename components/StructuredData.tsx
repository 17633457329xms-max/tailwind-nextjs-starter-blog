import siteMetadata from '@/data/siteMetadata'

/**
 * 站点主体与作者实体。
 * AI 引用与搜索结果中的品牌识别都依赖这个实体定义。
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    inLanguage: 'zh-CN',
    founder: personJsonLd(),
    knowsAbout: ['论文选题', '研究方法', '文献检索', '论文写作', '论文润色'],
  }
}

/** 作者实体，供 Organization 与 Article 共用。 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
  }
}

export interface BreadcrumbItem {
  name: string
  /** 站点内相对路径，首页传空字符串；无独立路由的中间层级留空。 */
  path?: string
}

/** 面包屑结构化数据，与页面可见导航一致。中间层级无独立路由时省略 item。 */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path === undefined ? {} : { item: `${siteMetadata.siteUrl}${item.path}` }),
    })),
  }
}

export interface ArticleJsonLdInput {
  title: string
  summary: string
  path: string
  date?: string
  lastmod?: string
}

/** 文章结构化数据，供学科文章页与叶子文章页使用。 */
export function articleJsonLd({ title, summary, path, date, lastmod }: ArticleJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    datePublished: date,
    dateModified: lastmod || date,
    inLanguage: 'zh-CN',
    author: { '@type': 'Person', name: siteMetadata.author },
    publisher: { '@type': 'Person', name: siteMetadata.author },
    mainEntityOfPage: `${siteMetadata.siteUrl}${path}`,
  }
}

/** 服务结构化数据，供服务说明类页面使用。 */
export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    serviceType: '论文写作与研究辅导',
    inLanguage: 'zh-CN',
    provider: { '@type': 'Person', name: siteMetadata.author },
    areaServed: 'CN',
    url: `${siteMetadata.siteUrl}${input.path}`,
  }
}

/** 统一渲染 JSON-LD 脚本标签。 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
