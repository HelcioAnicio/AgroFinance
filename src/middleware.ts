import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '../prisma';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const publicPaths = ['/login', '/register', '/api/auth'];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const membership = await prisma.farmMembership.findFirst({
    where: { userId: token.sub },
    include: { farm: true },
  });

  if (!membership) {
    if (pathname !== '/onboarding') {
      const url = request.nextUrl.clone();
      url.pathname = '/onboarding';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const { farm } = membership;
  const isTrialExpired = farm.trialEndsAt && new Date() > farm.trialEndsAt;
  const isBillingPath = pathname.startsWith('/billing');

  if (farm.subscriptionStatus !== 'ACTIVE' && isTrialExpired) {
    if (!isBillingPath) {
      const url = request.nextUrl.clone();
      url.pathname = '/billing';
      return NextResponse.redirect(url);
    }
  } else if (isBillingPath && farm.subscriptionStatus === 'ACTIVE' && !isTrialExpired) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.png|manifest.json|sitemap.xml|robots.txt).*)',
  ],
};
