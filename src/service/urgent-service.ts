import {apiCall} from "@/service/api";

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
        try {
            const response = await apiCall<UrgentItem[]>(
                "get",
                "/api/urgent/68e7e71d6996caf7c2ea5d51/list",
                {
                    apiName: "URBANCARE_API",
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    },
};
