import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isValidJWT } from '@/lib/jwt';

// Define public routes that don't require authentication
const publicRoutes = ['/admin/login'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname === route);

  // If it's a public route (like login) and user is authenticated, redirect to admin dashboard
  if (isPublicRoute && token && isValidJWT(token)) {
    return NextResponse.redirect(new URL('/admin/(dashboard)', request.url));
  }

  // If it's not a public route and user is not authenticated, redirect to login
  if (!isPublicRoute && (!token || !isValidJWT(token))) {
    const redirectUrl = new URL('/admin/login', request.url);
    // Add the original URL as a callback parameter
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
