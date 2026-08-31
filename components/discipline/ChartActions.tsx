'use client'

import { useState } from 'react'

type ChartValue = { label: string; value: number }

export default function ChartActions({
  title,
  unit,
  values,
}: {
  title: string
  unit: string
  values: ChartValue[]
}) {
  const [message, setMessage] = useState('')

  const copyData = async () => {
    const text = [`指标\t${unit}`, ...values.map((item) => `${item.label}\t${item.value}`)].join(
      '\n'
    )
    try {
      await navigator.clipboard.writeText(text)
      setMessage('表格数据已复制')
    } catch {
      setMessage('复制失败，请手动选择数据')
    }
    window.setTimeout(() => setMessage(''), 2200)
  }

  const copyImage = async () => {
    const svg = document.querySelector<SVGSVGElement>('[data-chart-svg]')
    if (!svg || !navigator.clipboard?.write) {
      setMessage('当前浏览器不支持图片复制，请使用截图')
      return
    }
    try {
      const source = new XMLSerializer().serializeToString(svg)
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const image = new Image()
      image.onload = async () => {
        const canvas = document.createElement('canvas')
        const scale = 2
        canvas.width = svg.viewBox.baseVal.width * scale
        canvas.height = svg.viewBox.baseVal.height * scale
        const context = canvas.getContext('2d')
        if (!context) throw new Error('canvas unavailable')
        context.fillStyle = getComputedStyle(svg).backgroundColor || '#ffffff'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        URL.revokeObjectURL(url)
        const png = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'))
        if (!png) throw new Error('png unavailable')
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })])
        setMessage('图表图片已复制')
        window.setTimeout(() => setMessage(''), 2200)
      }
      image.onerror = () => {
        URL.revokeObjectURL(url)
        setMessage('图片复制失败，请使用截图')
      }
      image.src = url
    } catch {
      setMessage('图片复制失败，请使用截图')
    }
  }

  return (
    <div className="mt-3 flex max-w-full flex-wrap items-center justify-start gap-2">
      <button
        type="button"
        onClick={copyImage}
        className="border border-current/25 px-3 py-1.5 text-xs font-semibold hover:bg-black/5"
      >
        一键复制图片
      </button>
      <button
        type="button"
        onClick={copyData}
        className="border border-current/25 px-3 py-1.5 text-xs font-semibold hover:bg-black/5"
      >
        一键复制数据
      </button>
      <span className="text-xs text-slate-500" role="status" aria-live="polite">
        {message}
      </span>
      <span className="sr-only">{title}</span>
    </div>
  )
}
