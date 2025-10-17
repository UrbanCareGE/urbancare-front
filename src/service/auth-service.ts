import {api} from '@/lib/api-client';
import {Chat, LoginReq, RegisterReq, User} from "@/model/auth.dto";

export const AuthService = {
    login: async (loginReq: LoginReq): Promise<string> => {
        await api.post<{ success: boolean }, LoginReq>(
            '/api/next/auth/login',
            loginReq
        );

        return 'success';
    },

    register: async (registerDTO: RegisterReq): Promise<string> => {
        const response = await api.post<{ token?: string }, RegisterReq>(
            '/api/next/auth/register',
            registerDTO
        );

        return response.token || '';
    },

    generateOtp: async (phone: string): Promise<string> => {
        return api.post<string>(
            '/api/otp/generate',
            undefined,
            {params: {phone}}
        );
    },

    getUser: async (): Promise<User> => {
        return api.get<User>('/api/secure/user/me');
    },

    getChatInfo: async (apartmentId: string): Promise<Chat[]> => {
        return api.get<Chat[]>(`/api/secure/chat/${apartmentId}/list`);
    },

    googleOauth: async (): Promise<unknown> => {
        return api.get<void>('/oauth2/authentication/google');
    }
};