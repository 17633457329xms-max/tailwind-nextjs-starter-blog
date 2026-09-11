import Image from 'next/image'

const socialProfiles = [
  {
    name: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/645759d6000000001f031343',
    icon: '/images/social/xiaohongshu.webp',
  },
  {
    name: '抖音',
    href: 'https://www.douyin.com/user/self',
    icon: '/images/social/douyin.webp',
  },
  {
    name: 'B站',
    href: 'https://space.bilibili.com/85604534/upload/video',
    icon: '/images/social/bilibili.webp',
  },
  {
    name: '快手',
    href: 'https://www.kuaishou.com/profile/3xbb6c3efcvubrc',
    icon: '/images/social/kuaishou.webp',
  },
]

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
          className="inline-flex size-7 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:scale-110"
        >
          <Image src={profile.icon} alt="" width={22} height={22} aria-hidden="true" />
        </a>
      ))}
    </span>
  )
}
