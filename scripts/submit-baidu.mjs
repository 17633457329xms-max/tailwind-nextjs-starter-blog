import { allKnowledge } from '../.contentlayer/generated/index.mjs'

const site = process.env.BAIDU_SITE
const token = process.env.BAIDU_PUSH_TOKEN

if (!site || !token) {
  throw new Error('请先配置 BAIDU_SITE 和 BAIDU_PUSH_TOKEN。')
}

const origin = site.startsWith('http')
  ? site.replace(/\/$/, '')
  : `https://${site.replace(/\/$/, '')}`
const urls = allKnowledge.filter((item) => !item.draft).map((item) => `${origin}/${item.path}`)

const endpoint = `https://data.zz.baidu.com/urls?site=${encodeURIComponent(site)}&token=${encodeURIComponent(token)}`
const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'content-type': 'text/plain' },
  body: urls.join('\n'),
})
const result = await response.text()

if (!response.ok) {
  throw new Error(`百度链接提交失败：${response.status} ${result}`)
}

console.log(`已提交 ${urls.length} 个URL：${result}`)
