import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import HeaderNav from './HeaderNav'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import TenantSwitcher from './TenantSwitcher'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 -mx-4 border-b border-black/15 bg-[#f4f1ea]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 xl:-mx-0 xl:px-0 dark:border-white/15 dark:bg-[#111315]/95">
      <div className="flex w-full items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center bg-[#9b3425] font-serif text-lg font-black text-white">
            谢
          </span>
          <span className="hidden font-serif text-lg font-black tracking-tight text-slate-950 sm:block dark:text-white">
            {siteMetadata.headerTitle}
          </span>
        </Link>

        <div className="flex items-center gap-1.5 lg:gap-3">
          <HeaderNav />
          <TenantSwitcher />
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
