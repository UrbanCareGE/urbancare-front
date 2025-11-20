// use-create-thread.ts
'use client'

import {InfiniteData, useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useState} from "react";
import {createThreadSchema} from "@/components/thread/mobile/data/create-thread-schema";
import {ThreadService} from "@/service/thread-service";
import {FileService} from "@/service/file-service";
import {useAuth} from "@/components/provider/AuthProvider";
import {PagingRespDTO} from "@/model/common.dto";
import {ThreadInfoDTO} from "@/model/thread.dto";

export function useCreateThread() {
    const queryClient = useQueryClient();
    const {user} = useAuth();
    const [uploadedFileIds, setUploadedFileIds] = useState<string[]>([]);

    const form = useForm<z.infer<typeof createThreadSchema>>({
        resolver: zodResolver(createThreadSchema),
        defaultValues: {
            title: "",
            body: "",
            files: []
        },
    });

    // Mutation 1: Upload files
    const uploadFilesMutation = useMutation({
        mutationFn: async (files: File[]): Promise<string[]> => {
            console.log(`Uploading ${files.length} files...`);

            const uploadPromises = files.map(file =>
                FileService.uploadPublicFile(file)
            );

            const results = await Promise.all(uploadPromises);
            const fileIds = results.map(result => result.id);

            console.log('Files uploaded:', fileIds);
            return fileIds;
        },
        onSuccess: (fileIds) => {
            setUploadedFileIds(fileIds);
        },
        onError: (error) => {
            console.error('File upload failed:', error);
        }
    });

    // Mutation 2: Create thread
    const createThreadMutation = useMutation({
        mutationFn: async ({
                               apartmentId,
                               title,
                               content,
                               imageIds
                           }: {
            apartmentId: string;
            title: string;
            content: string;
            imageIds: string[];
        }) => {
            console.log('Creating thread with file IDs:', imageIds);
            return await ThreadService.add(apartmentId, {
                title,
                content,
                imageIds
            });
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
            setUploadedFileIds([]);
        },
        onError: (error) => {
            console.error('Thread creation failed:', error);
        }
    });

    // Orchestrate both mutations
    const onSubmit = async (values: z.infer<typeof createThreadSchema>) => {
        if (!user?.selectedApartment?.id) {
            console.error("No apartment selected");
            return;
        }

        try {
            // Step 1: Upload files if any
            let fileIds: string[] = [];
            if (values.files && values.files.length > 0) {
                fileIds = await uploadFilesMutation.mutateAsync(values.files);
            }

            // Step 2: Create thread with file IDs
            await createThreadMutation.mutateAsync({
                apartmentId: user.selectedApartment.id,
                title: values.title,
                content: values.body,
                imageIds: fileIds
            });
        } catch (error) {
            console.error('Submission failed:', error);
        }
    };

    const isPending = uploadFilesMutation.isPending || createThreadMutation.isPending;
    const isError = uploadFilesMutation.isError || createThreadMutation.isError;
    const error = uploadFilesMutation.error || createThreadMutation.error;

    return {
        form,
        onSubmit,
        isPending,
        isError,
        error,
        uploadFilesMutation,
        createThreadMutation
    };
}