// app/api/auth/login/route.ts

import { AuthService } from '@/service/auth-service';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  console.log('🔥 LOGIN ROUTE HIT');
  console.log('URL:', request.url);
  console.log('Headers:', Object.fromEntries(request.headers));
  try {
    const credentials = await request.json();

    const { data, headers } = await AuthService.nextLogin(credentials);

    const authToken = headers['access-token'];

    if (!authToken) {
      return Response.json({ error: 'No token received' }, { status: 500 });
    }

    const cookieStore = await cookies();
    cookieStore.set('auth-token', authToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return Response.json(data);
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
