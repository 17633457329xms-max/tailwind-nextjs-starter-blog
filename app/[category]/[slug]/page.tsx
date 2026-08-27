import 'css/prism.css'
import 'katex/dist/katex.css'

import { allKnowledge, type Knowledge } from 'contentlayer/generated'
import { coreContent, allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import { categories, isCategorySlug } from '@/data/knowledgeData'
import { genPageMetadata } from '@/app/seo'
import KnowledgeCard from '@/components/knowledge/KnowledgeCard'
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

  return (
    <div className="pt-8 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(item.structuredData) }}
      />
      <nav className="mb-6 text-sm text-slate-500" aria-label="面包屑">
        <Link href="/" className="hover:text-blue-700">
          首页
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${category}`} className="hover:text-blue-700">
          {categories[category].name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-300">正文</span>
      </nav>

      <article>
        <header className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 sm:px-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
              {categories[category].name}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {item.difficulty}
            </span>
          </div>
          <h1 className="max-w-4xl text-3xl leading-tight font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
            {item.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            {item.summary}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span>作者：谢老师</span>
            <time dateTime={item.date}>发布：{item.date.slice(0, 10)}</time>
            <time dateTime={item.lastmod || item.date}>
              核验：{(item.lastmod || item.date).slice(0, 10)}
            </time>
            <span>约 {item.readingTime.text.replace('min read', '分钟')}</span>
          </div>
        </header>

        <div className="mx-auto max-w-4xl py-12">
          <div className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-blue-700 max-w-none">
            <MDXLayoutRenderer code={item.body.code} components={components} toc={item.toc} />
          </div>
          <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
            <h2 className="text-lg font-black text-slate-950 dark:text-white">
              需要结合你的论文具体判断？
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
              提交研究阶段、当前问题和已有方法情况，先进行问题分类，再确认适合单次诊断、论文润色还是阶段辅导。
            </p>
            <Link
              href="/consulting"
              className="mt-4 inline-flex font-bold text-blue-800 hover:underline dark:text-blue-300"
            >
              提交问题摘要 →
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-slate-200 py-12 dark:border-slate-800">
          <h2 className="mb-6 text-2xl font-black">继续阅读</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((entry) => (
              <KnowledgeCard key={entry.path} item={entry} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
