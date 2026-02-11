'use client';

import {useQuery} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";

/*
*
* ეს ინფორმაცია თითქმის ყოველთვის უსასრულო სქროლით არის შევსებული და იშვიათად უწევს განახლება
*
* */
export function useThreadDetails(apartmentId?: string, threadId?: string) {
    return useQuery({
        queryKey: ['threads', 'detail', threadId],
        queryFn: async () => {
            if (!apartmentId) throw new Error('Apartment ID is required');
            if (!threadId) throw new Error('Thread ID is required');
            return await ThreadService.get(apartmentId, threadId);
        },
        enabled: !!apartmentId && !!threadId,
        staleTime: 10 * 60 * 1e3,
        gcTime: Infinity,
    });
}
