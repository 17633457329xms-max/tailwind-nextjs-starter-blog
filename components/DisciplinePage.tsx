import Link from '@/components/Link'
import type { DisciplineConfig } from '@/data/disciplines'
import type { DisciplineArticle } from '@/data/disciplineArticles'
import { getKnowledgeStages, getKnowledgeTask } from '@/data/knowledgeArchitecture'
import { getSpecialtyLeafArticles } from '@/data/leafArticleViews'
import DisciplineArticleExplorer from './discipline/DisciplineArticleExplorer'
import KnowledgeSidebar from './discipline/KnowledgeSidebar'

export default function DisciplinePage({
  discipline,
  articles,
  specialty,
  stageKey,
  taskKey,
}: {
  discipline: DisciplineConfig
  articles: DisciplineArticle[]
  specialty: string
  stageKey?: string
  taskKey?: string
}) {
  const activeTask = getKnowledgeTask(discipline.slug, stageKey, taskKey)
  const specialtyArticles = articles.filter((article) => article.specialties?.includes(specialty))
  const visibleArticles = activeTask
    ? getSpecialtyLeafArticles({
        articles: specialtyArticles,
        discipline,
        specialty,
        stage: activeTask.stage,
        task: activeTask.task,
      })
    : specialtyArticles
  const articleLibraryTitle = activeTask
    ? `${specialty} · ${activeTask.stage.title} · ${activeTask.task.title}`
    : `${specialty}论文知识库`
  const articleLibraryDescription = activeTask
    ? `${activeTask.task.description} 当前知识库提供 ${visibleArticles.length} 篇仅属于“${specialty} · ${activeTask.stage.title} · ${activeTask.task.title}”的细分文章，覆盖学习步骤、公开资料、常见误区与自检清单。`
    : `从论文选题到答辩准备，按需要完成的产出物进入对应知识库。每个三级栏目均提供不少于 20 篇学习文章。`
  return (
    <div className="py-10 sm:py-14">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/">学科首页</Link>
        <span className="mx-2">/</span>
        <Link href={`/disciplines/${discipline.slug}`}>{discipline.name}</Link>
        <span className="mx-2">/</span>
        <span>{specialty}</span>
        {activeTask && (
          <>
            <span className="mx-2">/</span>
            <span>{activeTask.stage.title}</span>
            <span className="mx-2">/</span>
            <span>{activeTask.task.title}</span>
          </>
        )}
      </nav>
      <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <KnowledgeSidebar
          discipline={discipline}
          specialty={specialty}
          selectedStage={stageKey}
          selectedTask={taskKey}
        />
        <section className="border-b border-black/15 pb-12 dark:border-white/15">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p
                className="text-xs font-black tracking-[0.18em]"
                style={{ color: discipline.color }}
              >
                {activeTask ? activeTask.stage.title : '深度内容库'}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-black">{articleLibraryTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                {articleLibraryDescription}
              </p>
            </div>
            <p className="text-sm font-black text-slate-500">
              {activeTask ? `当前 ${visibleArticles.length} 篇` : `共 ${articles.length} 篇`} ·
              持续更新
            </p>
          </div>
          <DisciplineArticleExplorer
            articles={visibleArticles}
            discipline={discipline}
            context={{ specialty, stage: activeTask?.stage.key, task: activeTask?.task.key }}
          />
        </section>
      </div>
      <section
        className="mt-10 grid gap-8 border p-8 lg:grid-cols-[1fr_auto] lg:items-center"
        style={{ borderColor: discipline.color }}
      >
        <div>
          <h2 className="font-serif text-2xl font-black">
            {activeTask ? `${activeTask.task.title}学习支持` : `${discipline.name}论文学习支持`}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {activeTask
              ? `如果你在“${activeTask.stage.title} · ${activeTask.task.title}”中遇到具体卡点，可通过微信或QQ说明你的研究方向、已有材料和希望解决的问题，再确认学习辅导或论文润色优化一对一定制的范围。`
              : '通过微信或QQ简要说明培养层次、研究方向和当前卡点，再确认选题诊断、方法辅导、写作反馈或论文润色优化一对一定制的范围。'}
          </p>
        </div>
        <Link
          href={`/disciplines/${discipline.slug}/consulting`}
          className="px-6 py-3 text-sm font-black text-white"
          style={{ backgroundColor: discipline.color }}
        >
          微信、QQ咨询
        </Link>
      </section>
    </div>
  )
}
