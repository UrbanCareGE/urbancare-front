import { AuthService } from '@/service/auth-service';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const phoneData = await request.json();

    await AuthService.nextGenerateOtp(phoneData);
    return Response.json({ status: 200, data: phoneData });
  } catch (error) {
    console.log('Login error:', error);
    return Response.json({ error: error }, { status: 500 });
  }
}
