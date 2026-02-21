'use client';

import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { useAuth } from '@/components/provider/AuthProvider';
import { OptimisticData, PagingRespDTO } from '@/model/dto/common.dto';
import { ThreadInfoDTO } from '@/model/dto/thread.dto';

export function useCreateThread() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
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
      poll?: string[];
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
      const queryListKey = ['threads', 'list', user.selectedApartmentId, null];
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
                };
              }
              return page;
            }),
          };
        }
      );

      const tempThread: OptimisticData<ThreadInfoDTO> = {
        id,
        title,
        content,
        commentCount: 0,
        comments: [],
        createdAt: new Date(),
        imageIds: [],
        selfVote: 0,
        voteDiff: 0,
        _isPending: true,
        _tempId: id,
        userInfo: {
          id: user!.id,
          profileImageId: user!.profileImageId,
          name: user!.name,
          surname: user!.surname,
        },
      };

      queryClient.setQueryData<OptimisticData<ThreadInfoDTO>>(
        queryDetailKey,
        tempThread
      );

      return { tempId: id };
    },

    onSuccess: (threadInfo, dto, context) => {
      const tempId = context?.tempId;
      const queryListKey = ['threads', 'list', user.selectedApartmentId, null];

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

      queryClient.setQueryData<OptimisticData<ThreadInfoDTO>>(
        ['threads', 'detail', threadInfo.id],
        { ...threadInfo, _isPending: false }
      );
    },
    onError: (error, dto, context) => {
      const tempId = context?.tempId;

      const queryListKey = ['threads', 'list', user.selectedApartmentId];

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
                  content: page.content.filter((id) => id !== tempId),
                };
              }
              return page;
            }),
          };
        }
      );

      queryClient.removeQueries({ queryKey: ['threads', 'detail', tempId] });
    },
  });
}
