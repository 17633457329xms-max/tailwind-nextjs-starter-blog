export const disciplineOrder = [
  'economics',
  'management',
  'law',
  'philosophy',
  'history',
  'education',
  'literature',
  'computer-science',
  'transportation',
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
  economics: {
    slug: 'economics',
    name: '经济学',
    english: 'Economics',
    statement:
      '围绕经济行为、制度激励与政策效果建立可检验的问题，连接理论机制、数据证据与因果识别。',
    audience: '适合理论经济学、应用经济学、金融学、国际贸易、区域经济等方向。',
    color: '#5b3428',
    research: ['数字经济与生产率', '金融市场与风险', '区域发展与公共政策', '劳动与消费行为'],
    methods: ['面板数据与固定效应', 'DID与事件研究', '工具变量与内生性', '结构与机制分析'],
    standards: ['识别假设可辩护', '变量口径可核验', '代码结果可复现'],
  },
  management: {
    slug: 'management',
    name: '管理学',
    english: 'Management',
    statement: '以组织与企业真实问题为中心，统筹理论模型、调查材料、案例证据与实证分析。',
    audience: '适合工商管理、会计学、审计学、物流管理、公共管理、信息管理等方向。',
    color: '#365a72',
    research: ['公司治理与战略转型', '组织行为与人力资源', '供应链与运营管理', '数字化管理与创新'],
    methods: ['问卷与结构方程', '案例研究与扎根理论', '面板实证与机制检验', '混合研究与行动研究'],
    standards: ['理论构念与变量一致', '样本边界透明', '管理含义不夸大'],
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
  philosophy: {
    slug: 'philosophy',
    name: '哲学',
    english: 'Philosophy',
    statement: '从概念辨析、论证重建与思想史语境出发，把理论兴趣转化为可辩护的哲学问题。',
    audience: '适合马克思主义哲学、中国哲学、外国哲学、伦理学、逻辑学、科学技术哲学等方向。',
    color: '#5a4a76',
    research: ['人工智能伦理与责任', '中国哲学概念史', '认识论与科学解释', '公共价值与正义'],
    methods: ['概念分析与论证重建', '经典文本细读', '思想史与语境化解释', '规范伦理与案例分析'],
    standards: ['概念使用前后一致', '原典版本与译文可核验', '反对意见被充分回应'],
  },
  history: {
    slug: 'history',
    name: '历史学',
    english: 'History',
    statement: '以史料批判为基础，在时间、空间、制度与行动者之间建立可检验的历史解释。',
    audience: '适合中国史、世界史、考古学、专门史、历史地理、史学理论及史学史等方向。',
    color: '#6b4b32',
    research: [
      '区域社会与基层治理',
      '近代国家与制度转型',
      '丝路交流与全球史',
      '历史记忆与遗产传播',
    ],
    methods: ['史料批判与版本考证', '档案研究与互证', '历史比较与个案研究', '历史地理与数字史学'],
    standards: ['史料来源与形成过程清楚', '时间线与概念时态准确', '解释不超出材料边界'],
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
    name: '文学',
    english: 'Literature',
    statement:
      '以文本细读为核心，贯通中国语言文学与外国语言文学，让概念、材料范围、历史语境与论证层次形成可核查的解释链。',
    audience: '适合中国古代文学、现当代文学、文艺学、比较文学与世界文学、外国语言文学等方向。',
    color: '#76502f',
    research: [
      '现代文学中的城乡经验',
      '古典叙事与文体演变',
      '媒介转型与网络文学',
      '跨文化译介、外国语言文学与形象建构',
    ],
    methods: [
      '文本细读与互文分析',
      '历史语境与版本考辨',
      '叙事学与文体学',
      '语料库、翻译研究与数字人文',
    ],
    standards: ['一手文本版本可靠', '理论概念不替代文本', '史料与解释边界明确'],
  },
  'computer-science': {
    slug: 'computer-science',
    name: '计算机类',
    english: 'Computer Science',
    statement: '围绕问题定义、数据集、算法设计、实验比较与可复现实现，构建可信的计算机研究论证。',
    audience: '适合计算机科学与技术、软件工程、人工智能、网络空间安全、数据科学等方向。',
    color: '#285d6b',
    research: [
      '大模型应用与可信AI',
      '软件质量与智能开发',
      '网络安全与隐私保护',
      '数据智能与行业应用',
    ],
    methods: [
      '算法设计与复杂度分析',
      '数据集构建与实验评估',
      '消融实验与误差分析',
      '系统原型与用户研究',
    ],
    standards: ['任务定义与指标匹配', '数据和代码可复现', '基线比较公平完整'],
  },
  transportation: {
    slug: 'transportation',
    name: '交通类',
    english: 'Transportation',
    statement: '面向交通系统运行、规划决策与安全治理，连接时空数据、工程模型、政策场景与实地证据。',
    audience: '适合交通运输规划与管理、道路与铁道工程、交通信息工程、载运工具运用工程等方向。',
    color: '#3d5874',
    research: [
      '城市交通拥堵治理',
      '综合交通与区域发展',
      '智慧交通与出行行为',
      '道路安全与低碳运输',
    ],
    methods: [
      '交通调查与时空数据分析',
      '需求预测与网络模型',
      '仿真评价与实验设计',
      '政策评估与案例比较',
    ],
    standards: ['研究区域和时段明确', '模型假设与参数透明', '安全和环境结论有边界'],
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
