import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { PagingRespDTO } from '@/model/dto/common.dto';


export function useDeleteThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ThreadService.delete,
    onMutate: (threadId) => {
      const queryListKey = ['threads', 'list', threadId, null];
      const queryDetailKey = ['threads', 'detail', threadId];

      queryClient.setQueryData<InfiniteData<PagingRespDTO<string>>>(
        queryListKey,
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((page, index) => {
              page.content.filter((id) => {
                return id !== threadId;
              });
              return page;
            }),
          };
        },
      );

      queryClient.removeQueries({ queryKey: queryDetailKey });
    },
    onSuccess: () => {
    },
    onError: () => {
    },
  });
}