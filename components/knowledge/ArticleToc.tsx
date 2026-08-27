interface TocItem {
  value: string
  url: string
  depth: number
}

interface ArticleTocProps {
  items: TocItem[]
  mobile?: boolean
}

export default function ArticleToc({ items, mobile = false }: ArticleTocProps) {
  const links = (
    <ol className="mt-4 space-y-3 border-l border-black/15 pl-4 text-sm leading-6 dark:border-white/15">
      {items.map((item) => (
        <li key={item.url} className={item.depth > 2 ? 'pl-3 text-xs' : ''}>
          <a
            href={item.url}
            className="text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            {item.value}
          </a>
        </li>
      ))}
    </ol>
  )

  if (mobile) {
    return (
      <details className="mb-10 border-y border-black/15 py-4 xl:hidden dark:border-white/15">
        <summary className="cursor-pointer font-bold">本文目录</summary>
        {links}
      </details>
    )
  }

  return (
    <nav className="sticky top-24 hidden xl:block" aria-label="文章目录">
      <p className="font-serif text-lg font-black">本文目录</p>
      {links}
    </nav>
  )
}
