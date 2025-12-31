import {api, ApiResponse} from '@/lib/api-client';
import {ChatDTO, LoginDTO, RegisterDTO, UserDTO} from "@/model/auth.dto";

export const AuthService = {
    login: async (loginReq: LoginDTO): Promise<UserDTO> => {
        const { data } = await api.post<UserDTO, LoginDTO>(
            '/api/next/auth/login',
            loginReq
        );
        return data;
    },
    nextLogin: async (loginReq: LoginDTO): Promise<ApiResponse<UserDTO>> => {
        return await api.post<UserDTO, LoginDTO>(
            '/api/auth/login',
            loginReq,
            {
                server: true,
            }
        );
    },
    register: async (registerDTO: RegisterDTO): Promise<string> => {
        const { data } = await api.post<{ token?: string }, RegisterDTO>(
            '/api/next/auth/register',
            registerDTO
        );

        return data.token || '';
    },
    nextRegister: async (registerDTO: RegisterDTO): Promise<string> => {
        const { data } = await api.post<string, RegisterDTO>(
            '/api/auth/register',
            registerDTO,
            {
                server: true,
            }
        );
        return data;
    },
    generateOtp: async (phone: string): Promise<string> => {
        const { data } = await api.post<string>(
            '/api/otp/generate',
            undefined,
            {params: {phone}}
        );
        return data;
    },
    getUserInfo: async (): Promise<UserDTO> => {
        const { data } = await api.get<UserDTO>('/api/secure/user/me');
        return data;
    },
    nextGetUserInfo: async (authToken: string): Promise<UserDTO> => {
        const { data } = await api.get<UserDTO>('/api/secure/user/me', {
            server: true,
            authToken,
            headers: {
                cache: 'no-store',
            }
        });
        return data;
    },
    getChatInfo: async (apartmentId: string): Promise<ChatDTO[]> => {
        const { data } = await api.get<ChatDTO[]>(`/api/secure/chat/${apartmentId}/list`);
        return data;
    },
    googleOauth: async (): Promise<unknown> => {
        const { data } = await api.get<void>('/oauth2/authentication/google');
        return data;
    },
    logout: async (): Promise<void> => {
        const { data } = await api.post<void, void>('/api/next/auth/logout');
        return data;
    }
};