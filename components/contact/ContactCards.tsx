'use client'

import Image from 'next/image'
import { useState } from 'react'

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void }
  }
}

const contacts = [
  {
    type: 'wechat',
    title: '微信咨询',
    description: '微信号：quietnode_73，添加时请备注“论文阶段 + 研究方向”。',
    id: 'quietnode_73',
    image: '/static/images/contact/wechat.jpg',
    width: 928,
    height: 1380,
  },
  {
    type: 'qq',
    title: 'QQ咨询',
    description: 'QQ：2176319486，添加时请简要说明当前问题。',
    id: '2176319486',
    image: '/static/images/contact/qq.png',
    width: 1220,
    height: 1478,
  },
]

export default function ContactCards({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState<string | null>(null)

  const track = (event: string, type: string) => window.umami?.track(event, { type })

  const copyId = async (type: string, id: string) => {
    await navigator.clipboard.writeText(id)
    setCopied(type)
    track('contact_id_copy', type)
    window.setTimeout(() => setCopied(null), 1800)
  }

  return (
    <div className={`grid gap-5 ${compact ? 'md:grid-cols-2' : 'lg:grid-cols-2'}`}>
      {contacts.map((contact) => (
        <article
          key={contact.type}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mt-auto p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-slate-950 dark:text-white">{contact.title}</h2>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                {contact.type === 'wechat' ? '微信' : 'QQ'}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {contact.description}
            </p>
          </div>
          <button
            type="button"
            className="block w-full border-y border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
            onClick={() => track('contact_qr_view', contact.type)}
            aria-label={`查看${contact.title}二维码`}
          >
            <Image
              src={contact.image}
              alt={`${contact.title}二维码`}
              width={contact.width}
              height={contact.height}
              sizes="(max-width: 768px) 88vw, 420px"
              className={`mx-auto w-full rounded-xl object-contain ${compact ? 'max-h-96' : 'max-h-[34rem]'}`}
              priority={false}
            />
          </button>
          <div className="p-5">
            <button
              type="button"
              onClick={() => copyId(contact.type, contact.id)}
              className="w-full cursor-pointer rounded-xl bg-blue-950 px-4 py-3 text-sm font-bold text-white hover:bg-blue-900"
            >
              {copied === contact.type
                ? `${contact.type === 'wechat' ? '微信号' : 'QQ号'}已复制`
                : `复制${contact.type === 'wechat' ? '微信号' : 'QQ号'} ${contact.id}`}
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
