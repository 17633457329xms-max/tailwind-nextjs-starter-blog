export const disciplineOrder = [
  'economics-management',
  'law',
  'education',
  'literature',
  'art',
  'marxism',
] as const

export type DisciplineSlug = (typeof disciplineOrder)[number]

export interface DisciplineConfig {
  slug: DisciplineSlug
  name: string
  english: string
  statement: string
  audience: string
  color: string
  research: string[]
  methods: string[]
  standards: string[]
}

export const disciplines: Record<DisciplineSlug, DisciplineConfig> = {
  'economics-management': {
    slug: 'economics-management',
    name: '经济学与管理学',
    english: 'Economics & Management',
    statement: '围绕可识别的研究问题，连接理论机制、变量数据、计量方法与可复现代码。',
    audience: '适合经济学、金融学、会计学、工商管理、公共管理等方向。',
    color: '#5b3428',
    research: ['企业行为与公司治理', '数字经济与创新', '公共政策评估', '金融市场与风险'],
    methods: ['面板数据与固定效应', 'DID与事件研究', '工具变量与内生性', '机制与异质性分析'],
    standards: ['识别假设可辩护', '变量口径可核验', '代码结果可复现'],
  },
  law: {
    slug: 'law',
    name: '法学',
    english: 'Law',
    statement: '从规范问题出发，区分法解释、制度比较、案例研究与法实证研究的证据规则。',
    audience: '适合法理学、民商法、刑法、经济法、行政法、国际法等方向。',
    color: '#34445e',
    research: [
      '数字平台治理与竞争法',
      '个人信息保护与数据权利',
      '公司治理与投资者保护',
      '司法裁判规则的演进',
    ],
    methods: [
      '教义学与体系解释',
      '比较法与制度分析',
      '案例编码与裁判文书分析',
      '法律实证与因果识别',
    ],
    standards: ['规范命题层级清楚', '法源效力与时点准确', '案例选择避免以偏概全'],
  },
  education: {
    slug: 'education',
    name: '教育学',
    english: 'Education',
    statement: '把教育现象转化为可检验问题，兼顾理论构念、测量质量、研究伦理与情境解释。',
    audience: '适合教育学原理、课程教学、教育技术、高等教育、学前教育等方向。',
    color: '#315f55',
    research: [
      '教师数字素养与教学效能',
      '学习投入与学业表现',
      '教育公平与资源配置',
      '生成式AI与学习行为',
    ],
    methods: ['问卷量表与结构方程', '多层线性模型', '准实验与混合研究', '访谈编码与扎根理论'],
    standards: ['构念定义与量表匹配', '抽样边界透明', '未成年人研究符合伦理'],
  },
  literature: {
    slug: 'literature',
    name: '中国语言文学',
    english: 'Chinese Language & Literature',
    statement: '以文本细读为核心，让概念、材料范围、历史语境与论证层次形成可核查的解释链。',
    audience: '适合中国古代文学、现当代文学、文艺学、比较文学、语言学等方向。',
    color: '#76502f',
    research: [
      '现代文学中的城乡经验',
      '古典叙事与文体演变',
      '媒介转型与网络文学',
      '跨文化译介与形象建构',
    ],
    methods: ['文本细读与互文分析', '历史语境与版本考辨', '叙事学与文体学', '语料库与数字人文'],
    standards: ['一手文本版本可靠', '理论概念不替代文本', '史料与解释边界明确'],
  },
  art: {
    slug: 'art',
    name: '艺术学',
    english: 'Arts',
    statement: '在作品、媒介、实践与社会语境之间建立证据链，避免以审美感受代替学术论证。',
    audience: '适合美术学、设计学、音乐与舞蹈学、戏剧影视学等方向。',
    color: '#713e4c',
    research: [
      '传统视觉资源的当代转化',
      '数字媒介与沉浸叙事',
      '设计介入乡村文化',
      '短视频时代的视听语言',
    ],
    methods: ['图像学与视觉分析', '创作实践研究', '田野调查与民族志', '媒介考古与接受研究'],
    standards: ['作品样本选择有依据', '创作过程形成档案', '图像版权与田野伦理合规'],
  },
  marxism: {
    slug: 'marxism',
    name: '马克思主义理论',
    english: 'Marxism Studies',
    statement: '坚持经典文本、理论命题、历史条件与现实问题相互校验，形成严谨的理论阐释。',
    audience: '适合马克思主义基本原理、思想政治教育、中国化时代化等方向。',
    color: '#7a302b',
    research: [
      '中国式现代化的理论逻辑',
      '数字劳动与平台经济',
      '青年价值观与思想政治教育',
      '共同富裕的制度基础',
    ],
    methods: ['经典文本与概念史', '历史唯物主义分析', '政策文本与话语分析', '调查研究与案例研究'],
    standards: ['原典引用准确完整', '理论命题联系历史条件', '政策表述核对权威来源'],
  },
}

export function isDisciplineSlug(value: string): value is DisciplineSlug {
  return disciplineOrder.includes(value as DisciplineSlug)
}
