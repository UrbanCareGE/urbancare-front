// app/api/auth/logout/route.ts

import { cookies } from 'next/headers';

export async function POST() {
    // Delete the cookie
    (await cookies()).delete('auth-token');

    return Response.json({ success: true });
}