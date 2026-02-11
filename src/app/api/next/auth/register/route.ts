import { AuthService } from '@/service/auth-service';
import { RegisterDTO } from '@/model/auth.dto';

export async function POST(request: Request) {
  try {
    const credentials: RegisterDTO = await request.json();

    const authToken = await AuthService.nextRegister(credentials);

    if (!authToken) {
      return Response.json({ error: 'No token received' }, { status: 500 });
    }

    const jsonResponse = Response.json({ success: true });

    jsonResponse.headers.set(
      'Set-Cookie',
      `auth-token=${authToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax`
    );

    return jsonResponse;
  } catch (error) {
    console.log('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
