'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { ThreadService } from '@/service/thread-service';
import { ThreadInfoDTO, ThreadVoteDTO, VoteType } from '@/model/thread.dto';

interface VoteRequest {
  apartmentId: string;
  threadId: string;
  vote: ThreadVoteDTO;
}

function calculateVoteChanges(
  currentSelfVote: number,
  newVoteType: VoteType
): {
  newSelfVote: number;
  voteDiffDelta: number;
} {
  if (newVoteType === VoteType.UPVOTE) {
    if (currentSelfVote === 1) {
      // Removing upvote
      return { newSelfVote: 0, voteDiffDelta: -1 };
    } else if (currentSelfVote === -1) {
      // Switching from downvote to upvote
      return { newSelfVote: 1, voteDiffDelta: 2 };
    } else {
      // Adding upvote
      return { newSelfVote: 1, voteDiffDelta: 1 };
    }
  } else {
    if (currentSelfVote === -1) {
      // Removing downvote
      return { newSelfVote: 0, voteDiffDelta: 1 };
    } else if (currentSelfVote === 1) {
      // Switching from upvote to downvote
      return { newSelfVote: -1, voteDiffDelta: -2 };
    } else {
      // Adding downvote
      return { newSelfVote: -1, voteDiffDelta: -1 };
    }
  }
}

export function useThreadVote() {
  const queryClient = useQueryClient();
  const queueRef = useRef<VoteRequest[]>([]);
  const isProcessingRef = useRef(false);

  const mutation = useMutation({
    mutationFn: async ({ apartmentId, threadId, vote }: VoteRequest) => {
      return ThreadService.vote(apartmentId, threadId, vote);
    },
    onMutate: async ({ threadId, vote }) => {
      const queryDetailKey = ['threads', 'detail', threadId];

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryDetailKey });

      // Snapshot the previous value
      const previousThread =
        queryClient.getQueryData<ThreadInfoDTO>(queryDetailKey);

      if (!previousThread) {
        return { previousThread };
      }

      // Calculate optimistic update
      const { newSelfVote, voteDiffDelta } = calculateVoteChanges(
        previousThread.selfVote,
        vote.voteType
      );

      const optimisticThread: ThreadInfoDTO = {
        ...previousThread,
        selfVote: newSelfVote,
        voteDiff: previousThread.voteDiff + voteDiffDelta,
      };

      // Apply optimistic update
      queryClient.setQueryData(queryDetailKey, optimisticThread);

      return { previousThread };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousThread) {
        const queryDetailKey = ['threads', 'detail', variables.threadId];
        queryClient.setQueryData(queryDetailKey, context.previousThread);
      }
      console.error('Vote failed:', error);
    },
    onSettled: () => {
      // Process next item in queue
      processQueue();
    },
  });

  const processQueue = useCallback(() => {
    if (queueRef.current.length === 0) {
      isProcessingRef.current = false;
      return;
    }

    isProcessingRef.current = true;
    const nextVote = queueRef.current.shift()!;
    mutation.mutate(nextVote);
  }, [mutation]);

  const vote = useCallback(
    (apartmentId: string, threadId: string, voteType: VoteType) => {
      const request: VoteRequest = {
        apartmentId,
        threadId,
        vote: { voteType },
      };

      if (isProcessingRef.current) {
        // Apply optimistic update for queued vote
        const queryDetailKey = ['threads', 'detail', threadId];
        const currentThread =
          queryClient.getQueryData<ThreadInfoDTO>(queryDetailKey);

        if (currentThread) {
          const { newSelfVote, voteDiffDelta } = calculateVoteChanges(
            currentThread.selfVote,
            voteType
          );

          queryClient.setQueryData(queryDetailKey, {
            ...currentThread,
            selfVote: newSelfVote,
            voteDiff: currentThread.voteDiff + voteDiffDelta,
          });
        }

        // Add to queue
        queueRef.current.push(request);
      } else {
        // Start processing immediately
        isProcessingRef.current = true;
        mutation.mutate(request);
      }
    },
    [mutation, queryClient]
  );

  return {
    vote,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
