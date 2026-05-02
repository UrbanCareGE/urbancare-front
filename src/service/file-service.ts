import { api } from '@/lib/api-client';
import { IdWrapperDTO } from '@/model/dto/common.dto';

export const FileService = {
  uploadProtectedFile: async (
    apartmentId: string,
    file: File
  ): Promise<IdWrapperDTO> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<IdWrapperDTO, FormData>(
      `/api/apartment/${apartmentId}/file/upload`,
      formData
    );
    return data;
  },
  uploadPublicFile: async (file: File): Promise<IdWrapperDTO> => {
    const formData = new FormData();
    formData.append('file', file);

    const { data } = await api.post<IdWrapperDTO, FormData>(
      `/api/file/upload`,
      formData
    );
    return data;
  },
};
