import 'css/prism.css'
import 'katex/dist/katex.css'

import { allKnowledge, type Knowledge } from 'contentlayer/generated'
import { coreContent, allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { categories, isCategorySlug } from '@/data/knowledgeData'
import { genPageMetadata } from '@/app/seo'
import KnowledgeCard from '@/components/knowledge/KnowledgeCard'
import ArticleToc from '@/components/knowledge/ArticleToc'
import Link from '@/components/Link'
import { notFound } from 'next/navigation'

export const generateStaticParams = () =>
  allKnowledge
    .filter((item) => !item.draft)
    .map((item) => ({
      category: item.category,
      slug: item.slug,
    }))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const item = allKnowledge.find((entry) => entry.category === category && entry.slug === slug)
  if (!item) return {}
  return genPageMetadata({ title: item.title, description: item.summary })
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  if (!isCategorySlug(category)) notFound()
  const item = allKnowledge.find(
    (entry) => entry.category === category && entry.slug === slug && !entry.draft
  ) as Knowledge | undefined
  if (!item) notFound()

  const related = allCoreContent(
    sortPosts(
      allKnowledge.filter(
        (entry) => entry.category === category && entry.slug !== slug && !entry.draft
      )
    )
  ).slice(0, 3)
  const content = coreContent(item)
  const categoryConfig = categories[category]
  const tocItems = (item.toc || []).filter((entry) => entry.depth === 2 || entry.depth === 3)
  const showToc = tocItems.length >= 6

  return (
    <div className="pt-8 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(item.structuredData),
        }}
      />
      <nav className="mb-6 text-sm text-slate-500" aria-label="面包屑">
        <Link href="/" className="hover:text-slate-950 dark:hover:text-white">
          首页
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${category}`} className={`font-bold ${categoryConfig.theme.cardLink}`}>
          {categoryConfig.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-300">正文</span>
      </nav>

      <article>
        <header
          className={`relative border-y-2 border-slate-950 px-6 py-10 sm:px-10 sm:py-14 dark:border-slate-200 ${categoryConfig.theme.surface}`}
        >
          <span className={`absolute top-0 left-0 h-1.5 w-28 ${categoryConfig.theme.cardRule}`} />
          <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold">
            <span className={`px-3 py-1.5 ${categoryConfig.theme.cardBadge}`}>
              {categoryConfig.name}
            </span>
            <span className="border border-black/10 px-3 py-1.5 text-slate-600 dark:border-white/15 dark:text-slate-300">
              {item.difficulty}
            </span>
          </div>
          <h1 className="max-w-5xl font-serif text-3xl leading-tight font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            {item.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            {item.summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>作者：谢老师</span>
            <time dateTime={item.date}>首次发布：{item.date.slice(0, 10)}</time>
            {item.lastmod && item.lastmod.slice(0, 10) !== item.date.slice(0, 10) && (
              <time dateTime={item.lastmod}>最近更新：{item.lastmod.slice(0, 10)}</time>
            )}
            <span>约 {Math.max(1, Math.ceil(item.readingTime.minutes))} 分钟阅读</span>
          </div>
        </header>

        <div
          className={`mx-auto py-12 ${showToc ? 'max-w-6xl xl:grid xl:grid-cols-[14rem_minmax(0,48rem)] xl:gap-14' : 'max-w-4xl'}`}
        >
          {showToc && <ArticleToc items={tocItems} />}
          <div>
            {showToc && <ArticleToc items={tocItems} mobile />}
            <div className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-24 max-w-none">
              <MDXLayoutRenderer code={item.body.code} components={components} toc={item.toc} />
            </div>
            <div className={`mt-12 border p-6 ${categoryConfig.theme.cta}`}>
              <h2 className="text-lg font-black text-slate-950 dark:text-white">
                需要结合你的论文具体判断？
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                提交研究阶段、当前问题和已有方法情况，先进行问题分类，再确认适合单次诊断、论文润色一对一定制还是阶段辅导。
              </p>
              <Link
                href="/consulting"
                className={`mt-4 inline-flex font-bold hover:underline ${categoryConfig.theme.cardLink}`}
              >
                提交问题摘要 →
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-slate-200 py-12 dark:border-slate-800">
          <h2 className="mb-6 font-serif text-2xl font-black">继续阅读</h2>
          <div className="grid border-t border-l border-black/10 md:grid-cols-3 dark:border-white/10">
            {related.map((entry) => (
              <KnowledgeCard key={entry.path} item={entry} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
