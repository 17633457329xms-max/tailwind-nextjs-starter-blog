import type {
  DisciplineArticle,
  DisciplineArticleSection,
  DisciplineCaseStudy,
  DisciplineChart,
  DisciplineCodeExample,
} from './disciplineArticles'
import type { DisciplineConfig } from './disciplines'
import type { KnowledgeStage, KnowledgeTask } from './knowledgeArchitecture'

type DeepContentInput = {
  discipline: DisciplineConfig
  specialty: string
  stage: KnowledgeStage
  task: KnowledgeTask
  focus: string
  lens: string
  sequence: number
}

const economicsMethodBySpecialty: Record<string, string> = {
  理论经济学: '理论机制推演与跨地区面板检验',
  应用经济学: '双向固定效应、准自然实验与稳健性检验',
  金融学: '公司或地区面板模型、风险指标构造与内生性处理',
  财政学: '政策评估、地区面板模型与财政口径核验',
  国际经济与贸易: '贸易引力模型、国别面板与异质性分析',
}

const managementMethodBySpecialty: Record<string, string> = {
  管理科学与工程: '优化建模、问卷实证与多源数据验证',
  工商管理学: '企业面板回归、问卷分析与案例三角验证',
  农林经济管理: '农户调查、县域面板与政策评估',
  公共管理学: '政策文本、问卷调查与多层模型',
  信息资源管理: '内容分析、用户行为数据与结构方程模型',
  会计学: '上市公司面板回归、财务指标构造与稳健性检验',
  审计学: '审计意见、事务所特征与公司面板识别',
  财务管理: '公司金融指标、事件研究与面板模型',
  市场营销: '消费者实验、量表检验与中介调节模型',
  人力资源管理: '员工问卷、多层模型与组织案例验证',
  物流管理: '供应链运营数据、效率测度与优化模型',
  旅游管理: '游客问卷、评论文本与目的地面板数据',
}

const stageDeliverable: Record<string, string> = {
  topic: '一份能够说明研究对象、变量关系、证据来源和识别边界的选题说明',
  proposal: '一份问题—理论—方法—数据首尾一致的开题报告',
  literature: '一份按争论线索组织、能够推出研究缺口的文献综述',
  design: '一套变量可测量、模型可估计、过程可复现的研究设计',
  drafting: '一章证据、表格和文字解释相互对应的论文正文',
  revision: '一份逐条回应意见并保留修改依据的修订稿',
  tools: '一套可重复运行的代码、表格模板和质量检查清单',
}

const focusGuidance: Record<string, string> = {
  研究对象与分析单元:
    '重点核对理论概念与观测层级是否一致：个人态度不能直接替代组织能力，城市指标也不能未经解释地代表企业行为。',
  核心概念与边界:
    '先列出概念的包含项与排除项，再比较至少两种权威定义；变量只能覆盖概念的一部分时，要主动声明测量边界。',
  现实问题与研究缺口:
    '用公开事实证明现实问题存在，再用文献矩阵证明既有研究哪里没有回答；现实热点本身不能自动构成学术缺口。',
  研究问题的层级化表达:
    '把总问题拆成关系、机制、条件和边界四层，确保每个子问题都能在数据、模型或材料分析中找到对应证据。',
  '关键变量、材料与证据':
    '对每个关键判断至少准备一个直接证据和一个交叉核验证据，并记录数据版本、文本位置或访谈编号。',
  理论机制与解释链条:
    '机制必须说明行为主体、作用路径和可观察结果，不能只在变量之间画箭头；还要列出一个能够与主机制竞争的替代解释。',
  '研究范围、时间与场景':
    '研究窗口要覆盖关键变化并避开口径断点；空间和行业范围应与制度背景一致，不为增加样本而随意混合不可比对象。',
  比较对象与反例检验:
    '比较组应在处理前具有可比性，反例要能真正挑战主结论；不能只挑选支持预期的案例或分组结果。',
  可操作步骤与时间安排:
    '把工作拆成数据试取、变量试算、模型试跑、正文解释和复核五个节点，每个节点都设定可检查的文件产出。',
  质量风险与自检节点:
    '提前登记最可能改变结论的口径、样本和模型选择，并保留完整结果，避免看到显著性后再决定主模型。',
}

const lensGuidance: Record<string, string> = {
  入门操作:
    '先完成一套最小可运行流程，再逐步增加变量和检验；一次引入太多复杂设定会让错误难以定位。',
  案例拆解:
    '把公开案例分为背景事实、可观察证据、研究者判断和结论边界四层，避免把案例叙述直接当作机制证明。',
  证据核验: '至少从原始发布机构、变量字典和第二来源三个位置交叉核对关键数字，并保存可追溯链接。',
  常见误区修正:
    '先复现容易犯错的写法，再说明错误如何影响估计或论证，最后给出能够被复查的替代步骤。',
  进阶推演: '在基准结论之外加入竞争性机制、边界条件和反事实，检验论文贡献是否仍然成立。',
}

function buildSections(input: DeepContentInput): DisciplineArticleSection[] {
  const { discipline, specialty, stage, task, focus, lens, sequence } = input
  const economics = discipline.slug === 'economics'
  const method = economics
    ? (economicsMethodBySpecialty[specialty] ?? '面板数据与因果识别')
    : (managementMethodBySpecialty[specialty] ?? '案例、问卷与实证分析')
  const evidence = economics
    ? '国家统计局、世界银行 WDI、各级统计年鉴或经过授权的微观数据库'
    : '国家统计局、巨潮资讯、交易所公告、企业年报、规范实施的问卷或访谈材料'
  const outcome = stageDeliverable[stage.key] ?? `一份可检查的“${task.title}”成果`
  const focusAdvice = focusGuidance[focus] ?? '把抽象问题落实到可核验的研究证据。'
  const lensAdvice = lensGuidance[lens] ?? '每一步都保留可复查的操作依据。'

  return [
    {
      heading: `一、先明确这篇文章要解决的“${task.title}”问题`,
      paragraphs: [
        `本文服务于“${specialty}—${stage.title}—${task.title}”这一明确场景，重点处理“${focus}”，并采用“${lens}”的讲解方式。最终要得到的不是几段泛泛表述，而是${outcome}。第 ${sequence} 个切入点的独特之处，在于把研究判断落实到可核对的对象、时间、指标和材料上。`,
        `一个合格问题至少包含四项信息：研究对象是谁、核心现象是什么、准备比较什么变化、证据能够支持多强的结论。例如，不要只写“数字化影响绩效”，而应说明企业范围、年份、数字化指标、绩效口径以及准备识别的是相关关系还是因果效应。`,
        `针对“${focus}”，本篇采用的专项检查是：${focusAdvice}${lensAdvice}`,
      ],
      bullets: [
        `对象：把“${specialty}”继续限定到企业、地区、行业、个人或制度单元。`,
        `时间：说明数据起止年份，并解释选择该窗口的理由。`,
        `证据：优先选择${evidence}。`,
        `边界：在没有可信识别策略时，只报告条件相关关系。`,
      ],
    },
    {
      heading: `二、把研究问题改写成可检验的分析框架`,
      paragraphs: [
        `建议使用“现实问题—理论机制—可观察变量—经验检验—结论边界”五段式框架。现实问题说明为什么值得研究，理论机制解释为什么可能发生，变量把抽象概念落到数据，经验检验排除主要替代解释，结论边界防止把局部样本夸大为普遍规律。`,
        `在${specialty}中，推荐的方法起点是“${method}”。方法不是为了显得复杂，而是由问题和数据结构决定：同一对象被多年观察时考虑面板模型；存在明确政策时点和处理组时评估 DID；潜变量来自量表时先检查信效度，再讨论结构关系。`,
        `从“${lens}”角度，本步骤的判断标准不是模型名称有多高级，而是它能否直接回答“${task.title}”中的具体疑问。${lensAdvice}`,
      ],
      table: {
        caption: `${specialty}“问题—证据—方法”对应表`,
        headers: ['需要回答的问题', '应准备的证据', '优先检查'],
        rows: [
          ['是否存在稳定关系', '描述统计、相关系数、基准模型', '方向、量级与统计不确定性'],
          ['关系通过什么机制发生', '中介变量、过程材料或分组证据', '时间顺序与替代机制'],
          ['结果是否具有因果含义', '政策冲击、工具变量或实验设计', '平行趋势、排除性与反事实'],
          ['结论适用于哪些对象', '异质性样本、边界条件与反例', '分组依据是否事前确定'],
        ],
      },
    },
    {
      heading: '三、公开数据和材料从哪里来',
      paragraphs: [
        economics
          ? '经济学研究可以从世界银行 WDI 或国家统计局国家数据开始。下载时必须同时保存指标代码、地区代码、年份、单位、下载日期和缺失值说明。只保存整理后的 Excel 而不保存原始下载记录，会让后续复现和答辩解释变得困难。'
          : '管理学研究应区分真正公开材料与需要授权的商业数据库。上市公司年报、公告和交易所问询函可从巨潮资讯或交易所网站核验；宏观控制变量可来自国家统计局。问卷数据则应保留题项来源、发放对象、回收规则、剔除标准和匿名化记录。',
        `围绕“${focus}”建立数据字典，每一行记录变量中文名、代码、概念定义、计算公式、单位、原始来源和异常处理。数据字典不是附属文档，它决定不同表格中的同一变量是否保持一致。`,
        `本篇第 ${sequence} 条路径应特别记录：${focusAdvice}`,
      ],
      table: {
        caption: '最小可复现数据字典示例',
        headers: ['字段', '示例写法', '必须说明'],
        rows: [
          [
            '被解释变量 Y',
            economics ? '实际人均 GDP 对数' : '总资产收益率 ROA',
            '计算公式、价格口径或财务口径',
          ],
          [
            '核心解释变量 X',
            economics ? '互联网使用率' : '数字化转型指数',
            '指标来源、方向与取值范围',
          ],
          [
            '控制变量 Z',
            economics ? '投资率、城镇化率' : '规模、杠杆率、成长性',
            '选择依据，避免机械堆砌',
          ],
          ['索引字段', economics ? 'country_id、year' : 'firm_id、year', '唯一性、重复值和缺失值'],
        ],
      },
    },
    {
      heading: '四、从原始材料到可分析样本的操作顺序',
      paragraphs: [
        `第一步保留未经修改的原始文件；第二步用脚本完成重命名、合并、去重和变量构造；第三步输出描述统计与异常清单；第四步冻结分析样本后再运行模型。不要在 Excel 中反复手工覆盖，因为手工操作很难说明某个数值是怎样得到的。`,
        `缺失值不能一律删除。应先区分随机缺失、制度性缺失和不适用；极端值处理需要报告阈值，并同时保留未缩尾结果作为核验。合并数据后必须检查一对一或一对多关系，尤其警惕重复键使样本量被无意放大。`,
      ],
      bullets: [
        '用唯一键检查重复记录，并记录删除原因。',
        '比较处理前后的样本量、均值和分位数。',
        '所有变量构造都写进脚本，不只写在论文文字里。',
        '输出一张样本筛选流程表，说明每一步损失多少观测值。',
      ],
    },
    {
      heading: `五、${method}应该怎样落地`,
      paragraphs: [
        economics
          ? '面板模型常用设定可写为 Y_it = βX_it + γZ_it + μ_i + λ_t + ε_it。其中 μ_i 控制个体不随时间变化的特征，λ_t 控制共同年份冲击。β 的解释依赖变量变换：因变量取对数、解释变量保持水平值时，系数通常解释为 X 增加一个单位对应 Y 的近似百分比变化。'
          : '管理学实证不能在固定效应、结构方程和案例研究之间随意切换。企业年度数据适合面板模型；同一时点收集的量表数据应重点处理共同方法偏差、信效度与反向因果；案例研究则要说明案例选择逻辑、证据链和竞争性解释。',
        `围绕“${task.title}”至少比较三个模型：不加入控制变量的基础模型、加入理论相关控制变量的完整模型，以及改变口径或样本后的稳健性模型。模型越多不代表越可靠，关键是每一列变化都有明确目的。`,
        `如果“${focus}”是本篇的核心，模型比较必须能够展示这一判断在加入关键控制、改变样本或替换口径后是否仍然成立。${focusAdvice}`,
      ],
      table: {
        caption: '建议的基准结果表结构',
        headers: ['列', '模型设置', '回答的问题'],
        rows: [
          ['(1)', '核心解释变量 + 基础固定效应', '方向和原始量级是否稳定'],
          ['(2)', '加入有理论依据的控制变量', '结果是否由可观察差异解释'],
          ['(3)', '更严格固定效应或聚类标准误', '统计推断是否稳健'],
          ['(4)', '替换指标、样本或估计方法', '结论是否依赖单一设定'],
        ],
      },
    },
    {
      heading: '六、回归结果或分析结果怎样写进论文',
      paragraphs: [
        `结果段落按“表格位置—模型变化—方向与显著性—经济量级—结论边界”书写。不要只写“显著为正，假设成立”。例如可以写：在控制个体与年份固定效应后，核心变量系数为 0.012，聚类稳健标准误为 0.004；若因变量为对数，该结果表示核心变量每增加一个单位，结果变量平均变化约 1.2%。`,
        `随后说明这只是基于当前样本和模型的估计。若研究设计没有解决反向因果和随时间变化的遗漏变量，应使用“相关”“关联”或“支持该机制的证据”，而不是直接使用“导致”“促进”等强因果词。`,
      ],
      bullets: [
        '显著性回答“是否能排除随机波动”，不能替代经济意义。',
        '系数量级必须结合变量单位、对数形式和标准化方式解释。',
        '正文解释主要模型，完整结果、变量定义和额外检验可放附录。',
      ],
    },
    {
      heading: '七、最容易被导师指出的六个问题',
      paragraphs: [
        `常见问题包括：题目范围大于数据能力；变量口径与理论概念不一致；控制变量没有理论理由；把固定效应写成解决全部内生性；只报告显著结果；代码、表格和正文中的样本量不一致。`,
        `修正时应回到证据链，而不是只润色措辞。逐项核对题目、假设、变量、模型、表格和结论是否使用同一套对象与口径；任何一次删样本、换变量或调整模型，都应能在日志中找到理由。`,
        `本篇采用“${lens}”路线，因此还要追加一项专项自检：${lensAdvice}`,
      ],
      table: {
        caption: '提交前错误排查表',
        headers: ['风险', '识别信号', '修正动作'],
        rows: [
          ['重复数据', '同一个体同一年多行', '检查唯一键和合并关系'],
          ['伪因果表述', '只有普通回归却写“影响”', '降低结论强度或补充识别策略'],
          ['标准误错误', '面板数据使用默认标准误', '按处理或个体层级合理聚类'],
          ['选择性报告', '只保留显著模型', '预先说明主模型并完整报告'],
        ],
      },
    },
    {
      heading: `八、可直接改写的“${task.title}”论文模板`,
      paragraphs: [
        `本文以【研究对象】为样本，考察【核心解释变量】与【结果变量】之间的关系。根据【理论名称】，核心解释变量可能通过【机制变量】改变结果变量。数据来自【公开来源或调查过程】，研究期为【起止年份】，最终样本包含【个体数】个研究对象和【观测数】条观测。`,
        `基准模型采用${method}，并控制【固定效应或关键背景变量】。标准误按【合理层级】调整。为检验结论稳健性，进一步实施【替换指标、改变样本、安慰剂、工具变量或三角验证】。所有结果均依据实际输出填写，不预设显著性。`,
        `围绕“${focus}”，模板中还应补写：【本研究如何执行专项检查】。可依据本篇建议改写为：${focusAdvice}`,
      ],
    },
    {
      heading: '九、完成本篇后的下一步',
      paragraphs: [
        `完成“${task.title}”后，应把产出交给下一环节检验：选题要进入开题可行性检查，开题要进入数据试跑，研究设计要先跑出一版描述统计和基准结果，正文则要反查代码与原始材料。`,
        `最低交付包应包括原始数据说明、数据字典、清洗脚本、分析脚本、结果表、图表来源和一页自检记录。只有这些材料能够互相对应，${specialty}论文才具备真正的可复现性。`,
      ],
    },
  ]
}

function buildCaseStudy(input: DeepContentInput): DisciplineCaseStudy {
  const economics = input.discipline.slug === 'economics'
  return economics
    ? {
        title: `世界银行 WDI：${input.specialty}公开数据复现案例`,
        context:
          '以“互联网普及率是否与实际人均 GDP 变化相关”为示范问题，从 WDI 下载国家—年份面板数据。核心指标使用 NY.GDP.PCAP.KD、IT.NET.USER.ZS 和 NE.GDI.FTOT.ZS，并保存指标代码、单位和下载日期。',
        takeaway:
          '该案例适合演示数据下载、面板设定和双向固定效应，但普通固定效应只能控制不随时间变化的遗漏因素；若要作因果解释，还需额外识别策略。',
        sourceLabel: '世界银行 World Development Indicators',
        sourceUrl: 'https://databank.worldbank.org/source/world-development-indicators',
      }
    : {
        title: `上市公司公开年报：${input.specialty}材料构建案例`,
        context:
          '以“企业数字化信息披露与经营绩效”为示范问题，从巨潮资讯核验年报原文，从国家统计局补充行业和宏观控制变量。研究者需要记录证券代码、报告期、公告链接、文本提取规则和财务指标公式。',
        takeaway:
          '公开年报可以支持文本测量与案例核验，但关键词频次不必然等于真实数字化投入。应结合财务数据、无形资产明细、管理层讨论或人工抽样复核提高测量效度。',
        sourceLabel: '巨潮资讯网',
        sourceUrl: 'https://www.cninfo.com.cn/',
      }
}

function buildChart(input: DeepContentInput): DisciplineChart | undefined {
  if (input.discipline.slug !== 'economics') return undefined
  return {
    title: '中国实际 GDP 年增长率（2021年至2025年）',
    description:
      '使用世界银行 WDI 指标 NY.GDP.MKTP.KD.ZG 制作的公开数据示例。图表只用于演示时间序列描述；正式论文应保存 API 返回结果和下载日期。',
    dataUpdatedAt:
      '官方公开数据截至 2025 年；于 2026-08-31 通过世界银行 WDI API 获取，历史值可能随源库修订。',
    unit: '%',
    sourceLabel: '世界银行 WDI：NY.GDP.MKTP.KD.ZG',
    sourceUrl: 'https://api.worldbank.org/v2/country/CHN/indicator/NY.GDP.MKTP.KD.ZG?format=json',
    values: [
      { label: '2021', value: 8.57 },
      { label: '2022', value: 3.13 },
      { label: '2023', value: 5.42 },
      { label: '2024', value: 4.96 },
      { label: '2025', value: 4.96 },
    ],
  }
}

function buildCode(input: DeepContentInput): DisciplineCodeExample {
  if (input.discipline.slug === 'economics') {
    return {
      title: 'Stata：从 WDI 下载数据到双向固定效应回归',
      language: 'stata',
      code: `clear all
set more off

* 首次运行时安装
ssc install wbopendata, replace
ssc install reghdfe, replace

* 下载公开数据
wbopendata, indicator(NY.GDP.PCAP.KD; IT.NET.USER.ZS; NE.GDI.FTOT.ZS) long clear
rename ny_gdp_pcap_kd gdp_pc
rename it_net_user_zs internet
rename ne_gdi_ftot_zs investment

keep if inrange(year, 2000, 2022)
drop if missing(gdp_pc, internet, investment)
gen lngdp = ln(gdp_pc)
encode countrycode, gen(country_id)
isid country_id year
xtset country_id year

summarize lngdp internet investment
reghdfe lngdp internet investment, absorb(country_id year) vce(cluster country_id)`,
      note: `把变量和年份替换成“${input.specialty}—${input.stage.title}—${input.task.title}”的实际研究设定；运行后先检查样本量、重复值和变量单位，再解释系数。`,
    }
  }

  return {
    title: 'Stata：上市公司面板数据清洗与双向固定效应示例',
    language: 'stata',
    code: `clear all
set more off
import excel "firm_panel.xlsx", firstrow clear

* 核对公司—年份唯一键
isid firm_id year
xtset firm_id year

* 构造常用变量；请按数据字典核对口径
gen roa = net_profit / total_assets
gen size = ln(total_assets)
gen lev = total_liability / total_assets
gen growth = (revenue - L.revenue) / L.revenue

* 描述统计与异常检查
summarize roa digital_index size lev growth, detail

* 双向固定效应，标准误按公司聚类
ssc install reghdfe, replace
reghdfe roa digital_index size lev growth, absorb(firm_id year) vce(cluster firm_id)`,
    note: `代码是“${input.specialty}—${input.stage.title}—${input.task.title}”的结构示例。真实研究必须根据年报和数据库字段重新定义变量，不能直接把示例输出写进论文。`,
  }
}

export function buildEconManagementDeepContent(
  input: DeepContentInput
): Pick<
  DisciplineArticle,
  'sections' | 'caseStudy' | 'chart' | 'codeExample' | 'references' | 'readingMinutes'
> | null {
  if (!['economics', 'management'].includes(input.discipline.slug)) return null

  return {
    sections: buildSections(input),
    caseStudy: buildCaseStudy(input),
    chart: buildChart(input),
    codeExample: buildCode(input),
    references:
      input.discipline.slug === 'economics'
        ? [
            {
              label: '世界银行 World Development Indicators',
              url: 'https://databank.worldbank.org/source/world-development-indicators',
            },
            { label: '国家统计局国家数据', url: 'https://data.stats.gov.cn/' },
            {
              label: 'Stata xtreg 面板数据文档',
              url: 'https://www.stata.com/manuals/xtxtreg.pdf',
            },
          ]
        : [
            { label: '巨潮资讯网', url: 'https://www.cninfo.com.cn/' },
            { label: '国家统计局国家数据', url: 'https://data.stats.gov.cn/' },
            { label: '上海证券交易所披露平台', url: 'https://www.sse.com.cn/disclosure/' },
          ],
    readingMinutes: 22 + (input.sequence % 6),
  }
}
