import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import { mkdirSync, writeFileSync } from 'fs'
import readingTime from 'reading-time'
import path from 'path'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import { disciplineArticles } from './data/disciplineArticles'
import { buildContentQualityAudit, isIndexableDisciplineArticle } from './data/contentQuality'
import { isPublicDiscipline } from './data/disciplines'

const headingIcon = fromHtmlIsomorphic(
  `<span class="content-header-link" aria-hidden="true">#</span>`,
  { fragment: true }
)

function createSearchIndex(allKnowledge) {
  if (
    siteMetadata.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    const disciplineDocuments = disciplineArticles
      .filter(
        (article) => isPublicDiscipline(article.discipline) && isIndexableDisciplineArticle(article)
      )
      .map((article) => ({
        title: article.title,
        date: article.date,
        summary: article.summary,
        category: article.category,
        tags: article.tags,
        difficulty: article.difficulty,
        slug: article.slug,
        path: `disciplines/${article.discipline}/${article.slug}`,
      }))
    writeFileSync(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify([...allCoreContent(sortPosts(allKnowledge)), ...disciplineDocuments])
    )
    mkdirSync('reports', { recursive: true })
    writeFileSync(
      'reports/content-quality-audit.json',
      JSON.stringify(buildContentQualityAudit(disciplineArticles), null, 2)
    )
    console.log('Knowledge search index generated...')
  }
}

export const Knowledge = defineDocumentType(() => ({
  name: 'Knowledge',
  filePathPattern: 'knowledge/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    summary: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    stage: { type: 'list', of: { type: 'string' }, default: [] },
    difficulty: { type: 'string', default: '入门' },
    draft: { type: 'boolean', default: false },
    references: { type: 'list', of: { type: 'string' }, default: [] },
  },
  computedFields: {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').at(-1),
    },
    path: {
      type: 'string',
      resolve: (doc) => `${doc.category}/${doc._raw.flattenedPath.split('/').at(-1)}`,
    },
    filePath: { type: 'string', resolve: (doc) => doc._raw.sourceFilePath },
    toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
    structuredData: {
      type: 'json',
      resolve: (doc) => {
        const slug = doc._raw.flattenedPath.split('/').at(-1)
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: doc.title,
          description: doc.summary,
          datePublished: doc.date,
          dateModified: doc.lastmod || doc.date,
          inLanguage: 'zh-CN',
          author: { '@type': 'Person', name: siteMetadata.author },
          publisher: { '@type': 'Person', name: siteMetadata.author },
          mainEntityOfPage: `${siteMetadata.siteUrl}/${doc.category}/${slug}`,
          url: `${siteMetadata.siteUrl}/${doc.category}/${slug}`,
        }
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Knowledge],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: { className: ['content-header'] },
          content: headingIcon,
        },
      ],
      rehypeKatex,
      rehypeKatexNoTranslate,
      [rehypePrismPlus, { defaultLanguage: 'text', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allKnowledge } = await importData()
    createSearchIndex(allKnowledge)
  },
})
