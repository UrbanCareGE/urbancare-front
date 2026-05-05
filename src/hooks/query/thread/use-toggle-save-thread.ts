'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { ThreadInfoDTO } from '@/model/dto/thread.dto';

export function useToggleSaveThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      apartmentId,
      threadId,
      next,
    }: {
      apartmentId: string;
      threadId: string;
      next: boolean;
    }) => {
      if (next) {
        await ThreadService.save(apartmentId, threadId);
      } else {
        await ThreadService.unsave(apartmentId, threadId);
      }
    },
    onMutate: async ({ threadId, next }) => {
      const detailKey = ['threads', 'detail', threadId];
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previous = queryClient.getQueryData<ThreadInfoDTO>(detailKey);
      if (previous) {
        queryClient.setQueryData<ThreadInfoDTO>(detailKey, {
          ...previous,
          selfSaved: next,
        });
      }
      return { previous };
    },
    onError: (_err, { threadId }, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ['threads', 'detail', threadId],
          context.previous
        );
      }
    },
    onSettled: (_data, _err, { apartmentId }) => {
      queryClient.invalidateQueries({
        queryKey: ['threads', 'list', apartmentId],
        predicate: (query) => {
          const filters = query.queryKey[3] as { scope?: string } | undefined;
          return filters?.scope === 'SAVED';
        },
      });
    },
  });
}
