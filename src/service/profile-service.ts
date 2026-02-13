import { api } from '@/lib/api-client';
import {
  UpdateProfileDTO,
  UpdateProfileImageDTO,
  ChangePasswordDTO,
  UserDTO,
} from '@/model/auth.dto';
import { SuccessDTO } from '@/model/common.dto';

export const ProfileService = {
  updateProfile: async (data: UpdateProfileDTO): Promise<UserDTO> => {
    const response = await api.patch<UserDTO, UpdateProfileDTO>(
      '/api/user/me',
      data
    );
    return response.data;
  },

  updateProfileImage: async (data: UpdateProfileImageDTO): Promise<UserDTO> => {
    const response = await api.patch<UserDTO, UpdateProfileImageDTO>(
      '/api/user/me',
      data
    );
    return response.data;
  },

  changePassword: async (data: ChangePasswordDTO): Promise<SuccessDTO> => {
    const response = await api.put<SuccessDTO, ChangePasswordDTO>(
      '/api/user/password',
      data
    );
    return response.data;
  },

  getCars: async (): Promise<CarModel[]> => {
    const { data } = await api.get<CarModel[]>('/api/user/data/cars');
    return data;
  },

  addCar: async (dto: AddCarModel): Promise<CarModel> => {
    const { data } = await api.post<CarModel>('/api/user/data/cars', dto);
    return data;
  },

  deleteCar: async (id: string): Promise<void> => {
    await api.delete(`/api/user/data/cars/${id}`);
  },
};

type CarModel = {
  id: string;
  licensePlate: string;
};
type AddCarModel = {
  licensePlate: string;
};
