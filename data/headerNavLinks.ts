import { consultingEnabled } from './siteFeatures'

const headerNavLinks = [
  { href: '/', title: '首页' },
  ...(consultingEnabled ? [{ href: '/consulting', title: '咨询辅导' }] : []),
]

export default headerNavLinks
