/** @type {import('pliny/config').PlinyConfig} */
const siteMetadata = {
  title: '谢老师讲论文',
  author: '谢老师',
  headerTitle: '谢老师讲论文',
  description:
    '面向国内学生的多学科论文研究辅导与润色优化一对一定制网站，提供选题、研究方法、文献检索、论文写作与格式优化内容。',
  language: 'zh-CN',
  theme: 'light',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteRepo: '',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.svg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/social-card.svg`,
  email: '',
  locale: 'zh-CN',
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
      src: process.env.NEXT_PUBLIC_UMAMI_SRC,
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
