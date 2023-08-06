import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware (req) {
    if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 0) {
      return NextResponse.rewrite(
        new URL('/auth/unauthorized', req.url)
      )
    }
    if (req.nextUrl.pathname.startsWith('/artist') && req.nextauth.token?.role !== 1) {
      return NextResponse.rewrite(
        new URL('/auth/unauthorized', req.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !(token == null)
    }
  }
)
export const config = {
  matcher: [
    '/admin/:path*',
    '/artist/:path*'
  ]
}
