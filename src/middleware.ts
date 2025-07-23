import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/account', '/profile', '/explore-alumi'];
const publicRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  console.log('Middleware - Pathname:', pathname);
  console.log('Middleware - Token:', token ? 'Present' : 'Missing');
  console.log('Middleware - All cookies:', request.cookies.getAll().map(c => ({ name: c.name, value: c.value ? 'Present' : 'Empty' })));
  console.log('Middleware - Request URL:', request.url);
  console.log('Middleware - Request headers:', Object.fromEntries(request.headers.entries()));

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    console.log('Middleware - Redirecting to login, no token found');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    console.log('Middleware - Redirecting to dashboard, token found');
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
