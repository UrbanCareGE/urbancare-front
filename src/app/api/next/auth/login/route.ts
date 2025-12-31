// app/api/auth/login/route.ts

import {AuthService} from "@/service/auth-service";

export async function POST(request: Request) {
    try {
        const credentials = await request.json();

        const {data, headers} = await AuthService.nextLogin(credentials)

        const authToken = headers['access-token'];

        if (!authToken) {
            return Response.json(
                {error: 'No token received'},
                {status: 500}
            );
        }

        const jsonResponse = Response.json(data);

        jsonResponse.headers.set(
            'Set-Cookie',
            `auth-token=${authToken}; Path=/; Max-Age=${60 * 60 * 24 * 7}; HttpOnly; SameSite=Lax`
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