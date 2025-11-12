'use client'

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {CreateThreadCommentDTO} from "@/model/thread.dto";

export function useCreateComment() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, error} = useMutation({
            mutationFn: async ({threadId, commentDto}: { threadId: string, commentDto: CreateThreadCommentDTO }) => {
                await ThreadService.createComment(threadId, commentDto)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['thread_content']}).then(r => {
                })
            },
        }
    )

    const onSubmit = (threadId: string, commentDto: CreateThreadCommentDTO) => {
        mutate({threadId, commentDto});
    }

    return {onSubmit, mutate, isPending, isError, error};
}