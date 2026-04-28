import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_ROUTES = ['/', '/login', '/register'];
const DASHBOARD_ROUTE = '/dashboard';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = Boolean(token);
  const isDashboardRoute =
    pathname === DASHBOARD_ROUTE || pathname.startsWith(`${DASHBOARD_ROUTE}/`);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (!isAuthenticated && isDashboardRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|manifest.json|sitemap.xml|robots.txt).*)',
  ],
};
