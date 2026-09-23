import { NextRequest, NextResponse } from 'next/server'

const standaloneRoutes = new Set([
  '/',
  '/about',
  '/consulting',
  '/contact',
  '/economics-management',
  '/polishing',
  '/privacy',
  '/service-standards',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
])

// 纯静态资源与站点验证文件（如搜索引擎验证文件、llms.txt）需直接放行，
// 否则会被重定向到首页，导致验证失败、AI 爬虫无法读取。
const staticFilePattern = /\.(txt|xml|html|ico|png|jpe?g|svg|webp|gif|json|webmanifest|rss)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isInternalAsset = pathname.startsWith('/_next/') || pathname.startsWith('/static/')
  const isDisciplineRoute = pathname === '/disciplines' || pathname.startsWith('/disciplines/')
  const isStaticFile = staticFilePattern.test(pathname)

  if (standaloneRoutes.has(pathname) || isInternalAsset || isDisciplineRoute || isStaticFile) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url), 307)
}

export const config = {
  matcher: '/:path*',
}
