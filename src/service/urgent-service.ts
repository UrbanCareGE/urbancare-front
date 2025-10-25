import {api, NEXT_API_URL} from '@/lib/api-client';
import { QueryClient } from '@tanstack/react-query';

export interface UrgentItem {
    id: string;
    content: string;
    resolved: boolean;
    expiresAt: Date;
    createdAt: Date;
    creatorId: string;
    createdBy: UserSnapshot;
}

export interface UserSnapshot {
    name: string;
    surname: string;
}

export const UrgentService = {
    getUrgentListServer: async (token: string): Promise<UrgentItem[]> => {
        return api.get<UrgentItem[]>('/api/secure/urgent/68efd03837b62ea34882f812/list', {serverSide: true, jwtToken: token});
    },
    getUrgentList: async (apartment: string): Promise<UrgentItem[]> => {
        return api.get<UrgentItem[]>(`/api/secure/urgent/${apartment}/list`);
    },
    resolve: async (id: string)=> {
        return api.post(`/api/secure/urgent/${id}/resolve`)
    },
    async create(content: string, queryClient: QueryClient) {
        const result = await api.post(`/api/secure/urgent/68efd03837b62ea34882f812/create`, {content: content});
        await queryClient.invalidateQueries({ queryKey: ['urgentList'] });
        return result;
    }
};
