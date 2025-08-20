import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { log, logError } from './app/utils/logger';
import { cookies } from 'next/headers';
import axiosInstance from './app/axiosInstance';

export async function middleware(request: NextRequest) {
  log('Middleware request url', request.url);

  const cookieStore = await cookies();

  const authToken = cookieStore.get('auth-token');
  log('Auth token ', authToken);

  const url = new URL(request.url);
  // log('middleware Request ', url.pathname);

  if (!authToken?.value) {
    const redirectUrl = new URL('/login', request.url)
    cookieStore.set("redirectUrl", url.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const resp = await axiosInstance.post('/api/verify/tokenVerify');
    const tokenResponse = resp.data;

    log('Token Response ', tokenResponse);

    return NextResponse.next();
  } catch (err) {
    logError(err);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/movies/:path*',
    '/about',
  ],
}
