'use client';

import {useQuery} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";

/*
*
* ეს ინფორმაცია თითქმის ყოველთვის უსასრულო სქროლით არის შევსებული და იშვიათად უწევს განახლება
*
* */
export function useThreadDetails(threadId?: string) {
    return useQuery({
        queryKey: ['threads', 'detail', threadId],
        queryFn: async () => {
            if (!threadId) throw new Error('Thread ID is required');
            return await ThreadService.get(threadId);
        },
        enabled: !!threadId,
        staleTime: 10 * 60 * 1e3,
        gcTime: Infinity,
    });
}
