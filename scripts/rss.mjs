import { writeFileSync } from 'fs'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import { allKnowledge } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

const itemXml = (item) => `
  <item>
    <guid>${siteMetadata.siteUrl}/${item.path}</guid>
    <title>${escape(item.title)}</title>
    <link>${siteMetadata.siteUrl}/${item.path}</link>
    <description>${escape(item.summary)}</description>
    <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    ${item.tags.map((tag) => `<category>${escape(tag)}</category>`).join('')}
  </item>`

export default function rss() {
  const items = sortPosts(allKnowledge.filter((item) => !item.draft))
  if (!items.length) return
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>zh-CN</language>
      <lastBuildDate>${new Date(items[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
      ${items.map(itemXml).join('')}
    </channel>
  </rss>`
  writeFileSync(`./${outputFolder}/feed.xml`, xml)
  console.log('Knowledge RSS feed generated...')
}
