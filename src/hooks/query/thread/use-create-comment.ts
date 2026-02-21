import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { useAuth } from '@/components/provider/AuthProvider';
import {
  CreateThreadCommentDTO,
  ThreadCommentDTO,
  ThreadInfoDTO,
} from '@/model/dto/thread.dto';
import { OptimisticData } from '@/model/dto/common.dto';

export function useCreateComment() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({
      apartmentId,
      threadId,
      commentDto,
    }: {
      apartmentId: string;
      threadId: string;
      commentDto: CreateThreadCommentDTO;
    }) => ThreadService.createComment(apartmentId, threadId, commentDto),

    onMutate: async ({ threadId, commentDto }) => {
      const threadQueryKey = ['threads', 'detail', threadId];
      await queryClient.cancelQueries({
        queryKey: threadQueryKey,
      });

      const tempId = `temp-${Date.now()}`;

      const newComment: OptimisticData<ThreadCommentDTO> = {
        _tempId: tempId,
        _isPending: true,
        id: tempId,
        content: commentDto.content,
        createdAt: new Date(),
        userInfo: {
          id: user.id,
          name: user.name,
          surname: user.surname,
          profileImageId: user.profileImageId,
        },
        selfVote: 0,
        voteDiff: 0,
      };

      queryClient.setQueryData(
        ['threads', 'detail', threadId],
        (old: ThreadInfoDTO) => {
          if (commentDto.replyToId) {
            const parentComment = old.comments.find(
              (c) => c.id === commentDto.replyToId
            );
            parentComment?.replies?.push(newComment);

            return {
              ...old,
              comments: [...(old.comments || [])],
              commentCount: (old.commentCount || 0) + 1,
            };
          }
          return {
            ...old,
            comments: [...(old.comments || []), newComment],
            commentCount: (old.commentCount || 0) + 1,
          };
        }
      );

      return { tempId };
    },
    onSuccess: (newComment, { threadId }, context) => {
      const tempId = context?.tempId;
      const threadQueryKey = ['threads', 'detail', threadId];

      queryClient.setQueryData<ThreadInfoDTO>(threadQueryKey, (old) => {
        if (!old) return old;

        if (newComment.replyToId) {
          const parentComment = old.comments.find(
            (c) => c.id === newComment.replyToId
          );
          if (parentComment) {
            parentComment.replies =
              parentComment.replies?.filter(
                (comment) => comment.id !== tempId
              ) || [];
            parentComment.replies.push(newComment);
          }

          return {
            ...old,
            comments: [...(old.comments || [])],
            commentCount: (old.commentCount || 0) + 1,
          };
        }

        return {
          ...old,
          comments: [
            ...(old.comments.filter((comment) => comment.id !== tempId) || []),
            newComment,
          ],
          commentCount: (old.commentCount || 0) + 1,
        };
      });

      queryClient.invalidateQueries({
        queryKey: threadQueryKey,
        refetchType: 'none',
      });
    },
    onError: (err, { threadId }, context) => {
      const tempId = context?.tempId;
      const threadQueryKey = ['threads', 'detail', threadId];

      queryClient.setQueryData<ThreadInfoDTO>(threadQueryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          comments: old.comments.filter((comment) => comment.id !== tempId),
          commentCount: (old.commentCount || 0) + 1,
        };
      });
    },
  });

  const onSubmit = (
    apartmentId: string,
    threadId: string,
    commentDto: CreateThreadCommentDTO
  ) => {
    mutate({ apartmentId, threadId, commentDto });
  };

  return { onSubmit, isPending, isError, error };
}
