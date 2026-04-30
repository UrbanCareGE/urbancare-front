import { api } from '@/lib/api-client';
import {
  ApartmentMemberDTO,
  ApartmentPagingDTO,
} from '@/model/dto/apartment.dto';

export const ApartmentService = {
  getAll: async (
    name: string,
    page: number,
    size: number
  ): Promise<ApartmentPagingDTO> => {
    const { data } = await api.get<ApartmentPagingDTO>(
      '/api/apartments/search',
      {
        params: {
          name,
          page,
          size,
        },
      }
    );

    return data;
  },
  getMembers: async (apartmentId: string): Promise<ApartmentMemberDTO[]> => {
    const { data } = await api.get<ApartmentMemberDTO[]>(
      `/api/apartment/${apartmentId}/members`
    );

    return data;
  },
};
