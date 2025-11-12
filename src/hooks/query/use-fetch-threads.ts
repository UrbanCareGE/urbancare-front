'use client';

import {useInfiniteQuery} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {PagingRespDTO} from "@/model/common.dto";
import {ThreadInfoDTO} from "@/model/thread.dto";

export function useInfiniteThreads(apartmentId?: string) {

    const fetchItems = async ({pageParam = 0}: { pageParam: number }) => {
        const data: PagingRespDTO<ThreadInfoDTO> = await ThreadService.getAll(apartmentId!, {
            page: pageParam,
            size: 15,
        });

        return data;
    };

    const query = useInfiniteQuery({
        queryKey: ['thread_content', apartmentId],
        queryFn: fetchItems,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.last) return null;

            return lastPage.number + 1;
        },
        enabled: !!apartmentId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    return query;
}
