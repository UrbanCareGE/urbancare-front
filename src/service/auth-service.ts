import {api} from '@/lib/api-client';
import {ChatDTO, LoginDTO, RegisterDTO, UserDTO} from "@/model/auth.dto";
import {SuccessDTO} from "@/model/common.dto";

export const AuthService = {
    login: async (loginReq: LoginDTO): Promise<string> => {
        await api.post<SuccessDTO, LoginDTO>(
            '/api/next/auth/login',
            loginReq
        );

        return 'success';
    },
    nextLogin: async (loginReq: LoginDTO): Promise<string> => {
        return await api.post<string, LoginDTO>(
            '/api/auth/login',
            loginReq,
            {
                server: true,
            }
        );
    },
    register: async (registerDTO: RegisterDTO): Promise<string> => {
        const response = await api.post<{ token?: string }, RegisterDTO>(
            '/api/next/auth/register',
            registerDTO
        );

        return response.token || '';
    },
    nextRegister: async (registerDTO: RegisterDTO): Promise<string> => {
        return await api.post<string, RegisterDTO>(
            '/api/auth/register',
            registerDTO,
            {
                server: true,
            }
        );
    },
    generateOtp: async (phone: string): Promise<string> => {
        return api.post<string>(
            '/api/otp/generate',
            undefined,
            {params: {phone}}
        );
    },
    getUserInfo: async (): Promise<UserDTO> => {
        return api.get<UserDTO>('/api/secure/user/me');
    },
    getChatInfo: async (apartmentId: string): Promise<ChatDTO[]> => {
        return api.get<ChatDTO[]>(`/api/secure/chat/${apartmentId}/list`);
    },
    googleOauth: async (): Promise<unknown> => {
        return api.get<void>('/oauth2/authentication/google');
    },
    logout: async (): Promise<void> => {
        return api.post<void, void>('/api/next/auth/logout');
    }
};