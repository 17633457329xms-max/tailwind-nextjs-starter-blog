import type { DisciplineSlug } from './disciplines'

export type KnowledgeStageKey =
  | 'topic'
  | 'proposal'
  | 'literature'
  | 'design'
  | 'drafting'
  | 'revision'
  | 'tools'

export interface KnowledgeTask {
  key: string
  title: string
  description: string
}

export interface KnowledgeStage {
  key: KnowledgeStageKey
  title: string
  description: string
  tasks: KnowledgeTask[]
}

const disciplineTerms: Record<
  DisciplineSlug,
  { object: string; method: string; evidence: string; tool: string }
> = {
  economics: {
    object: '经济现象与政策问题',
    method: '实证识别',
    evidence: '公开统计与微观数据',
    tool: 'Stata、Python与数据处理',
  },
  management: {
    object: '组织与企业管理问题',
    method: '案例、问卷与实证分析',
    evidence: '企业资料、调查数据与公开数据库',
    tool: 'Stata、SPSS与问卷工具',
  },
  law: {
    object: '规范争点与制度问题',
    method: '法解释、案例与比较研究',
    evidence: '法条、裁判文书与权威资料',
    tool: '法源检索与案例整理工具',
  },
  philosophy: {
    object: '概念、论证与思想史问题',
    method: '概念分析与文本阐释',
    evidence: '原典、版本与学术论争',
    tool: '原典检索与文献笔记工具',
  },
  history: {
    object: '历史事件、制度与行动者问题',
    method: '史料批判与历史解释',
    evidence: '档案、地方志与历史文献',
    tool: '档案检索与史料管理工具',
  },
  education: {
    object: '教育现象与学习问题',
    method: '问卷、访谈与混合研究',
    evidence: '量表、访谈与教育统计资料',
    tool: 'SPSS、NVivo与问卷工具',
  },
  literature: {
    object: '文本、媒介与文学史问题',
    method: '文本细读与理论阐释',
    evidence: '原始文本、版本与批评资料',
    tool: '语料、引文与文献管理工具',
  },
  'computer-science': {
    object: '计算任务与技术问题',
    method: '算法、实验与系统评估',
    evidence: '数据集、代码与实验记录',
    tool: 'Python、Git与实验环境',
  },
  transportation: {
    object: '交通运行与规划问题',
    method: '调查、模型与政策评估',
    evidence: '时空数据、调查资料与行业统计',
    tool: 'Python、GIS与交通仿真工具',
  },
  art: {
    object: '作品、媒介与创作实践问题',
    method: '作品分析与实践研究',
    evidence: '作品图录、田野材料与创作档案',
    tool: '图像整理与创作档案工具',
  },
  marxism: {
    object: '理论命题与现实治理问题',
    method: '文本、政策与调查研究',
    evidence: '经典文本、政策资料与调查材料',
    tool: '政策检索与文本分析工具',
  },
}

export function getKnowledgeStages(discipline: DisciplineSlug): KnowledgeStage[] {
  const terms = disciplineTerms[discipline]
  return [
    {
      key: 'topic',
      title: '论文选题',
      description: `把${terms.object}收束为可研究、可完成的题目。`,
      tasks: [
        {
          key: 'direction',
          title: '研究方向与题目',
          description: '确定研究对象、核心概念与题目边界。',
        },
        {
          key: 'feasibility',
          title: '可行性与创新点',
          description: '检查资料、时间、方法与创新空间。',
        },
      ],
    },
    {
      key: 'proposal',
      title: '开题报告',
      description: '把题目转化为能够说明问题、路径和进度的开题文本。',
      tasks: [
        {
          key: 'background',
          title: '背景、问题与价值',
          description: '写清现实或理论背景、研究问题和价值。',
        },
        {
          key: 'framework',
          title: '框架、方法与计划',
          description: '形成章节框架、研究路线和可执行进度。',
        },
      ],
    },
    {
      key: 'literature',
      title: '文献综述',
      description: '从文献发现走向研究脉络、争议与研究空白。',
      tasks: [
        {
          key: 'search',
          title: '检索、阅读与整理',
          description: '构造检索式，建立阅读卡和分类规则。',
        },
        {
          key: 'review',
          title: '综述结构与研究空白',
          description: '形成概念谱系、观点分歧与研究缺口。',
        },
      ],
    },
    {
      key: 'design',
      title: '研究设计',
      description: `匹配${terms.method}与${terms.evidence}，让研究路径可检验。`,
      tasks: [
        {
          key: 'method',
          title: '方法方案与研究路径',
          description: `选择${terms.method}并明确适用边界。`,
        },
        {
          key: 'materials',
          title: '数据、材料与证据',
          description: `确认${terms.evidence}的来源、口径和处理方式。`,
        },
      ],
    },
    {
      key: 'drafting',
      title: '论文正文',
      description: '把研究过程组织成清楚、可核验、可阅读的论文文本。',
      tasks: [
        {
          key: 'chapters',
          title: '章节结构与段落论证',
          description: '安排章节功能，写出有证据支撑的段落。',
        },
        {
          key: 'citation',
          title: '图表、引文与参考文献',
          description: '规范呈现图表、引文、注释和参考文献。',
        },
      ],
    },
    {
      key: 'revision',
      title: '修改与答辩',
      description: '针对反馈完成逻辑修订、表达优化和答辩准备。',
      tasks: [
        {
          key: 'editing',
          title: '修改反馈与质量检查',
          description: '处理导师反馈，检查论证、证据和表达。',
        },
        {
          key: 'defense',
          title: '答辩PPT与问题准备',
          description: '提炼研究贡献，准备答辩展示和追问。',
        },
      ],
    },
    {
      key: 'tools',
      title: '工具与模板',
      description: `使用${terms.tool}降低研究过程中的重复劳动。`,
      tasks: [
        {
          key: 'software',
          title: '常用工具与入门',
          description: `掌握${terms.tool}的基础工作流。`,
        },
        {
          key: 'templates',
          title: '提纲、表格与清单',
          description: '使用学习模板辅助规划、记录与自检。',
        },
      ],
    },
  ]
}

export function getKnowledgeTask(
  discipline: DisciplineSlug,
  stageKey?: string,
  taskKey?: string
): { stage: KnowledgeStage; task: KnowledgeTask } | undefined {
  const stage = getKnowledgeStages(discipline).find((item) => item.key === stageKey)
  const task = stage?.tasks.find((item) => item.key === taskKey)
  return stage && task ? { stage, task } : undefined
}
