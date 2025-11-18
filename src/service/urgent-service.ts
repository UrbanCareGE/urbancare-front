import {api} from '@/lib/api-client';
import {UrgentItemDTO} from "@/model/urgent.dto";

export const UrgentService = {
    add: async (aparmentId: string, content: string): Promise<UrgentItemDTO> => {
        return await api.post<UrgentItemDTO>(`/api/secure/urgent/${aparmentId}/create`,
            {content: content});
    },
    getAll: async (apartment: string): Promise<UrgentItemDTO[]> => {
        return api.get<UrgentItemDTO[]>(`/api/secure/urgent/${apartment}/list`);
    },
    resolve: async (id: string) => {
        return api.post(`/api/secure/urgent/${id}/resolve`)
    }
};
