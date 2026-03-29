import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { PagingRespDTO } from '@/model/dto/common.dto';

export function useDeleteThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      apartmentId,
      threadId,
    }: {
      apartmentId: string;
      threadId: string;
    }) => ThreadService.delete(apartmentId, threadId),
    onMutate: async ({ apartmentId, threadId }) => {
      const listKeyPrefix = ['threads', 'list', apartmentId];
      const detailKey = ['threads', 'detail', threadId];

      await queryClient.cancelQueries({ queryKey: listKeyPrefix });

      const previousLists = queryClient.getQueriesData<
        InfiniteData<PagingRespDTO<string>>
      >({
        queryKey: listKeyPrefix,
      });

      queryClient.setQueriesData<InfiniteData<PagingRespDTO<string>>>(
        { queryKey: listKeyPrefix },
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              content: page.content.filter((id) => id !== threadId),
            })),
          };
        }
      );

      queryClient.removeQueries({ queryKey: detailKey });

      return { previousLists };
    },
    onError: (_err, _vars, context) => {
      context?.previousLists.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSuccess: () => {},
  });
}
