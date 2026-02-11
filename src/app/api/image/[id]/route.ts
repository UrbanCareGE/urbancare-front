import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const JAVA_API_URL = process.env.JAVA_API_URL || 'http://localhost:8080';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    const targetUrl = `${JAVA_API_URL}/api/secure/file/${id}`;

    const response = await fetch(targetUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!response.ok) {
      return new NextResponse('Image not found', { status: response.status });
    }

    const imageData = await response.bytes();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(imageData, {
      headers: {
        'Content-Type': contentType,
        // Aggressive caching - images won't change once uploaded
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
