import type { DisciplineArticle, DisciplineArticleSection } from './disciplineArticles'
import type { DisciplineConfig } from './disciplines'
import type { KnowledgeStage, KnowledgeTask } from './knowledgeArchitecture'

// 每个三级任务拥有自己的内容主题，避免同一二级产出物下的两组卡片只替换简介或任务名称。
const taskThemes: Record<string, string[]> = {
  direction: [
    '研究对象与范围的收束',
    '问题意识到可答题目的转化',
    '概念组合与题目关键词',
    '对象、场景与分析单位的匹配',
    '研究问题与标题表述校验',
  ],
  feasibility: [
    '资料与数据可得性的预评估',
    '研究周期与工作量的测算',
    '方法适配与实施风险判断',
    '创新点的证据化定位',
    '备选方案与止损边界',
  ],
  background: [
    '现实情境与问题提出',
    '学术与实践价值的界定',
    '政策或行业背景的证据整理',
    '研究必要性的论证路径',
    '背景叙述的范围控制',
  ],
  framework: [
    '研究目标与任务链条',
    '核心概念与理论框架',
    '研究方法与技术路线',
    '进度安排与成果节点',
    '开题论证的风险预案',
  ],
  search: [
    '检索词与布尔式设计',
    '数据库范围与筛选规则',
    '高价值文献的初筛',
    '阅读笔记与编码体系',
    '引文追溯与文献补全',
  ],
  review: [
    '主题脉络与理论分歧',
    '研究方法的比较综述',
    '研究结论的证据权重',
    '研究空白的可辩护写法',
    '综述段落的论证衔接',
  ],
  method: [
    '研究问题与方法匹配',
    '样本与对象的选择',
    '识别、解释或比较路径',
    '变量、概念或编码方案',
    '研究伦理与可复核设计',
  ],
  materials: [
    '材料来源与纳入标准',
    '数据清洗与记录规范',
    '证据链与材料互证',
    '缺失与偏差的处理',
    '材料保存与可追溯性',
  ],
  chapters: [
    '章节论证主线',
    '段落主题句与证据',
    '理论与材料的衔接',
    '章节之间的逻辑过渡',
    '结论边界与表达克制',
  ],
  citation: [
    '图表信息与注释规范',
    '引文准确性与出处核验',
    '参考文献格式与一致性',
    '图片、表格与版权标注',
    '文献管理与交叉检查',
  ],
  editing: [
    '导师反馈的分类处理',
    '结构性问题的修改顺序',
    '语言精炼与术语一致',
    '论证跳跃与证据补足',
    '版本记录与最终核对',
  ],
  defense: [
    '答辩陈述的核心叙事',
    '研究贡献的三分钟表达',
    '高频质疑与回应证据',
    'PPT 的信息取舍与视觉层级',
    '现场表达与时间控制',
  ],
  software: [
    '软件安装与环境检查',
    '项目文件与目录管理',
    '常用功能的最小闭环',
    '数据、文献或材料的导入',
    '报错诊断与可复现实践',
  ],
  templates: [
    '提纲模板的定制使用',
    '研究记录表与进度表',
    '数据、材料或文献清单',
    '写作自检表与反馈表',
    '提交前的格式核验',
  ],
}

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
    const taskThemePool = taskThemes[task.key] ?? [task.title]
    const taskTheme = taskThemePool[index % taskThemePool.length]
    const focus = researchFocuses[index % researchFocuses.length]
    const lens = workingLenses[Math.floor(index / researchFocuses.length)]
    const sequence = index + 1
    return {
      ...source,
      sourceSlug: source.slug,
      leafIndex: sequence,
      specialties: [specialty],
      category: task.title,
      title: `${specialty}${stage.title}：${taskTheme}——${focus}（${lens}）`,
      summary: `围绕${specialty}在“${stage.title} · ${task.title}”阶段的“${taskTheme}”，用${lens}拆解${focus}、证据准备、操作步骤与质量自检。本篇为该细分路径第 ${sequence} 个独立学习切入点。`,
      tags: [specialty, stage.title, task.title, taskTheme, focus, lens],
      sections: makeSections(specialty, stage, task, focus, lens, sequence),
      readingMinutes: 10 + (index % 7),
      caseStudy: undefined,
      chart: undefined,
      codeExample: undefined,
    }
  })
}
