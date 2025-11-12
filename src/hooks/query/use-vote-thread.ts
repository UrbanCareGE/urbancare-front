'use client'

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {ThreadVoteDTO} from "@/model/thread.dto";

export function useThreadVote() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, error} = useMutation({
            mutationFn: async ({threadId, vote}: {
                threadId: string;
                vote: ThreadVoteDTO,
            }) => {
                return await ThreadService.vote(threadId, vote);
            },
            onSuccess: () => {
                // queryClient.invalidateQueries({queryKey: ['thread_list']}).then(r => {
                // })
            },
        }
    )

    return {mutate, isPending, isError, error};
}