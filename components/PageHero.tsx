import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}

export default function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-blue-950 px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
      <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-28 -left-16 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="relative max-w-3xl">
        <p className="mb-4 text-sm font-bold tracking-[0.2em] text-amber-300">{eyebrow}</p>
        <h1 className="text-3xl leading-tight font-black tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">{description}</p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}
