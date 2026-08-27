export const categoryOrder = [
  'topics',
  'methods',
  'variables',
  'literature',
  'stata',
  'writing',
] as const

export type CategorySlug = (typeof categoryOrder)[number]

export interface CategoryConfig {
  slug: CategorySlug
  name: string
  shortName: string
  eyebrow: string
  description: string
  color: string
  filters: string[]
  featuredQueries: string[]
}

export const categories: Record<CategorySlug, CategoryConfig> = {
  topics: {
    slug: 'topics',
    name: '论文选题库',
    shortName: '论文选题',
    eyebrow: '先判断能不能做，再讨论怎么做',
    description: '从研究问题、数据可得性、变量关系和识别路径四个维度检查经管论文选题。',
    color: 'bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-200',
    filters: ['本科论文', '硕士论文', '企业层面', '城市层面', '选题可行性'],
    featuredQueries: ['经管论文怎么选题', '数字经济选题', 'ESG论文选题'],
  },
  methods: {
    slug: 'methods',
    name: '实证方法库',
    shortName: '实证方法',
    eyebrow: '讲清适用条件、识别假设和结果解释',
    description: '覆盖面板模型、DID、机制检验、内生性和稳健性等常用经管实证方法。',
    color: 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-200',
    filters: ['DID', '面板模型', '内生性', '机制检验', '稳健性'],
    featuredQueries: ['DID适用条件', '平行趋势检验', '内生性怎么处理'],
  },
  variables: {
    slug: 'variables',
    name: '变量与数据字典',
    shortName: '变量数据',
    eyebrow: '定义、口径、来源和核验一次说清',
    description: '整理经管研究常用变量的测量方式、数据层级、来源线索和使用注意事项。',
    color: 'bg-cyan-50 text-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-200',
    filters: ['公司变量', '城市变量', '指数构造', '数据来源', '口径核验'],
    featuredQueries: ['企业创新怎么测量', '融资约束指数', '数字普惠金融指数'],
  },
  literature: {
    slug: 'literature',
    name: '文献检索与开放全文',
    shortName: '文献检索',
    eyebrow: '从检索式到引文追溯的完整路径',
    description: '提供中文与英文文献检索、经典文献追溯和合法开放全文查找方法。',
    color: 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200',
    filters: ['中文文献', '英文文献', '检索式', '引文追溯', '开放获取'],
    featuredQueries: ['经管论文检索式', '经典文献怎么找', '开放全文怎么找'],
  },
  stata: {
    slug: 'stata',
    name: 'Stata代码库',
    shortName: 'Stata代码',
    eyebrow: '代码、报错、检查步骤和结果解释',
    description: '面向真实实证流程整理Stata命令、代码结构、常见报错和复现检查清单。',
    color: 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
    filters: ['数据处理', '面板回归', 'reghdfe', 'DID', '报错排查'],
    featuredQueries: ['reghdfe怎么用', 'repeated time values报错', 'DID事件研究图'],
  },
  writing: {
    slug: 'writing',
    name: '论文写作与润色',
    shortName: '写作润色',
    eyebrow: '让研究问题、方法、结果和表达彼此一致',
    description: '覆盖标题摘要、引言、结果解释、结构逻辑、语言润色和学校/期刊格式规范。',
    color: 'bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200',
    filters: ['标题摘要', '引言', '结果解释', '结构优化', '语言润色', '格式规范'],
    featuredQueries: ['经管论文引言结构', '回归结果怎么写', '论文润色清单'],
  },
}

export const services = [
  {
    title: '单次问题诊断',
    description: '围绕选题、变量、模型、代码或导师意见定位核心问题，形成下一步行动清单。',
    deliverable: '问题诊断表 + 修改优先级 + 后续路径',
    href: '/consulting',
  },
  {
    title: '论文润色优化',
    description: '优化语言、结构、逻辑、术语、摘要、图表说明、引用和格式，并保留修订痕迹。',
    deliverable: '修订版 + 问题批注 + 修改说明 + 自查清单',
    href: '/polishing',
  },
  {
    title: '阶段研究辅导',
    description: '按研究阶段持续复盘，从选题与数据到实证、写作和返修逐步推进。',
    deliverable: '阶段计划 + 定期复盘 + 方法/代码反馈',
    href: '/consulting',
  },
]

export const homeFaq = [
  [
    '可以咨询哪些问题？',
    '选题、研究设计、变量数据、实证方法、Stata代码、结果解释、写作结构和论文润色优化均可先提交问题摘要。',
  ],
  [
    '论文润色包含什么？',
    '可按需要处理语言表达、结构逻辑、术语统一、标题摘要、图表表述、引用格式和返修说明。',
  ],
  [
    '第一次咨询需要准备什么？',
    '准备研究阶段、学科方向、当前问题、已有数据或方法情况，以及希望完成的时间即可。',
  ],
  [
    '如何保护材料隐私？',
    '首次只收集问题摘要；确认服务后再约定必要材料的传递方式，并执行最小化收集。',
  ],
]

export function isCategorySlug(value: string): value is CategorySlug {
  return categoryOrder.includes(value as CategorySlug)
}
