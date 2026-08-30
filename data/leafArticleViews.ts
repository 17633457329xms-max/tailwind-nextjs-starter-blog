import type { DisciplineArticle, DisciplineArticleSection } from './disciplineArticles'
import type { DisciplineConfig } from './disciplines'
import type { KnowledgeStage, KnowledgeTask } from './knowledgeArchitecture'

const researchFocuses = [
  '研究对象与分析单元',
  '核心概念与边界',
  '现实问题与研究缺口',
  '研究问题的层级化表达',
  '关键变量、材料与证据',
  '理论机制与解释链条',
  '研究范围、时间与场景',
  '比较对象与反例检验',
  '可操作步骤与时间安排',
  '质量风险与自检节点',
]

const workingLenses = ['入门操作', '案例拆解', '证据核验', '常见误区修正', '进阶推演']

function makeSections(
  specialty: string,
  stage: KnowledgeStage,
  task: KnowledgeTask,
  focus: string,
  lens: string,
  number: number
): DisciplineArticleSection[] {
  return [
    {
      heading: `先把“${specialty}”限定为可研究的问题`,
      paragraphs: [
        `第 ${number} 篇专门服务于“${specialty} · ${stage.title} · ${task.title}”。先写清研究对象、情境、时间范围与分析单位，再决定资料、方法和章节安排；不要把一级学科的宽泛表述直接搬进题目。`,
        `本篇聚焦“${focus}”。一个可推进的表述应让读者看得出：你研究的究竟是${specialty}中的哪类现象，为什么值得研究，以及结论准备回答到什么边界。`,
      ],
      bullets: [
        `用一句话写出${specialty}的具体对象与场景。`,
        `用一个可核验的材料、数据、文本或案例说明证据来源。`,
        `明确本篇只处理“${task.title}”这一项产出，不把后续工作提前混入。`,
      ],
    },
    {
      heading: `${lens}：把任务拆成能执行的步骤`,
      paragraphs: [
        `第一步是列出已有材料与缺口；第二步是按“问题—证据—判断”顺序组织；第三步是用反例或边界条件检查结论。对于${specialty}，材料是否真实、口径是否一致、过程能否复查，比堆砌术语更重要。`,
        `建议每完成一个小步骤就留下选择依据，例如检索式、数据字段说明、访谈提纲版本、代码环境或导师反馈。这样在${stage.title}的后续修改中，能够说明每项判断从何而来。`,
      ],
    },
    {
      heading: `完成“${task.title}”前的自检清单`,
      paragraphs: [
        `回到题目核对：内容是否仍然围绕${specialty}，是否出现了被其他专业替换也成立的空泛表述。再核对证据：每一个关键判断是否能追溯到公开资料、原始材料、数据处理过程或规范文献。`,
        `最后检查表达：结论强度要与材料强度相匹配。证据只能支持关联、描述或解释时，应如实限定，不把研究范围之外的判断写成普遍结论。`,
      ],
    },
  ]
}

/**
 * 为当前“专业 × 二级产出物 × 三级任务”构建独立文章池。
 * 文章不跨专业复用展示；每个末级节点固定提供 50 篇不同标题、简介和学习切入点。
 */
export function getSpecialtyLeafArticles({
  articles,
  discipline,
  specialty,
  stage,
  task,
}: {
  articles: DisciplineArticle[]
  discipline: DisciplineConfig
  specialty: string
  stage: KnowledgeStage
  task: KnowledgeTask
}): DisciplineArticle[] {
  const sourcePool = articles.filter(
    (article) => article.knowledgeStage === stage.key && article.knowledgeTask === task.key
  )
  const fallbackPool = sourcePool.length ? sourcePool : articles

  return Array.from({ length: 50 }, (_, index) => {
    const source = fallbackPool[index % fallbackPool.length]
    const focus = researchFocuses[index % researchFocuses.length]
    const lens = workingLenses[Math.floor(index / researchFocuses.length)]
    const sequence = index + 1
    return {
      ...source,
      sourceSlug: source.slug,
      leafIndex: sequence,
      specialties: [specialty],
      category: task.title,
      title: `${specialty}${stage.title}：${focus}的${lens}`,
      summary: `围绕${specialty}在“${stage.title} · ${task.title}”阶段的${focus}，用${lens}拆解对象限定、证据准备、操作步骤与质量自检。本篇为该细分路径第 ${sequence} 个独立学习切入点。`,
      tags: [specialty, stage.title, task.title, focus, lens],
      sections: makeSections(specialty, stage, task, focus, lens, sequence),
      readingMinutes: 10 + (index % 7),
      caseStudy: undefined,
      chart: undefined,
      codeExample: undefined,
    }
  })
}
