'use client'

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createThreadSchema} from "@/components/thread/mobile/data/create-thread-schema";
import {ThreadService} from "@/service/thread-service";
import {useAuth} from "@/components/provider/AuthProvider";

export function useCreateThread() {
    const queryClient = useQueryClient();
    const {user} = useAuth();

    const form = useForm<z.infer<typeof createThreadSchema>>({
        resolver: zodResolver(createThreadSchema),
        defaultValues: {
            title: "",
            body: "",
            files: []
        },
    });

    const {mutate, isPending, isError, error} = useMutation({
            mutationFn: async ({apartmentId, title, content}: {
                apartmentId?: string;
                title: string,
                content: string
            }) => {
                if (!apartmentId) {
                    return;
                }
                return await ThreadService.add(apartmentId, {title, content});
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['thread_list']}).then(r => {
                })
            },
        }
    )

    const onSubmit = (values: z.infer<typeof createThreadSchema>) => {
        const createThread = {
            title: values.title,
            content: values.body,
            apartmentId: user?.selectedApartment?.id,
            // tags: values.tags,
        };
        mutate(createThread);
    }

    return {form, onSubmit, mutate, isPending, isError, error};
}