import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (pathname === '/dashboard' && !search.includes('startDate')) {
    const redirectUrl = new URL('/dashboard?startDate=2025-02-27&endDate=2025-03-29', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return await updateSession(request)
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/login', '/'],
}
