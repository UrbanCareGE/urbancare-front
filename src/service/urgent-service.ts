import {api} from '@/lib/api-client';
import {UrgentItemDTO} from "@/model/urgent.dto";

export const UrgentService = {
    add: async (aparmentId: string, content: string): Promise<UrgentItemDTO> => {
        const { data } = await api.post<UrgentItemDTO>(`/api/secure/urgent/${aparmentId}/create`,
            {content: content});
        return data;
    },
    getAll: async (apartment: string): Promise<UrgentItemDTO[]> => {
        const { data } = await api.get<UrgentItemDTO[]>(`/api/secure/urgent/${apartment}/list`);
        return data;
    },
    resolve: async (id: string) => {
        const { data } = await api.post(`/api/secure/urgent/${id}/resolve`);
        return data;
    }
};
