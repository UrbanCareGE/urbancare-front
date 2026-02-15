'use client';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';

/*
 *  უსასრულო სქროლისთვის ვინახავთ მხოლოდ id-ებს ქეშში და paging-ინფორმაციას
 *  თითოეულ ინფოს პოსტისთვის შეგვიძლია ცალკე მივწვდეთ და ოპტიმისტური განახლებები ვაკეთოთ მარტივად
 * */
export function useInfiniteThreads(apartmentId?: string, tags?: string[]) {
  const queryClient = useQueryClient();

  const fetchItems = async ({ pageParam = 0 }) => {
    const data = await ThreadService.getAll(
      apartmentId!,
      { page: pageParam, size: 15 },
      tags
    );

    data.content.forEach((thread) => {
      queryClient.setQueryData(['threads', 'detail', thread.id], thread);
    });

    return {
      ...data,
      content: data.content.map((t) => t.id),
    };
  };

  return useInfiniteQuery({
    queryKey: ['threads', 'list', apartmentId],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page.number === lastPage.page.totalPages - 1
        ? null
        : lastPage.page.number + 1,
    enabled: !!apartmentId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
