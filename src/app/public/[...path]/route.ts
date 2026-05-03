const JAVA_API_URL =
  process.env.NEXT_PUBLIC_JAVA_API_URL || process.env.NEXT_PUBLIC_APP_URL;

async function handleRequest(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams.path;
    const fullPath = pathSegments.join('/');
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    const targetUrl = `${JAVA_API_URL}/public/${fullPath}${
      queryString ? `?${queryString}` : ''
    }`;

    const forwardHeaders = new Headers();

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

    return new Response(responseData, {
      status: response.status,
      headers: {
        'Content-Type':
          response.headers.get('content-type') || 'application/json',
      },
    });
  } catch {
    return Response.json({ error: 'Proxy request failed' }, { status: 409 });
  }
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
