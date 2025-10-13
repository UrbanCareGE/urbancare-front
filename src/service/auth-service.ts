import {api} from '@/lib/api-client';

export const AuthService = {
    login: async (loginReq: LoginReq): Promise<string> => {
        await api.post<{ success: boolean }, LoginReq>(
            '/api/auth/login',
            loginReq
        );

        return 'success';
    },

    register: async (registerDTO: RegisterReq): Promise<string> => {
        const response = await api.post<{ token?: string }, RegisterReq>(
            '/auth/register',
            registerDTO
        );

        return response.token || '';
    },

    generateOtp: async (contact: string): Promise<string> => {
        return api.post<string>(
            '/auth/otp/generate',
            undefined,
            {params: {contact}}
        );
    },

    getUser: async (): Promise<unknown> => {
        return api.get<unknown>('/api/user/me');
    },

    googleOauth: async (): Promise<unknown> => {
        return api.get<void>('/oauth2/authentication/google');
    }
};
