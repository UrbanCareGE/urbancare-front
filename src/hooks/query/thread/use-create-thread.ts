'use client';

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { useAuth } from '@/components/provider/AuthProvider';
import { PagingRespDTO } from '@/model/common.dto';
import { ThreadInfoDTO } from '@/model/thread.dto';

export function useCreateThread() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate, mutateAsync, isError, isPending, error } = useMutation({
    mutationFn: async ({
      apartmentId,
      title,
      content,
      imageIds,
      tags,
      poll,
    }: {
      apartmentId: string;
      title: string;
      content: string;
      imageIds: string[];
      tags?: string[];
      poll?: { title: string; items: string[] | undefined };
    }) => {
      return await ThreadService.add(apartmentId, {
        title,
        content,
        imageIds,
        poll,
        tags,
      });
    },
    onMutate: async ({ apartmentId, title, content, imageIds }) => {
      const id = 'temp-' + Date.now();
      const queryListKey = ['threads', 'list', user?.selectedApartment.id];
      const queryDetailKey = ['threads', 'detail', id];

      queryClient.setQueryData<InfiniteData<PagingRespDTO<string>>>(
        queryListKey,
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  content: [id, ...page.content],
                  numberOfElements: page.numberOfElements + 1,
                };
              }
              return page;
            }),
          };
        }
      );

      const tempThread: ThreadInfoDTO = {
        id,
        title,
        content,
        commentCount: 0,
        comments: [],
        createdAt: new Date(),
        imageIds: [],
        selfVote: 0,
        voteDiff: 0,
        userInfo: {
          id: user!.id,
          profileImageId: user!.profileImageId,
          name: user!.name,
          surname: user!.surname,
        },
      };

      queryClient.setQueryData<ThreadInfoDTO>(queryDetailKey, tempThread);

      return { tempId: id };
    },

    onSuccess: (threadInfo, variables, context) => {
      const tempId = context?.tempId;
      const queryListKey = ['threads', 'list', user?.selectedApartment.id];

      queryClient.setQueryData<InfiniteData<PagingRespDTO<string>>>(
        queryListKey,
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            pages: prev.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  content: [threadInfo.id].concat(
                    page.content.filter((id) => id !== tempId)
                  ),
                };
              }
              return page;
            }),
          };
        }
      );

      queryClient.removeQueries({ queryKey: ['threads', 'detail', tempId] });

      queryClient.setQueryData<ThreadInfoDTO>(
        ['threads', 'detail', threadInfo.id],
        threadInfo
      );
    },
    onError: (error) => {
      console.error('Thread creation failed:', error);
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
    isError,
    error,
  };
}
