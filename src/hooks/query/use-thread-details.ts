'use client';

import {useQuery} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";


/*
*
* ეს ინფორმაცია თითქმის ყოველთვის უსასრულო სქროლით არის შევსებული და იშვიათად უწევს განახლება
*
* */

export function useThreadDetails(threadId?: string) {
    const query = useQuery({
        queryKey: ['threads', 'detail', threadId],
        queryFn: async () => {
            if (!threadId) throw new Error('Thread ID is required');
            return await ThreadService.get(threadId);
        },
        enabled: !!threadId,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return query;
}
