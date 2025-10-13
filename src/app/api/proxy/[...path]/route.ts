// app/api/proxy/[...path]/route.ts

import {cookies} from 'next/headers';

const JAVA_API_URL = process.env.JAVA_API_URL || 'http://localhost:8080';

async function handleRequest(
    request: Request,
    {params}: { params: { path: string[] } }
) {
    try {
        // Extract token from cookie
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        // Build target URL
        const pathSegments = params.path;
        const fullPath = pathSegments.join('/');
        const {searchParams} = new URL(request.url);
        const queryString = searchParams.toString();

        const targetUrl = `${JAVA_API_URL}/${fullPath}${
            queryString ? `?${queryString}` : ''
        }`;

        // Prepare headers
        const forwardHeaders = new Headers();

        // Add Authorization header with token from cookie
        if (token) {
            forwardHeaders.set('Authorization', `Bearer ${token}`);
        }

        // Forward content-type if present
        const contentType = request.headers.get('content-type');
        if (contentType) {
            forwardHeaders.set('Content-Type', contentType);
        }

        // Handle request body for POST/PUT/PATCH
        let body = undefined;
        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
            body = await request.text();
        }

        // Make proxied request to Java API
        const response = await fetch(targetUrl, {
            method: request.method,
            headers: forwardHeaders,
            body: body,
        });

        // Get response data
        const responseData = await response.text();

        // Return response
        return new Response(responseData, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('content-type') || 'application/json',
            },
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return Response.json(
            {error: 'Proxy request failed'},
            {status: 500}
        );
    }
}

// Export for all HTTP methods
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;