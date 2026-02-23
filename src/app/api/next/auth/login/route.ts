import { cookies } from 'next/headers';
import { AuthService } from '@/service/auth-service';

export async function POST(request: Request) {
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
      secure: true,
      sameSite: 'none',
    });

    return Response.json(data);
  } catch (error) {
    console.error('Login error:', error);
    console.log()
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
