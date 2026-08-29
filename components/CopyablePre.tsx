'use client'

import Pre from 'pliny/ui/Pre'
import { isValidElement, useState, type ComponentProps, type ReactNode } from 'react'

function codeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(codeText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return codeText(node.props.children)
  return ''
}

export default function CopyablePre({ children, ...props }: ComponentProps<typeof Pre>) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(codeText(children))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={copy}
        className="absolute top-3 right-3 z-10 cursor-pointer rounded border border-slate-500/70 bg-slate-900/90 px-2.5 py-1 text-xs font-bold text-slate-100 opacity-100 shadow-sm transition hover:bg-slate-700 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label="复制代码"
      >
        {copied ? '已复制' : '复制代码'}
      </button>
      <Pre {...props}>{children}</Pre>
    </div>
  )
}
