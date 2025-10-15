import {api} from '@/lib/api-client';
import {Chat, LoginReq, RegisterReq, User} from "@/model/auth.dto";

export const AuthService = {
    login: async (loginReq: LoginReq): Promise<string> => {
        console.log('loginReq', loginReq);
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
            '/api/proxy/auth/otp/generate',
            undefined,
            {params: {contact}}
        );
    },

    getUser: async (): Promise<User> => {
        return api.get<User>('/api/proxy/api/user/me');
    },

    getChatInfo: async (apartmentId: string): Promise<Chat[]> => {
        return api.get<Chat[]>(`/api/proxy/api/chat/${apartmentId}/list`);
    },

    googleOauth: async (): Promise<unknown> => {
        return api.get<void>('/oauth2/authentication/google');
    }
};