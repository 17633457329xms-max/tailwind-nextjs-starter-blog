import type { DisciplineArticle } from './disciplineArticles'

const generatedSlugPatterns = [
  /^guide-/,
  /-(topic|proposal|literature|design|drafting|revision|tools)-[^/]+-\d+$/,
  /-(research|methods|standards|specialties)-\d+$/,
]

export function isGeneratedDisciplineArticle(article: DisciplineArticle) {
  return generatedSlugPatterns.some((pattern) => pattern.test(article.slug))
}

export function disciplineArticleTextLength(article: DisciplineArticle) {
  return article.sections.reduce(
    (total, section) =>
      total +
      section.heading.length +
      section.paragraphs.join('').length +
      (section.bullets?.join('').length ?? 0) +
      (section.table?.rows.flat().join('').length ?? 0),
    0
  )
}

export function isIndexableDisciplineArticle(article: DisciplineArticle) {
  return (
    !isGeneratedDisciplineArticle(article) &&
    article.title.length >= 12 &&
    article.summary.length >= 30 &&
    article.sections.length >= 2 &&
    disciplineArticleTextLength(article) >= 450
  )
}

export function buildContentQualityAudit(articles: DisciplineArticle[]) {
  const generated = articles.filter(isGeneratedDisciplineArticle)
  const indexable = articles.filter(isIndexableDisciplineArticle)
  const editorialButInsufficient = articles.filter(
    (article) => !isGeneratedDisciplineArticle(article) && !isIndexableDisciplineArticle(article)
  )

  return {
    generatedAt: new Date().toISOString(),
    totalDisciplineArticles: articles.length,
    indexableEditorialArticles: indexable.length,
    generatedTemplateArticles: generated.length,
    editorialButInsufficient: editorialButInsufficient.length,
    excludedFromSearchAndSitemap: generated.length + editorialButInsufficient.length,
    qualityRules: {
      generatedTemplatesExcluded: true,
      minimumTitleCharacters: 12,
      minimumSummaryCharacters: 30,
      minimumSections: 2,
      minimumBodyCharacters: 450,
    },
    editorialButInsufficientSlugs: editorialButInsufficient.map((article) => article.slug),
  }
}
