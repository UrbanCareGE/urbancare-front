// use-create-thread.ts
'use client'

import {InfiniteData, useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createThreadSchema} from "@/components/thread/mobile/data/create-thread-schema";
import {ThreadService} from "@/service/thread-service";
import {useAuth} from "@/components/provider/AuthProvider";
import {PagingRespDTO} from "@/model/common.dto";
import {ThreadInfoDTO} from "@/model/thread.dto";

export function useCreateThread() {
    const queryClient = useQueryClient();
    const {user} = useAuth();

    const form = useForm<z.infer<typeof createThreadSchema>>({
        resolver: zodResolver(createThreadSchema),
        defaultValues: {
            title: "",
            body: "",
            files: [],
            tags: [],
            pollOptions: []
        },
    });

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
            form.reset();
        },
        onError: (error) => {
            console.error('Thread creation failed:', error);
        }
    });

    const onSubmit = async (values: z.infer<typeof createThreadSchema>) => {
        if (!user?.selectedApartment?.id) {
            console.error("No apartment selected");
            return;
        }

        try {
            await mutateAsync({
                apartmentId: user.selectedApartment.id,
                title: values.title,
                content: values.body,
                imageIds: values.files?.map(f => f.fileId) ?? [],
                tags: values.tags,
                poll: values.pollOptions != null && values.pollOptions.length > 0 ? {
                    title: "",
                    items: values.pollOptions
                } : undefined
            });
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    return {
        form,
        mutate,
        mutateAsync,
        onSubmit,
        isPending,
        isError,
        error,
    };
}