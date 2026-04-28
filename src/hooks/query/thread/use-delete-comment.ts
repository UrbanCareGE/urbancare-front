'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { ThreadCommentDTO, ThreadInfoDTO } from '@/model/dto/thread.dto';

interface DeleteCommentVars {
  apartmentId: string;
  threadId: string;
  commentId: string;
}

const removeCommentFromTree = (
  comments: ThreadCommentDTO[],
  commentId: string
): { next: ThreadCommentDTO[]; removed: number } => {
  let removed = 0;
  const next: ThreadCommentDTO[] = [];
  for (const c of comments) {
    if (c.id === commentId) {
      removed += 1 + (c.replies?.length ?? 0);
      continue;
    }
    if (c.replies?.length) {
      const inner = removeCommentFromTree(c.replies, commentId);
      removed += inner.removed;
      next.push({ ...c, replies: inner.next });
    } else {
      next.push(c);
    }
  }
  return { next, removed };
};

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ apartmentId, threadId, commentId }: DeleteCommentVars) =>
      ThreadService.deleteComment(apartmentId, threadId, commentId),
    onMutate: async ({ threadId, commentId }) => {
      const detailKey = ['threads', 'detail', threadId];
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previous = queryClient.getQueryData<ThreadInfoDTO>(detailKey);
      if (!previous) return { previous };

      const { next, removed } = removeCommentFromTree(
        previous.comments,
        commentId
      );

      queryClient.setQueryData<ThreadInfoDTO>(detailKey, {
        ...previous,
        comments: next,
        commentCount: Math.max((previous.commentCount || 0) - removed, 0),
      });

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
  });
}
