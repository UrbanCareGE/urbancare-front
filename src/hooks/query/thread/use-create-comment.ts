import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {useAuth} from "@/components/provider/AuthProvider";
import {CreateThreadCommentDTO, ThreadCommentDTO, ThreadInfoDTO} from "@/model/thread.dto";

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
                queryClient.setQueryData(['threads', 'detail', threadId], (old: ThreadInfoDTO) => {
                    const newComment: ThreadCommentDTO = {
                        id: `temp-${Date.now()}`,
                        content: commentDto.content,
                        createdAt: new Date(),
                        userInfo: {
                            id: user.id,
                            name: user.name,
                            surname: user.surname,
                            profileImageId: user.profileImageId,
                        },
                        selfVote: 0,
                        voteDiff: 0
                    };

                    if (commentDto.replyToId) {
                        const parentComment = old.comments.find(c => c.id === commentDto.replyToId);
                        parentComment?.replies?.push(newComment);

                        return {
                            ...old,
                            comments: [...(old.comments || [])],
                            commentCount: (old.commentCount || 0) + 1
                        }
                    }
                    return {
                        ...old,
                        comments: [...(old.comments || []), newComment],
                        commentCount: (old.commentCount || 0) + 1
                    }
                });
            }

            return {previous};
        },

        onError: (err, {threadId}, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['threads', 'detail', threadId], context.previous);
            }
        },

        onSuccess: (newComment, {threadId}) => {
            const queryKey = ['threads', 'detail', threadId];
            queryClient.setQueryData<ThreadInfoDTO>(queryKey, (old) => {
                if (!old) return old;

                if (newComment.replyToId) {
                    const parentComment = old.comments.find(c => c.id === newComment.replyToId);
                    if (parentComment) {
                        parentComment.replies = parentComment.replies?.filter(comment => !comment.id.startsWith('temp-')) || []
                        parentComment.replies.push(newComment);
                    }

                    return {
                        ...old,
                        comments: [...(old.comments || [])],
                        commentCount: (old.commentCount || 0) + 1
                    }
                }

                return {
                    ...old,
                    comments: [...(old.comments.filter(comment => !comment.id.startsWith('temp-')) || []), newComment],
                    commentCount: (old.commentCount || 0) + 1
                };
            });

            queryClient.invalidateQueries({
                queryKey,
                refetchType: 'none'
            });
        },
    });

    const onSubmit = (threadId: string, commentDto: CreateThreadCommentDTO) => {
        mutate({threadId, commentDto});
    }

    return {onSubmit, isPending, isError, error}
}