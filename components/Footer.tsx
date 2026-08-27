import Link from './Link'

const resourceLinks = [
  ['论文选题', '/topics'],
  ['实证方法', '/methods'],
  ['变量数据', '/variables'],
  ['文献检索', '/literature'],
  ['Stata代码', '/stata'],
  ['写作润色', '/writing'],
]

const serviceLinks = [
  ['论文润色', '/polishing'],
  ['咨询辅导', '/consulting'],
  ['服务说明', '/service-standards'],
  ['联系我', '/contact'],
]

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 py-12 dark:border-slate-800">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 font-black text-white">
              谢
            </span>
            <span className="text-lg font-black">谢老师讲论文</span>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
            面向国内经管学生，提供选题、方法、数据、Stata、论文写作与润色优化的知识内容和一对一咨询入口。
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-slate-950 dark:text-white">知识库</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-600 dark:text-slate-400">
            {resourceLinks.map(([title, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-blue-700 dark:hover:text-blue-300">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold text-slate-950 dark:text-white">服务与说明</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            {serviceLinks.map(([title, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-blue-700 dark:hover:text-blue-300">
                  {title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-blue-700 dark:hover:text-blue-300">
                隐私说明
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-700 dark:hover:text-blue-300">
                关于本站
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-500">
        <p>© {new Date().getFullYear()} 谢老师讲论文</p>
        <p>内容持续核验与更新 · 服务信息以咨询确认结果为准</p>
      </div>
    </footer>
  )
}
