import { api } from '@/lib/api-client';

export interface UrgentItem {
    id: string;
    content: string;
    resolved: boolean;
    expired: Date;
    createdAt: Date;
    userId: string;
}

export const UrgentService = {
    getApartmentList: async (): Promise<UrgentItem[]> => {
        return api.get<UrgentItem[]>('/urgent/68e8f818ef50313d23b92d25/list');
    },
};
