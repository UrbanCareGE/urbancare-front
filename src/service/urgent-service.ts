import {api} from '@/lib/api-client';
import {QueryClient} from '@tanstack/react-query';
import {UrgentItemDTO} from "@/model/urgent.dto";


export const UrgentService = {
    getUrgentList: async (apartment: string): Promise<UrgentItemDTO[]> => {
        return api.get<UrgentItemDTO[]>(`/api/secure/urgent/${apartment}/list`);
    },
    resolve: async (id: string) => {
        return api.post(`/api/secure/urgent/${id}/resolve`)
    },
    async create(content: string, queryClient: QueryClient) {
        const result = await api.post(`/api/secure/urgent/68efd03837b62ea34882f812/create`, {content: content});
        await queryClient.invalidateQueries({queryKey: ['urgentList']});
        return result;
    }
};
