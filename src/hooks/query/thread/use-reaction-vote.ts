'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThreadService } from '@/service/thread-service';
import { useAuth } from '@/components/provider/AuthProvider';
import { ThreadInfoDTO } from '@/model/thread.dto';

export interface ReactionVoteModel {
  apartmentId: string;
  reactionId: string;
  optionId: string;
  threadId: string;
}

export function useReactionVote() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      apartmentId,
      reactionId,
      optionId,
    }: ReactionVoteModel) => {
      return ThreadService.pollVote(reactionId, apartmentId, {
        pollItemId: optionId,
      });
    },
    onMutate: async ({ optionId, threadId }) => {
      const queryDetailKey = ['threads', 'detail', threadId];

      await queryClient.cancelQueries({ queryKey: queryDetailKey });

      const previousThread =
        queryClient.getQueryData<ThreadInfoDTO>(queryDetailKey);

      if (!previousThread?.reactions?.items || !user) {
        return { previousThread };
      }

      const userId = user.id;
      const userSnapshot = {
        id: user.id,
        name: user.name,
        surname: user.surname,
        profileImageId: user.profileImageId,
      };

      const updatedItems = previousThread.reactions.items.map((item) => {
        const isClickedItem = item.id === optionId;
        const userAlreadyVoted = item.voters.some(
          (voter) => voter.id === userId
        );

        if (isClickedItem) {
          if (userAlreadyVoted) {
            // Toggle off: remove user's vote
            return {
              ...item,
              voteCount: item.voteCount - 1,
              voters: item.voters.filter((voter) => voter.id !== userId),
            };
          } else {
            // Add vote to this item
            return {
              ...item,
              voteCount: item.voteCount + 1,
              voters: [...item.voters, userSnapshot],
            };
          }
        } else {
          // Check if user voted on this item and is now switching
          if (userAlreadyVoted) {
            const clickedItemHasUserVote = previousThread
              .reactions!.items.find((i) => i.id === optionId)
              ?.voters.some((voter) => voter.id === userId);

            // Only remove if user is adding vote to another item (not toggling off)
            if (!clickedItemHasUserVote) {
              return {
                ...item,
                voteCount: item.voteCount - 1,
                voters: item.voters.filter((voter) => voter.id !== userId),
              };
            }
          }
          return item;
        }
      });

      const optimisticThread: ThreadInfoDTO = {
        ...previousThread,
        reactions: {
          ...previousThread.reactions,
          items: updatedItems,
        },
      };

      queryClient.setQueryData(queryDetailKey, optimisticThread);

      return { previousThread };
    },
    onError: (error, variables, context) => {
      if (context?.previousThread) {
        const queryDetailKey = ['threads', 'detail', variables.threadId];
        queryClient.setQueryData(queryDetailKey, context.previousThread);
      }
      console.error('Reaction vote failed:', error);
    },
  });
}
