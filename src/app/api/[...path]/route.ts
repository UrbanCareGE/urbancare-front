// app/api/proxy/[...path]/route.ts

import { cookies } from 'next/headers';

const JAVA_API_URL =
  process.env.NEXT_PUBLIC_JAVA_API_URL || process.env.NEXT_PUBLIC_APP_URL;

async function handleRequest(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  console.log('აქ შემოდის', JAVA_API_URL);
  try {
    console.log(JAVA_API_URL);
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    const resolvedParams = await params;
    const pathSegments = resolvedParams.path;
    const fullPath = pathSegments.join('/');
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const targetUrl = `${JAVA_API_URL}/api/${fullPath}${
      queryString ? `?${queryString}` : ''
    }`;

    const forwardHeaders = new Headers();

    if (token) {
      forwardHeaders.set('Authorization', `Bearer ${token}`);
    }

    const contentType = request.headers.get('content-type');
    if (contentType) {
      forwardHeaders.set('Content-Type', contentType);
    }

    let body: BodyInit | undefined = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      body = await request.arrayBuffer();
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: body,
    });

    const responseData = await response.bytes();

    // Return response
    return new Response(responseData, {
      status: response.status,
      headers: {
        'Content-Type':
          response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (error) {
    console.log('Proxy error:', error);
    return Response.json({ error: 'Proxy request failed' }, { status: 500 });
  }
}

// Export for all HTTP methods
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
