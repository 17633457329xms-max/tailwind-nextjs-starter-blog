import Link from '@/components/Link'
import type { DisciplineArticle } from '@/data/disciplineArticles'
import type { DisciplineConfig } from '@/data/disciplines'
import type { KnowledgeStage } from '@/data/knowledgeArchitecture'
import type { AdvancedTopic } from '@/data/leafArticleViews'
import { getSpecialtyLeafArticles } from '@/data/leafArticleViews'
import { disciplineAdvancedPath, disciplineBeginnerPath } from '@/data/disciplineUrls'
import DisciplineArticleExplorer from './DisciplineArticleExplorer'
import LearningSidebar from './LearningSidebar'

const beginnerSections: Record<string, Array<[string, string]>> = {
  topic: [
    [
      '研究方向',
      '先从本专业常见研究对象、现实问题和已有积累中选定一个可持续阅读的方向。方向不是题目，先明确范围，再决定是否进入具体题目。',
    ],
    [
      '数据来源',
      '在确定题目前核对数据、案例、文本或公开材料是否真实可得，并记录口径、时间范围与获取路径。',
    ],
    [
      '题目收缩',
      '把宽泛主题收缩为研究对象、场景、时间范围和关键关系都清楚的问题，避免题目大于现有材料。',
    ],
    [
      '可行性判断',
      '逐项检查材料、方法、时间与个人能力是否匹配；任何一项没有把握，都应调整研究边界。',
    ],
    [
      '常见错误',
      '不要先套热门题目、先定结论或只看题目是否新颖。好的选题必须同时可研究、可获得证据、可完成。',
    ],
  ],
  proposal: [
    [
      '开题目标',
      '先让题目、研究问题和预期成果保持一致，开题报告的每一部分都服务于同一个研究目标。',
    ],
    ['文献与背景', '只保留能够说明问题重要性和研究缺口的背景与文献，不把材料堆成资料展览。'],
    ['研究设计', '写清研究对象、材料来源、研究方法和实施步骤，让导师能够判断方案能否执行。'],
    ['进度安排', '将阅读、材料整理、分析、写作和修改拆成可以核验的节点，并为反馈与返工预留时间。'],
    ['常见错误', '避免目标过多、方法与问题不匹配、材料来源不清或进度表只写空泛月份。'],
  ],
  literature: [
    [
      '从哪里查文献',
      '优先使用学校数据库、知网、万方、Google Scholar 和本专业权威期刊目录，记录检索式与筛选条件。',
    ],
    [
      '如何筛选文献',
      '先看研究问题、样本或材料、方法和结论，再决定是否精读；核心期刊不等于每篇都直接适合你的题目。',
    ],
    ['如何整理归类', '使用文献矩阵按主题、方法、数据、结论和局限性分类，避免只按作者或年份罗列。'],
    [
      '如何形成综述',
      '从研究脉络、分歧、证据强弱和不足写成论证，而不是“作者甲认为、作者乙认为”的堆砌。',
    ],
    ['常见错误', '不要把文献综述写成摘要合集，也不要把检索到的全部文献都放入正文。'],
  ],
}

function getBeginnerSections(stage: KnowledgeStage) {
  return (
    beginnerSections[stage.key] ?? [
      ['先明确当前产出', `先理解“${stage.title}”要解决什么问题，以及它与前后论文阶段如何衔接。`],
      ['准备材料', '列出已有材料、缺失材料与可获得来源，先验证材料，再安排具体操作。'],
      ['执行步骤', '按问题、证据、判断和表达的顺序推进，每一步留下可复核记录。'],
      ['质量自检', '从研究边界、证据来源、方法匹配和表达准确性四方面逐项检查。'],
      ['常见错误', '避免只套模板、跳过材料核对或把尚未证实的判断写成结论。'],
    ]
  )
}

function Breadcrumbs({
  discipline,
  specialty,
  stage,
  mode,
  topic,
}: {
  discipline: DisciplineConfig
  specialty: string
  stage: KnowledgeStage
  mode: 'beginner' | 'advanced'
  topic?: AdvancedTopic
}) {
  const stageHref = disciplineBeginnerPath(discipline.slug, specialty, stage.key)
  return (
    <nav className="mb-6 flex flex-wrap gap-x-2 gap-y-1 text-sm text-slate-500" aria-label="面包屑">
      <Link href="/">学科首页</Link>
      <span>/</span>
      <Link href={`/disciplines/${discipline.slug}`}>{discipline.name}</Link>
      <span>/</span>
      <Link href={disciplineBeginnerPath(discipline.slug, specialty)}>{specialty}</Link>
      <span>/</span>
      <Link href={stageHref}>{stage.title}</Link>
      <span>/</span>
      {mode === 'beginner' ? (
        <span>零基础入门</span>
      ) : (
        <>
          <Link href={disciplineAdvancedPath(discipline.slug, specialty, stage.key, topic!.key)}>
            进阶阅读
          </Link>
          <span>/</span>
          <span>{topic!.title}</span>
        </>
      )}
    </nav>
  )
}

export function BeginnerGuidePage({
  discipline,
  specialty,
  stage,
}: {
  discipline: DisciplineConfig
  specialty: string
  stage: KnowledgeStage
}) {
  const sections = getBeginnerSections(stage)
  return (
    <div className="py-8 sm:py-12">
      <Breadcrumbs discipline={discipline} specialty={specialty} stage={stage} mode="beginner" />
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <LearningSidebar
          discipline={discipline}
          specialty={specialty}
          selectedStage={stage.key}
          selectedMode="beginner"
        />
        <article className="min-w-0">
          <header className="border-y-2 py-10 sm:py-12" style={{ borderColor: discipline.color }}>
            <p className="text-xs font-black tracking-widest" style={{ color: discipline.color }}>
              零基础入门
            </p>
            <h1 className="mt-4 font-serif text-3xl leading-tight font-black sm:text-5xl">
              {specialty}
              {stage.title}从零开始：完整步骤与常见误区
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              这篇文章只服务于第一次处理“{specialty} · {stage.title}
              ”的同学。先理解该阶段要完成什么，再按目录逐步准备材料、做出判断并完成自检。
            </p>
          </header>
          <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {sections.map(([heading, content], index) => (
                <section id={`beginner-${index + 1}`} key={heading} className="scroll-mt-24">
                  <h2>{heading}</h2>
                  <p>{content}</p>
                  <p>
                    建议完成这一部分后，再进入“进阶阅读”查看更细的专题文章、案例、数据与操作方法。
                  </p>
                </section>
              ))}
            </div>
            <aside className="xl:order-last">
              <details
                open
                className="sticky top-24 border-y border-black/15 py-4 dark:border-white/15"
              >
                <summary className="cursor-pointer font-serif text-lg font-black">本文目录</summary>
                <ol className="mt-4 space-y-3 border-l border-black/15 pl-4 text-sm dark:border-white/15">
                  {sections.map(([heading], index) => (
                    <li key={heading}>
                      <a
                        href={`#beginner-${index + 1}`}
                        className="text-slate-600 hover:underline dark:text-slate-300"
                      >
                        {heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </aside>
          </div>
        </article>
      </div>
    </div>
  )
}

export function AdvancedReadingPage({
  discipline,
  articles,
  specialty,
  stage,
  topic,
}: {
  discipline: DisciplineConfig
  articles: DisciplineArticle[]
  specialty: string
  stage: KnowledgeStage
  topic: AdvancedTopic
}) {
  const task = stage.tasks.find((item) => item.key === topic.taskKey)!
  const topicArticles = getSpecialtyLeafArticles({
    articles,
    discipline,
    specialty,
    stage,
    task,
    themeIndex: topic.themeIndex,
  })
  return (
    <div className="py-8 sm:py-12">
      <Breadcrumbs
        discipline={discipline}
        specialty={specialty}
        stage={stage}
        mode="advanced"
        topic={topic}
      />
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <LearningSidebar
          discipline={discipline}
          specialty={specialty}
          selectedStage={stage.key}
          selectedMode="advanced"
          selectedTopic={topic.key}
        />
        <section className="min-w-0">
          <p className="text-xs font-black tracking-widest" style={{ color: discipline.color }}>
            进阶阅读
          </p>
          <h1 className="mt-3 font-serif text-3xl font-black sm:text-5xl">
            {specialty}
            {stage.title}：{topic.title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            围绕“{topic.title}”提供 50
            篇细分文章。零基础同学建议先阅读本阶段的完整入门文章，再按当前卡点进入具体专题。
          </p>
          <div className="mt-8">
            <DisciplineArticleExplorer
              articles={topicArticles}
              discipline={discipline}
              context={{
                specialty,
                stage: stage.key,
                task: task.key,
                topic: topic.key,
                mode: 'advanced',
              }}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
