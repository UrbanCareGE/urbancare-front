import { api, ApiResponse } from '@/lib/api-client';
import { ChatDTO, LoginDTO, RegisterDTO, UserDTO } from '@/model/auth.dto';

export const AuthService = {
  login: async (loginReq: LoginDTO): Promise<UserDTO> => {
    const { data } = await api.post<UserDTO, LoginDTO>(
      '/api/next/auth/login',
      loginReq
    );
    return data;
  },
  nextLogin: async (loginReq: LoginDTO): Promise<ApiResponse<UserDTO>> => {
    return await api.post<UserDTO, LoginDTO>('/auth/login', loginReq, {
      server: true,
    });
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
      '/auth/register',
      registerDTO,
      {
        server: true,
      }
    );
    return data;
  },
  generateOtp: async (phone: string): Promise<string> => {
    const { data } = await api.post<string>('/public/otp/generate', undefined, {
      params: { phone },
    });
    return data;
  },
  getUserInfo: async (): Promise<UserDTO> => {
    const { data } = await api.get<UserDTO>('/api/user/me');
    return data;
  },
  nextGetUserInfo: async (authToken: string): Promise<UserDTO> => {
    const { data } = await api.get<UserDTO>('/api/user/me', {
      server: true,
      authToken,
      headers: {
        cache: 'no-store',
      },
    });
    return data;
  },
  getChatInfo: async (apartmentId: string): Promise<ChatDTO[]> => {
    const { data } = await api.get<ChatDTO[]>(
      `/api/apartment/${apartmentId}/chat/list`
    );
    return data;
  },
  logout: async (): Promise<void> => {
    const { data } = await api.post<void, void>('/api/next/auth/logout');
    return data;
  },
};
