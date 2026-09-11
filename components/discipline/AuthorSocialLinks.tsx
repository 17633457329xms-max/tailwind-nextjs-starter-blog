const socialProfiles = [
  {
    name: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/645759d6000000001f031343',
  },
  { name: 'B站', href: 'https://space.bilibili.com/85604534/upload/video' },
  { name: '抖音', href: 'https://www.douyin.com/user/self' },
  { name: '快手', href: 'https://www.kuaishou.com/profile/3xbb6c3efcvubrc' },
]

export default function AuthorSocialLinks() {
  return (
    <section
      className="mt-8 border border-black/15 bg-slate-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-8 dark:border-white/15 dark:bg-white/5"
      aria-label="作者与社交媒体主页"
    >
      <div className="flex items-start gap-4">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-950 font-serif text-lg font-black text-white dark:bg-slate-100 dark:text-slate-950"
          aria-hidden="true"
        >
          谢
        </span>
        <div>
          <p className="font-serif text-lg font-black">谢老师讲论文</p>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            多篇核心期刊发表经验，可提供大小论文论文辅导
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
        {socialProfiles.map((profile) => (
          <a
            key={profile.name}
            href={profile.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`在新窗口打开谢老师讲论文的${profile.name}主页`}
            className="border border-black/15 px-3 py-1.5 text-sm font-black transition-colors hover:bg-slate-950 hover:text-white dark:border-white/20 dark:hover:bg-slate-100 dark:hover:text-slate-950"
          >
            {profile.name}
          </a>
        ))}
      </div>
    </section>
  )
}
