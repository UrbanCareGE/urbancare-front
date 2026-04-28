'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { useAuth } from '@/components/provider/AuthProvider';
import {
  PollDTO,
  ThreadCommentDTO,
  ThreadInfoDTO,
} from '@/model/dto/thread.dto';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';

export interface CommentReactionVoteModel {
  apartmentId: string;
  reactionId: string;
  optionId: string;
  threadId: string;
  commentId: string;
}

const applyVoteToReactions = (
  reactions: PollDTO,
  optionId: string,
  userSnapshot: UserSnapshotDTO
): PollDTO => {
  const userId = userSnapshot.id;
  const items = reactions.items.map((item) => {
    const isClicked = item.id === optionId;
    const userVotedHere = item.voters.some((v) => v.id === userId);

    if (isClicked) {
      if (userVotedHere) {
        return {
          ...item,
          voteCount: item.voteCount - 1,
          voters: item.voters.filter((v) => v.id !== userId),
        };
      }
      return {
        ...item,
        voteCount: item.voteCount + 1,
        voters: [...item.voters, userSnapshot],
      };
    }

    if (userVotedHere) {
      const clickedItemAlreadyHasUserVote = reactions.items
        .find((i) => i.id === optionId)
        ?.voters.some((v) => v.id === userId);
      if (!clickedItemAlreadyHasUserVote) {
        return {
          ...item,
          voteCount: item.voteCount - 1,
          voters: item.voters.filter((v) => v.id !== userId),
        };
      }
    }
    return item;
  });

  return { ...reactions, items };
};

const updateCommentInTree = (
  comments: ThreadCommentDTO[],
  commentId: string,
  updater: (c: ThreadCommentDTO) => ThreadCommentDTO
): ThreadCommentDTO[] =>
  comments.map((c) => {
    if (c.id === commentId) return updater(c);
    if (c.replies?.length) {
      return {
        ...c,
        replies: updateCommentInTree(c.replies, commentId, updater),
      };
    }
    return c;
  });

export function useCommentReactionVote() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      apartmentId,
      reactionId,
      optionId,
    }: CommentReactionVoteModel) => {
      return ThreadService.pollVote(apartmentId, reactionId, {
        pollItemId: optionId,
      });
    },
    onMutate: async ({ optionId, threadId, commentId }) => {
      const queryDetailKey = ['threads', 'detail', threadId];
      await queryClient.cancelQueries({ queryKey: queryDetailKey });

      const previousThread =
        queryClient.getQueryData<ThreadInfoDTO>(queryDetailKey);

      if (!previousThread || !user) {
        return { previousThread };
      }

      const userSnapshot: UserSnapshotDTO = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        profileImageId: user.profileImageId,
      };

      const updatedComments = updateCommentInTree(
        previousThread.comments,
        commentId,
        (c) => {
          if (!c.reactions) return c;
          return {
            ...c,
            reactions: applyVoteToReactions(
              c.reactions,
              optionId,
              userSnapshot
            ),
          };
        }
      );

      queryClient.setQueryData<ThreadInfoDTO>(queryDetailKey, {
        ...previousThread,
        comments: updatedComments,
      });

      return { previousThread };
    },
    onError: (error, variables, context) => {
      if (context?.previousThread) {
        const queryDetailKey = ['threads', 'detail', variables.threadId];
        queryClient.setQueryData(queryDetailKey, context.previousThread);
      }
      console.error('Comment reaction vote failed:', error);
    },
  });
}
