import { AuthService } from '@/service/auth-service';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get('phone');

    if (!phone) {
      return Response.json({ error: 'phone is required' }, { status: 400 });
    }

    await AuthService.nextGenerateOtp(phone);
    return Response.json({ status: 200, data: phone });
  } catch (error) {
    console.log('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
