export const categoryOrder = [
  'topics',
  'methods',
  'variables',
  'literature',
  'stata',
  'writing',
] as const

export type CategorySlug = (typeof categoryOrder)[number]

export interface CategoryTheme {
  hero: string
  eyebrow: string
  action: string
  surface: string
  sectionLabel: string
  filter: string
  cta: string
  ctaButton: string
  cardRule: string
  cardBadge: string
  cardLink: string
  navActive: string
  homeSurface: string
}

export interface CategoryConfig {
  slug: CategorySlug
  index: string
  name: string
  shortName: string
  eyebrow: string
  description: string
  color: string
  filters: string[]
  featuredQueries: string[]
  theme: CategoryTheme
}

export const categories: Record<CategorySlug, CategoryConfig> = {
  topics: {
    slug: 'topics',
    index: '01',
    name: '论文选题库',
    shortName: '论文选题',
    eyebrow: '先判断能不能做，再讨论怎么做',
    description: '从研究问题、数据可得性、变量关系和识别路径四个维度检查经管论文选题。',
    color: 'bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-200',
    filters: ['专科论文', '本科论文', '硕士论文', '博士论文'],
    featuredQueries: ['经管论文怎么选题', '数字经济选题', 'ESG论文选题'],
    theme: {
      hero: 'bg-[#5b3428] dark:bg-[#3a231d]',
      eyebrow: 'text-[#f3c8a8]',
      action: 'bg-[#f6e7d8] text-[#49261b] hover:bg-white',
      surface: 'bg-[#fbf6ef] dark:bg-[#1d1917]',
      sectionLabel: 'text-[#9a4f2e] dark:text-[#e5a17c]',
      filter:
        'border-[#dcc4b2] bg-[#fffaf4] text-[#6b4636] dark:border-[#63493e] dark:bg-[#241d1a] dark:text-[#e8cdbc]',
      cta: 'border-[#dcc4b2] bg-[#f2e4d4] dark:border-[#63493e] dark:bg-[#2b211d]',
      ctaButton: 'bg-[#5b3428] text-white hover:bg-[#43251d]',
      cardRule: 'bg-[#a95c36]',
      cardBadge: 'bg-[#f2e4d4] text-[#6b3826] dark:bg-[#402b23] dark:text-[#f1bea2]',
      cardLink: 'text-[#8a472c] dark:text-[#eca985]',
      navActive: 'bg-[#f2e4d4] text-[#6b3826] dark:bg-[#402b23] dark:text-[#f1bea2]',
      homeSurface: 'bg-[#f6eadc] dark:bg-[#241d1a]',
    },
  },
  methods: {
    slug: 'methods',
    index: '02',
    name: '实证方法库',
    shortName: '实证方法',
    eyebrow: '讲清适用条件、识别假设和结果解释',
    description: '覆盖面板模型、DID、机制检验、内生性和稳健性等常用经管实证方法。',
    color: 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-200',
    filters: ['DID', '固定效应', '工具变量', '内生性', '机制检验', '稳健性'],
    featuredQueries: ['DID适用条件', '平行趋势检验', '内生性怎么处理'],
    theme: {
      hero: 'bg-[#273452] dark:bg-[#1c253a]',
      eyebrow: 'text-[#b7d7f0]',
      action: 'bg-[#dceaf5] text-[#1c304d] hover:bg-white',
      surface: 'bg-[#f2f5f8] dark:bg-[#171b24]',
      sectionLabel: 'text-[#315c82] dark:text-[#9fc5e5]',
      filter:
        'border-[#c7d5e1] bg-[#f8fbfd] text-[#344d64] dark:border-[#415269] dark:bg-[#1d2633] dark:text-[#c8d9e7]',
      cta: 'border-[#c7d5e1] bg-[#e5edf4] dark:border-[#415269] dark:bg-[#202a39]',
      ctaButton: 'bg-[#273452] text-white hover:bg-[#1d283f]',
      cardRule: 'bg-[#527ea5]',
      cardBadge: 'bg-[#e2ecf4] text-[#294f70] dark:bg-[#263a50] dark:text-[#b8d6ec]',
      cardLink: 'text-[#315f88] dark:text-[#a9cfea]',
      navActive: 'bg-[#e2ecf4] text-[#294f70] dark:bg-[#263a50] dark:text-[#b8d6ec]',
      homeSurface: 'bg-[#e9eff5] dark:bg-[#1d2633]',
    },
  },
  variables: {
    slug: 'variables',
    index: '03',
    name: '变量与数据字典',
    shortName: '变量数据',
    eyebrow: '定义、口径、来源和核验一次说清',
    description: '整理经管研究常用变量的测量方式、数据层级、来源线索和使用注意事项。',
    color: 'bg-cyan-50 text-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-200',
    filters: ['公司变量', '城市变量', '指数构造', '数据来源', '口径核验'],
    featuredQueries: ['企业创新怎么测量', '融资约束指数', '数字普惠金融指数'],
    theme: {
      hero: 'bg-[#174b4a] dark:bg-[#123534]',
      eyebrow: 'text-[#a8d7cf]',
      action: 'bg-[#d9eee9] text-[#143f3e] hover:bg-white',
      surface: 'bg-[#f0f7f4] dark:bg-[#14201f]',
      sectionLabel: 'text-[#236c68] dark:text-[#8fc8c2]',
      filter:
        'border-[#bfd8d1] bg-[#f8fcfa] text-[#315b58] dark:border-[#355c58] dark:bg-[#192a28] dark:text-[#b8d8d4]',
      cta: 'border-[#bfd8d1] bg-[#dfeee9] dark:border-[#355c58] dark:bg-[#1c302e]',
      ctaButton: 'bg-[#174b4a] text-white hover:bg-[#103938]',
      cardRule: 'bg-[#2f7d77]',
      cardBadge: 'bg-[#dcece7] text-[#205a56] dark:bg-[#23433f] dark:text-[#a8d7d0]',
      cardLink: 'text-[#216762] dark:text-[#91cec6]',
      navActive: 'bg-[#dcece7] text-[#205a56] dark:bg-[#23433f] dark:text-[#a8d7d0]',
      homeSurface: 'bg-[#e4f0ec] dark:bg-[#192a28]',
    },
  },
  literature: {
    slug: 'literature',
    index: '04',
    name: '文献检索与开放全文',
    shortName: '文献检索',
    eyebrow: '从检索式到引文追溯的完整路径',
    description: '提供中文与英文文献检索、经典文献追溯和合法开放全文查找方法。',
    color: 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200',
    filters: ['中文文献', '英文文献', '检索式', '引文追溯', '开放获取'],
    featuredQueries: ['经管论文检索式', '经典文献怎么找', '开放全文怎么找'],
    theme: {
      hero: 'bg-[#344a39] dark:bg-[#243329]',
      eyebrow: 'text-[#c9d9b5]',
      action: 'bg-[#e6eedb] text-[#2b402f] hover:bg-white',
      surface: 'bg-[#f5f7ef] dark:bg-[#191f1a]',
      sectionLabel: 'text-[#5b754c] dark:text-[#b6ca9f]',
      filter:
        'border-[#d0d9c3] bg-[#fbfcf7] text-[#526047] dark:border-[#4a5b43] dark:bg-[#20271f] dark:text-[#d2ddc5]',
      cta: 'border-[#d0d9c3] bg-[#e8eddc] dark:border-[#4a5b43] dark:bg-[#273024]',
      ctaButton: 'bg-[#344a39] text-white hover:bg-[#26372b]',
      cardRule: 'bg-[#71865e]',
      cardBadge: 'bg-[#e5ebdc] text-[#4f6543] dark:bg-[#33412f] dark:text-[#c8d8b8]',
      cardLink: 'text-[#577249] dark:text-[#bbcea8]',
      navActive: 'bg-[#e5ebdc] text-[#4f6543] dark:bg-[#33412f] dark:text-[#c8d8b8]',
      homeSurface: 'bg-[#edf1e5] dark:bg-[#20271f]',
    },
  },
  stata: {
    slug: 'stata',
    index: '05',
    name: 'Stata代码库',
    shortName: 'Stata代码',
    eyebrow: '代码、报错、检查步骤和结果解释',
    description:
      '以Stata为主，补充SPSS与Python零基础入门，覆盖软件安装、数据处理、代码、报错和复现检查。',
    color: 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
    filters: ['零基础安装', 'Stata', 'SPSS', 'Python', '面板回归', '报错排查'],
    featuredQueries: ['Stata怎么安装', 'SPSS入门', 'Python数据分析入门'],
    theme: {
      hero: 'bg-[#2c2a25] dark:bg-[#1d1c19]',
      eyebrow: 'text-[#e7c879]',
      action: 'bg-[#f0dc9c] text-[#332c1d] hover:bg-[#f7e9bd]',
      surface: 'bg-[#f7f3e8] dark:bg-[#1d1c19]',
      sectionLabel: 'text-[#8a6925] dark:text-[#e2c26e]',
      filter:
        'border-[#ddd0aa] bg-[#fdfaf1] text-[#665733] dark:border-[#5b5138] dark:bg-[#26231c] dark:text-[#e6d8ae]',
      cta: 'border-[#ddd0aa] bg-[#efe5c8] dark:border-[#5b5138] dark:bg-[#2d291e]',
      ctaButton: 'bg-[#2c2a25] text-white hover:bg-black',
      cardRule: 'bg-[#c3922e]',
      cardBadge: 'bg-[#f0e5c5] text-[#715718] dark:bg-[#443a22] dark:text-[#ebce7b]',
      cardLink: 'text-[#80601c] dark:text-[#e5c36d]',
      navActive: 'bg-[#f0e5c5] text-[#715718] dark:bg-[#443a22] dark:text-[#ebce7b]',
      homeSurface: 'bg-[#f4ecd5] dark:bg-[#26231c]',
    },
  },
  writing: {
    slug: 'writing',
    index: '06',
    name: '论文写作与润色',
    shortName: '写作润色',
    eyebrow: '让研究问题、方法、结果和表达彼此一致',
    description: '覆盖标题摘要、引言、结果解释、结构逻辑、语言润色和学校/期刊格式规范。',
    color: 'bg-rose-50 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200',
    filters: ['标题摘要', '引言', '结果解释', '结构优化', '语言润色', '格式规范'],
    featuredQueries: ['经管论文引言结构', '回归结果怎么写', '论文润色清单'],
    theme: {
      hero: 'bg-[#613044] dark:bg-[#40202d]',
      eyebrow: 'text-[#efc1cf]',
      action: 'bg-[#f4dce4] text-[#542537] hover:bg-white',
      surface: 'bg-[#faf3f5] dark:bg-[#21191c]',
      sectionLabel: 'text-[#8b4059] dark:text-[#e5a6ba]',
      filter:
        'border-[#e1c5ce] bg-[#fff9fb] text-[#704552] dark:border-[#65414d] dark:bg-[#291d21] dark:text-[#e9c6d1]',
      cta: 'border-[#e1c5ce] bg-[#f0dfe4] dark:border-[#65414d] dark:bg-[#302127]',
      ctaButton: 'bg-[#613044] text-white hover:bg-[#492333]',
      cardRule: 'bg-[#a45b72]',
      cardBadge: 'bg-[#f0dfe4] text-[#74374c] dark:bg-[#472c35] dark:text-[#edb6c7]',
      cardLink: 'text-[#874057] dark:text-[#e8a8bc]',
      navActive: 'bg-[#f0dfe4] text-[#74374c] dark:bg-[#472c35] dark:text-[#edb6c7]',
      homeSurface: 'bg-[#f4e7eb] dark:bg-[#291d21]',
    },
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
    title: '论文润色优化一对一定制',
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
    '选题、研究设计、变量数据、实证方法、Stata代码、结果解释、写作结构和论文润色优化一对一定制均可通过微信或QQ直接咨询。',
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
