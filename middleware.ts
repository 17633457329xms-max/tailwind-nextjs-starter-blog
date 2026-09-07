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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isInternalAsset = pathname.startsWith('/_next/') || pathname.startsWith('/static/')
  const isDisciplineRoute = pathname === '/disciplines' || pathname.startsWith('/disciplines/')

  if (standaloneRoutes.has(pathname) || isInternalAsset || isDisciplineRoute) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url), 307)
}

export const config = {
  matcher: '/:path*',
}
