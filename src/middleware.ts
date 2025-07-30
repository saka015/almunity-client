import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/account', '/profile', '/explore-alumi'];
const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  console.log('Middleware - Proceeding with request');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/explore-alumi',
    '/dashboard/:path*',
    '/account/:path*',
    '/profile/:path*',
    '/login',
    '/register',
  ],
};
