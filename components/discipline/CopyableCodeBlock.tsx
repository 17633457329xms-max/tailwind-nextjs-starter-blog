'use client'

import { useState } from 'react'

type CopyableCodeBlockProps = {
  code: string
  language: string
  title: string
  note: string
  color: string
}

export default function CopyableCodeBlock({
  code,
  language,
  title,
  note,
  color,
}: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="not-prose mb-10 border border-black/15 dark:border-white/15">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/15 px-5 py-4 dark:border-white/15">
        <div>
          <p className="text-xs font-black tracking-widest" style={{ color }}>
            可复现代码示例
          </p>
          <h2 className="mt-1 font-serif text-xl font-black">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="border border-black/15 px-2 py-1 text-xs font-black dark:border-white/15">
            {language}
          </span>
          <button
            type="button"
            onClick={copy}
            className="cursor-pointer border px-3 py-1.5 text-xs font-black transition hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            style={{ borderColor: color }}
            aria-label={`复制${title}代码`}
          >
            {copied ? '已复制' : '复制代码'}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto bg-slate-950 p-5 text-sm leading-6 text-slate-100">
        <code>{code}</code>
      </pre>
      <p className="px-5 pb-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{note}</p>
    </section>
  )
}
