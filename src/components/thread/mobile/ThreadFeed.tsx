'use client';

import React, {useEffect, useState} from 'react';
import MobileThreadNavBar from "@/components/thread/mobile/MobileThreadNavBar";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useAuth} from "@/components/provider/AuthProvider";
import {ThreadService} from "@/service/thread-service";
import {PagingRespDTO} from "@/model/common.dto";
import {ThreadInfoDTO} from "@/model/thread.dto";
import {ThreadCardPreview} from "@/components/thread/mobile/ThreadPreview";
import {useInView} from "react-intersection-observer";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {VisuallyHidden} from "@/components/ui/visually-hidden";

export default function ThreadFeed() {
    const {user, isLoading: isUserLoading} = useAuth();

    const {ref, inView} = useInView({
        threshold: 0.1,
        rootMargin: '400px'
    });

    const fetchItems = async ({pageParam}: { pageParam: number }) => {
        const data: PagingRespDTO<ThreadInfoDTO> = await ThreadService.getAll(
            user!.selectedApartment!.id,
            {page: pageParam, size: 10}
        );

        return {
            data: data.content,
            nextPage: data.last ? null : data.number + 1,
            currentPage: data.number,
        };
    };

    const {
        data,
        error,
        status,
        isLoading: isPostFetchLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery({
        queryKey: ['thread_content', user?.selectedApartment?.id],
        queryFn: fetchItems,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        enabled: !!user?.selectedApartment?.id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isUserLoading) {
        return (
            <div className="flex-1 w-full bg-slate-100">
                <MobileThreadNavBar/>
                <div className="max-w-2xl mx-auto px-4 pt-24">
                    <LoadingSkeleton/>
                </div>
            </div>
        );
    }

    if (!user?.selectedApartment?.id) {
        return (
            <div className="flex-1 w-full bg-slate-100">
                <MobileThreadNavBar/>
                <div className="max-w-2xl mx-auto px-4 pt-24 text-center">
                    <p className="text-slate-500">Please select an apartment</p>
                </div>
            </div>
        );
    }

    if (isPostFetchLoading) {
        return (
            <div className="flex-1 w-full bg-slate-100">
                <MobileThreadNavBar/>
                <div className="max-w-2xl mx-auto px-4 pt-24">
                    <LoadingSkeleton/>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 w-full bg-slate-100">
                <MobileThreadNavBar/>
                <div className="max-w-2xl mx-auto px-4 pt-24">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600">Failed to load threads</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full overflow-y-scroll bg-slate-100">
            <MobileThreadNavBar/>
            <div className="h-20"></div>

            {data?.pages.map((page) => (
                <div key={page.currentPage} className={"max-w-2xl mx-auto px-4 space-y-4 pb-20"}>
                    {page.data.map((item) => (
                        <ThreadCardWithDialog key={item.id} thread={item}/>
                    ))}
                </div>
            ))}

            {isFetchingNextPage && <LoadingSkeleton/>}
            {hasNextPage && <div ref={ref} className="h-20"/>}

            {!hasNextPage && data?.pages && data.pages.length > 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                    🎉 No more threads
                </div>
            )}

        </div>
    );
}

function ThreadCardWithDialog({thread}: { thread: ThreadInfoDTO }) {
    const [open, setOpen] = useState(false);

    return (
        <>

            <ThreadCardPreview thread={thread}/>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-full h-full w-full p-0 gap-0 bg-slate-100">
                    <VisuallyHidden>
                        <DialogTitle>{thread.title}</DialogTitle>
                    </VisuallyHidden>
                    <div className="h-full overflow-y-auto">
                        <ThreadFullView thread={thread}/>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

function ThreadFullView({thread}: { thread: ThreadInfoDTO }) {
    return (
        <div className="max-w-2xl mx-auto px-4 py-20">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0"></div>
                    <div className="flex-1">
                        {/*<h2 className="font-semibold">{thread.author?.name || 'User'}</h2>*/}
                        <p className="text-sm text-slate-500">
                            {new Date(thread.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <h1 className="text-xl font-bold mb-3">{thread.title}</h1>
                <p className="text-slate-700 whitespace-pre-wrap">{thread.content}</p>
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
                    <div className="flex gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}