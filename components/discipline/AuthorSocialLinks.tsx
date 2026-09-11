type Platform = '小红书' | 'B站' | '抖音' | '快手'

const socialProfiles: { name: Platform; href: string }[] = [
  {
    name: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/645759d6000000001f031343',
  },
  { name: '抖音', href: 'https://www.douyin.com/user/self' },
  { name: 'B站', href: 'https://space.bilibili.com/85604534/upload/video' },
  { name: '快手', href: 'https://www.kuaishou.com/profile/3xbb6c3efcvubrc' },
]

function PlatformIcon({ name }: { name: Platform }) {
  if (name === '小红书') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5 fill-none stroke-current stroke-[2]"
      >
        <rect x="4" y="5.5" width="16" height="13" rx="2" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    )
  }

  if (name === 'B站') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5 fill-none stroke-current stroke-[2.2]"
      >
        <path d="M5 7.5h14v9H5zM8 4.5l2 3M16 4.5l-2 3M9 11.5l2 1.5-2 1.5M15 11.5l-2 1.5 2 1.5" />
      </svg>
    )
  }

  if (name === '抖音') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M14.1 3h2.6c.2 2.3 1.5 3.9 3.3 4.5v2.7c-1.3-.1-2.5-.5-3.5-1.2v6.3a5.4 5.4 0 1 1-5.4-5.4c.4 0 .8 0 1.2.1v2.7a2.7 2.7 0 1 0 1.8 2.5V3Z" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5 fill-none stroke-current stroke-[2]"
    >
      <path d="M4.5 8.5h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3ZM17.5 11l4-2v9l-4-2" />
      <circle cx="7" cy="13.5" r="1" />
      <circle cx="12" cy="13.5" r="1" />
    </svg>
  )
}

export default function AuthorSocialLinks() {
  return (
    <span className="inline-flex items-center gap-2" aria-label="作者社交媒体主页">
      {socialProfiles.map((profile) => (
        <a
          key={profile.name}
          href={profile.href}
          target="_blank"
          rel="noreferrer"
          title={`谢老师讲论文的${profile.name}主页`}
          aria-label={`在新窗口打开谢老师讲论文的${profile.name}主页`}
          className="inline-flex size-7 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-950 hover:text-white dark:text-slate-300 dark:hover:bg-slate-100 dark:hover:text-slate-950"
        >
          <PlatformIcon name={profile.name} />
        </a>
      ))}
    </span>
  )
}
