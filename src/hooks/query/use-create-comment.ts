import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {useAuth} from "@/components/provider/AuthProvider";
import {CreateThreadCommentDTO, ThreadInfoDTO} from "@/model/thread.dto";

export function useCreateComment() {
    const {user} = useAuth();
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: ({threadId, commentDto}: { threadId: string, commentDto: CreateThreadCommentDTO }) =>
            ThreadService.createComment(threadId, commentDto),

        onMutate: async ({threadId, commentDto}) => {
            await queryClient.cancelQueries({queryKey: ['threads', 'detail', threadId]});

            const previous = queryClient.getQueryData(['threads', 'detail', threadId]);

            if (user) {
                queryClient.setQueryData(['threads', 'detail', threadId], (old: ThreadInfoDTO) => ({
                    ...old,
                    comments: [...(old.comments || []), {
                        id: `temp-${Date.now()}`,
                        content: commentDto.content,
                        createdAt: new Date(),
                        userInfo: {
                            id: 'temp' + Date.now(),
                            name: user.name,
                            surname: user.surname,
                            profileImageId: user.profileImageId,
                        },
                        voteDiff: 0
                    }],
                    commentCount: (old.commentCount || 0) + 1
                }));
            }

            return {previous};
        },

        onError: (err, {threadId}, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['threads', 'detail', threadId], context.previous);
            }
        },

        onSuccess: (newComment, {threadId, commentDto}) => {
            queryClient.setQueryData(['threads', 'detail', threadId], (old: ThreadInfoDTO) => {
                const filtered = old.comments?.filter(c => !c.id.startsWith('temp-')) || [];
                return {...old, comments: [...filtered, newComment]};
            });
        },
    });

    const onSubmit = (threadId: string, commentDto: CreateThreadCommentDTO) => {
        mutate({threadId, commentDto});
    }

    return {onSubmit, isPending, isError, error}
}