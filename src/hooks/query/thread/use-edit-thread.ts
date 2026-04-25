'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { OptimisticData } from '@/model/dto/common.dto';
import { ThreadInfoDTO } from '@/model/dto/thread.dto';
import { FileDTO } from '@/model/dto/file.dto';

export function useEditThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      apartmentId,
      threadId,
      title,
      content,
      imageIds,
      tags,
    }: {
      apartmentId: string;
      threadId: string;
      title: string;
      content: string;
      imageIds: string[];
      tags?: string[];
    }) => {
      return await ThreadService.edit(apartmentId, threadId, {
        title,
        content,
        imageIds,
        tags,
      });
    },
    onMutate: async ({ threadId, title, content, imageIds, tags }) => {
      const queryDetailKey = ['threads', 'detail', threadId];

      await queryClient.cancelQueries({ queryKey: queryDetailKey });

      const previousThread =
        queryClient.getQueryData<ThreadInfoDTO>(queryDetailKey);

      if (!previousThread) {
        return { previousThread };
      }

      // Preserve FileDTO metadata for images that are kept; stub new upload ids
      // with a generic contentType until the server response supplies the real one.
      const previousImagesById = new Map<string, FileDTO>(
        (previousThread.images ?? []).map((img) => [img.id, img])
      );
      const optimisticImages: FileDTO[] = imageIds.map(
        (id) => previousImagesById.get(id) ?? { id, contentType: 'image/*' }
      );

      const optimisticThread: OptimisticData<ThreadInfoDTO> = {
        ...previousThread,
        title,
        content,
        tags: tags ?? [],
        images: optimisticImages,
        _isPending: true,
      };

      queryClient.setQueryData<OptimisticData<ThreadInfoDTO>>(
        queryDetailKey,
        optimisticThread
      );

      return { previousThread };
    },
    onSuccess: (threadInfo, { threadId }) => {
      queryClient.setQueryData<OptimisticData<ThreadInfoDTO>>(
        ['threads', 'detail', threadId],
        { ...threadInfo, _isPending: false }
      );
    },
    onError: (_error, { threadId }, context) => {
      if (context?.previousThread) {
        queryClient.setQueryData<ThreadInfoDTO>(
          ['threads', 'detail', threadId],
          context.previousThread
        );
      }
    },
  });
}
