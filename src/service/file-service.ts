import {api} from "@/lib/api-client";
import {IdWrapperDTO} from "@/model/common.dto";

export const FileService = {

    uploadProtectedFile: async (
        apartmentId: string,
        file: File
    ): Promise<IdWrapperDTO> => {
        const formData = new FormData();
        formData.append('file', file);

        return await api.post<IdWrapperDTO, FormData>(
            `api/secure/file/${apartmentId}/upload`,
            formData
        );
    },
    uploadPublicFile: async (
        file: File
    ): Promise<IdWrapperDTO> => {
        const formData = new FormData();
        formData.append('file', file);

        return await api.post<IdWrapperDTO, FormData>(
            `/api/secure/file/upload`,
            formData,
        );
    },
}