// middleware.ts
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const RouteConfig = {
    // Public routes that don't require authentication
    public: [
        '/',
        '/post',
        '/auth/login',
        '/auth/register',
        '/register',
        '/forgot-password',
        '/reset-password',
    ],

    // Protected routes requiring authentication
    protected: [
        // '/',
        // '/urgent',
        // '/post',
    ],

    // Admin-only routes
    admin: [
        '/admin',
    ],

    // Routes authenticated users shouldn't access (like login page)
    authOnly: [
        '/auth/login',
        '/auth/register',
    ],
};

// Helper to check if path matches route patterns
function matchesRoute(pathname: string, routes: string[]): boolean {
    return routes.some(route => {
        // Exact match
        if (pathname === route) return true;

        // Wildcard match (e.g., /dashboard/* matches /dashboard/anything)
        if (route.endsWith('/*')) {
            const baseRoute = route.slice(0, -2);
            return pathname.startsWith(baseRoute);
        }

        // Nested route match (e.g., /dashboard matches /dashboard/settings)
        return pathname.startsWith(route + '/');
    });
}

// Verify token and extract user data (customize based on your auth implementation)
async function verifyAuthToken(token: string): Promise<{
    isValid: boolean;
    user?: { id: string; role: string; email: string };
}> {
    try {
        // Example: JWT verification
        // In production, verify with your auth service or JWT library
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // For demonstration - replace with actual verification
        if (!token) {
            return {isValid: false};
        }

        // TODO remove this and add jwt verification on sevrer side
        // Simulate token verification
        // In real implementation, decode JWT or validate with your auth service
        return {
            isValid: true,
            user: {
                id: 'user123',
                role: 'user', // or 'admin'
                email: 'user@example.com',
            },
        };
    } catch (error) {
        return {isValid: false};
    }
}

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    const authToken = request.cookies.get('auth-token')?.value;

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const {isValid, user} = await verifyAuthToken(authToken || '');

    // Handle protected routes
    if (matchesRoute(pathname, RouteConfig.protected)) {
        if (!isValid) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Handle admin routes
    if (matchesRoute(pathname, RouteConfig.admin)) {
        if (!isValid) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }

        if (user?.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // Redirect authenticated users away from auth pages
    if (isValid && matchesRoute(pathname, RouteConfig.authOnly)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Add user info to headers for server components (optional)
    const response = NextResponse.next();
    if (isValid && user) {
        response.headers.set('x-user-id', user.id);
        response.headers.set('x-user-role', user.role);
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
    ],
};