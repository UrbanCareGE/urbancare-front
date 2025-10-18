// app/api/auth/login/route.ts

const JAVA_API_URL = process.env.JAVA_API_URL || 'http://localhost:8080';

export async function POST(request: Request) {
    try {
        const credentials = await request.json();

        const response = await fetch(`${JAVA_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            return Response.json(
                {error: 'Register failed'},
                {status: response.status}
            );
        }

        // Extract token from response body
        const token = await response.text();

        if (!token) {
            return Response.json(
                {error: 'No token received'},
                {status: 500}
            );
        }

        const jsonResponse = Response.json({success: true});

        jsonResponse.headers.set(
            'Set-Cookie',
            `auth-token=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax`
        );

        return jsonResponse;
    } catch (error) {
        console.log('Login error:', error);
        return Response.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}