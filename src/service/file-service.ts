import {api} from "@/lib/api-client";
import {IdWrapperDTO} from "@/model/common.dto";

export const FileService = {

    uploadProtectedFile: async (
        apartmentId: string,
        file: File
    ): Promise<IdWrapperDTO> => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await api.post<IdWrapperDTO, FormData>(
            `api/secure/file/${apartmentId}/upload`,
            formData
        );
        return data;
    },
    uploadPublicFile: async (
        file: File
    ): Promise<IdWrapperDTO> => {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await api.post<IdWrapperDTO, FormData>(
            `/api/file/upload`,
            formData,
        );
        return data;
    },
}