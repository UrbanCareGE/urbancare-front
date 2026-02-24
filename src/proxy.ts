// proxy.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const RouteConfig = {
  public: [
    '/welcome',
    '/auth/login',
    '/auth/register',
    '/auth/recover-password',
  ],

  protected: ['/apartment/*'],

  authOnly: ['/auth/login', '/auth/register'],
};

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (pathname === route) return true;

    if (route.endsWith('/*')) {
      const baseRoute = route.slice(0, -2);
      return pathname.startsWith(baseRoute);
    }

    return pathname.startsWith(route + '/');
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get('auth-token')?.value;

  if (matchesRoute(pathname, RouteConfig.authOnly)) {
    if (authToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (matchesRoute(pathname, RouteConfig.public)) {
    return NextResponse.next();
  }

  if (matchesRoute(pathname, RouteConfig.protected)) {
    if (!authToken) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
