'use client';

import {useEffect} from 'react';
import {useInfiniteQuery} from "@tanstack/react-query";
import {ThreadService} from "@/service/thread-service";
import {PagingRespDTO} from "@/model/common.dto";
import {ThreadInfoDTO} from "@/model/thread.dto";
import {Thread} from "@/components/thread/mobile/thread-card/Thread";
import {useInView} from "react-intersection-observer";
import {useAuth} from "@/components/provider/AuthProvider";
import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {ThreadCreateForm} from "@/components/thread/mobile/ThreadCreateForm";

export default function ThreadFeed() {
    const {user, isLoading: isUserLoading} = useAuth();

    const {ref, inView} = useInView({
        threshold: 0.1,
        rootMargin: '400px'
    });

    const fetchItems = async ({pageParam}: { pageParam: number }) => {
        const data: PagingRespDTO<ThreadInfoDTO> = await ThreadService.getAll(
            user!.selectedApartment!.id,
            {page: pageParam, size: 15}
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

    if (isUserLoading || isPostFetchLoading) {
        return (
            <div className="flex-1 w-full bg-slate-100 space-y-4 py-4">
                <div className="max-w-2xl mx-auto px-4 space-y-4">
                    <StartThreadFormSkeleton/>
                    <LoadingSkeleton/>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 w-full bg-slate-100">
                <div className="max-w-2xl mx-auto px-4 pt-24">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600">Failed to load threads</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-scroll bg-slate-100 space-y-4 py-4">
            <div className={"max-w-2xl mx-auto px-3"}>
                <ThreadCreateForm/>
            </div>
            {data?.pages.map((page) => (
                <div key={page.currentPage} className={"max-w-2xl mx-auto px-3 space-y-4"}>
                    {page.data.map((thread) => (
                        <Thread key={thread.id} thread={thread}/>
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

export type StartThreadFormSkeletonProps = {
    className?: string;
}

export function StartThreadFormSkeleton({className}: StartThreadFormSkeletonProps) {
    return (
        <Card
            className={cn("flex shadow-lg border-slate-200 bg-white animate-pulse p-3 items-center", className)}>
            <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0"/>
            <div className="flex-1 px-4 py-3">
                <div className="bg-slate-200 rounded-xl h-6 w-full mr-auto"/>
            </div>
        </Card>
    );
}
