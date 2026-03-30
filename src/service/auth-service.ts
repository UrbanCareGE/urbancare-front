import { api, ApiResponse } from '@/lib/api-client';
import {
  ChatDTO,
  GenerateOtpDTO,
  LoginDTO,
  LoginWithOtpDTO,
  RegisterDTO,
  UserDTO,
} from '@/model/dto/auth.dto';

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
  loginWithOtp: async (loginReq: LoginWithOtpDTO): Promise<UserDTO> => {
    const { data } = await api.post<UserDTO, LoginWithOtpDTO>(
      '/api/next/auth/login-otp',
      loginReq
    );
    return data;
  },
  nextLoginWithOtp: async (
    loginReq: LoginWithOtpDTO
  ): Promise<ApiResponse<UserDTO>> => {
    return await api.post<UserDTO, LoginWithOtpDTO>(
      '/auth/otp/login',
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
      '/auth/register',
      registerDTO,
      {
        server: true,
      }
    );
    return data;
  },
  generateOtp: async (generateOtpDTO: GenerateOtpDTO): Promise<void> => {
    await api.post<void, GenerateOtpDTO>('/api/next/auth/otp', generateOtpDTO);
  },
  nextGenerateOtp: async (generateOtpDTO: GenerateOtpDTO): Promise<void> => {
    await api.post<void, GenerateOtpDTO>('/auth/otp/send', generateOtpDTO, {
      server: true,
    });
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
