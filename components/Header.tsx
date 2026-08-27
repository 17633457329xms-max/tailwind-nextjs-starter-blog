import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 -mx-4 border-b border-slate-200/80 bg-[#f8fafc]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 xl:-mx-0 xl:px-0 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex w-full items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-lg font-black text-white shadow-sm">
            谢
          </span>
          <span className="hidden text-lg font-black tracking-tight text-slate-950 sm:block dark:text-white">
            {siteMetadata.headerTitle}
          </span>
        </Link>

        <div className="flex items-center gap-1.5 lg:gap-3">
          <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-blue-800 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-blue-300"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
