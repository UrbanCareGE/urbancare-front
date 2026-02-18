// proxy.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const RouteConfig = {
  public: ['/auth/login', '/auth/register'],

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
  console.log(`Proxying ${pathname}`);

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  console.log('ak movida');

  const authToken = request.cookies.get('auth-token')?.value;

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

  console.log('akac');

  return NextResponse.next();
}
