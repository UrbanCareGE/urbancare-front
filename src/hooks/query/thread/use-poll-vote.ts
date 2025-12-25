'use client'

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {useAuth} from "@/components/provider/AuthProvider";
import {ThreadInfoDTO} from "@/model/thread.dto";

export interface PollVoteModel {
    apartmentId: string;
    pollId: string;
    voteId: string;
    threadId: string;
}

export function usePollVote() {
    const queryClient = useQueryClient();
    const {user} = useAuth();

    const pollVoteMutation = useMutation({
        mutationFn: async ({apartmentId, pollId, voteId}: PollVoteModel) => {
            return ThreadService.pollVote(pollId, apartmentId, {pollItemId: voteId});
        },
        onMutate: async ({voteId, threadId}) => {
            const queryDetailKey = ['threads', 'detail', threadId];

            // Cancel any outgoing refetches
            await queryClient.cancelQueries({queryKey: queryDetailKey});

            // Snapshot the previous value
            const previousThread = queryClient.getQueryData<ThreadInfoDTO>(queryDetailKey);

            if (!previousThread?.poll?.items || !user) {
                return {previousThread};
            }

            // Create optimistically updated thread
            const userId = user.id;
            const userSnapshot = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                profileImageId: user.profileImageId
            };

            const updatedItems = previousThread.poll.items.map(item => {
                const isClickedItem = item.id === voteId;
                const userAlreadyVoted = item.voters.some(voter => voter.id === userId);

                if (isClickedItem) {
                    if (userAlreadyVoted) {
                        // Toggle off: remove user's vote from this item
                        return {
                            ...item,
                            voteCount: item.voteCount - 1,
                            voters: item.voters.filter(voter => voter.id !== userId)
                        };
                    } else {
                        // Add vote to this item
                        return {
                            ...item,
                            voteCount: item.voteCount + 1,
                            voters: [...item.voters, userSnapshot]
                        };
                    }
                } else {
                    // Check if user voted on this item and is now switching
                    if (userAlreadyVoted) {
                        // Remove vote from this item (user is switching to another)
                        const clickedItemHasUserVote = previousThread.poll!.items
                            .find(i => i.id === voteId)?.voters
                            .some(voter => voter.id === userId);

                        // Only remove if user is adding vote to another item (not toggling off)
                        if (!clickedItemHasUserVote) {
                            return {
                                ...item,
                                voteCount: item.voteCount - 1,
                                voters: item.voters.filter(voter => voter.id !== userId)
                            };
                        }
                    }
                    return item;
                }
            });

            const optimisticThread: ThreadInfoDTO = {
                ...previousThread,
                poll: {
                    ...previousThread.poll,
                    items: updatedItems
                }
            };

            // Optimistically update the cache
            queryClient.setQueryData(queryDetailKey, optimisticThread);

            // Return context with previous value for rollback
            return {previousThread};
        },
        onError: (error, variables, context) => {
            // Rollback to previous value on error
            if (context?.previousThread) {
                const queryDetailKey = ['threads', 'detail', variables.threadId];
                queryClient.setQueryData(queryDetailKey, context.previousThread);
            }
            console.error('Poll vote failed:', error);
        },
        onSuccess: () => {
            // Keep optimistic update - no action needed
        }
    });

    return {
        ...pollVoteMutation
    };
}