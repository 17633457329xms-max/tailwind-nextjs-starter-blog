import siteMetadata from '@/data/siteMetadata'
import { disciplines, publicDisciplineOrder } from '@/data/disciplines'
import { disciplineSpecialties } from '@/data/specialties'
import { disciplineLibraryPath } from '@/data/disciplineUrls'

export const dynamic = 'force-static'

/**
 * 供 AI 爬虫与检索系统读取的站点导航文件（llms.txt 约定）。
 * 用 route 而非 public 静态文件，避免受 middleware 白名单影响。
 */
export function GET() {
  const lines = [
    `# ${siteMetadata.title}`,
    '',
    `> ${siteMetadata.description}`,
    '',
    '本站面向硕士与本科阶段学生，提供经管等一级学科的论文选题、研究方法、',
    '文献检索、变量与数据、Stata 实操与论文写作规范等知识内容，',
    '以及论文润色优化一对一定制服务。内容持续核验与更新。',
    '',
    '## 主要内容',
    '',
  ]

  for (const slug of publicDisciplineOrder) {
    const item = disciplines[slug]
    lines.push(`### ${item.name}（${item.english}）`)
    lines.push('')
    lines.push(`- 学科主页：${siteMetadata.siteUrl}/disciplines/${slug}`)
    lines.push(`- ${item.statement}`)
    for (const specialty of disciplineSpecialties[slug]) {
      lines.push(
        `- ${specialty.name}：${siteMetadata.siteUrl}${disciplineLibraryPath(slug, specialty.name)}`
      )
    }
    lines.push('')
  }

  lines.push('## 服务与说明', '')
  lines.push(`- 论文润色优化一对一定制：${siteMetadata.siteUrl}/polishing`)
  lines.push(`- 服务说明与交付标准：${siteMetadata.siteUrl}/service-standards`)
  lines.push(`- 关于本站：${siteMetadata.siteUrl}/about`)
  lines.push(`- 隐私说明：${siteMetadata.siteUrl}/privacy`)
  lines.push('')

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
