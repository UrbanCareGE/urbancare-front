import {api} from '@/lib/api-client';
import {UrgentItemDTO} from "@/model/urgent.dto";

export const UrgentService = {
    add: async (apartmentId: string, content: string): Promise<UrgentItemDTO> => {
        const { data } = await api.post<UrgentItemDTO>(`/api/apartment/${apartmentId}/urgent`,
            {content: content});
        return data;
    },
    getAll: async (apartmentId: string): Promise<UrgentItemDTO[]> => {
        const { data } = await api.get<UrgentItemDTO[]>(`/api/apartment/${apartmentId}/urgent/list`);
        return data;
    },
    resolve: async (apartmentId: string, id: string) => {
        const { data } = await api.post(`/api/apartment/${apartmentId}/urgent/${id}/resolve`);
        return data;
    }
};
