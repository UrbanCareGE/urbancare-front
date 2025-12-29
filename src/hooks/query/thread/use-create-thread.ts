'use client'

import {InfiniteData, useMutation, useQueryClient} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {useAuth} from "@/components/provider/AuthProvider";
import {PagingRespDTO} from "@/model/common.dto";
import {ThreadInfoDTO} from "@/model/thread.dto";

export function useCreateThread() {
    const queryClient = useQueryClient();
    const {user} = useAuth();

    const {mutate, mutateAsync, isError, isPending, error} = useMutation({
        mutationFn: async ({
                               apartmentId,
                               title,
                               content,
                               imageIds,
                               tags,
                               poll
                           }: {
            apartmentId: string;
            title: string;
            content: string;
            imageIds: string[];
            tags?: string[];
            poll?: { title: string, items: string[] | undefined };
        }) => {
            return await ThreadService.add(apartmentId, {
                title,
                content,
                imageIds,
                poll,
                tags
            });
        },
        onMutate: async ({apartmentId, title, content, imageIds}) => {
            const queryListKey = ['threads', 'list', user?.selectedApartment.id];

        },
        onSuccess: (threadInfo) => {
            const queryListKey = ['threads', 'list', user?.selectedApartment.id];
            const queryDetailKey = ['threads', 'detail', threadInfo.id];

            queryClient.setQueryData<InfiniteData<PagingRespDTO<string>>>(
                queryListKey,
                (prev) => {
                    if (!prev) return prev;

                    return {
                        ...prev,
                        pages: prev.pages.map((page, index) => {
                            if (index === 0) {
                                return {
                                    ...page,
                                    content: [threadInfo.id, ...page.content],
                                    numberOfElements: page.numberOfElements + 1,
                                };
                            }
                            return page;
                        }),
                    };
                }
            );

            queryClient.setQueryData<ThreadInfoDTO>(
                queryDetailKey,
                threadInfo
            )
        },
        onError: (error) => {
            console.error('Thread creation failed:', error);
        }
    });


    return {
        mutate,
        mutateAsync,
        isPending,
        isError,
        error,
    };
}