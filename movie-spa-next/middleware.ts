import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("Middleware", request.url);
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/about/:path*',
}
