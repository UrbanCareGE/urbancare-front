import { api } from '@/lib/api-client';
import { ApartmentPagingDTO } from '@/model/dto/apartment.dto';

export const ApartmentService = {
  getAll: async (
    name: string,
    page: number,
    size: number
  ): Promise<ApartmentPagingDTO> => {
    const { data } = await api.get<ApartmentPagingDTO>(
      '/api/apartment/search',
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
};
