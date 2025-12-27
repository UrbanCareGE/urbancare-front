'use client';

import ThreadCard from "@/components/thread/mobile/thread-card/ThreadCard";
import {ThreadPreviewHeader} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewHeader";
import {ThreadPreviewContent} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewContent";
import React from "react";
import {ThreadViewHeader} from "@/components/thread/mobile/thread-card/thread-view/ThreadViewHeader";
import {ThreadViewContent} from "@/components/thread/mobile/thread-card/thread-view/ThreadViewContent";
import Previewable from "@/components/thread/mobile/Previewable";
import {ThreadCommentGrid} from "@/components/thread/mobile/thread-card/thread-view/comment/ThreadCommentGrid";
import {ThreadCommentsHeader} from "@/components/thread/mobile/thread-card/thread-view/comment/ThreadCommentsHeader";
import {
    ThreadPreviewActionSection
} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewActionSection";
import {ThreadPreviewStatsSection} from "@/components/thread/mobile/thread-card/common/ThreadPreviewStatsSection";
import {
    ThreadViewCommentButton
} from "@/components/thread/mobile/thread-card/thread-view/comment/ThreadViewCommentButton";
import {useThreadDetails} from "@/hooks/query/thread/use-thread-details";

interface ThreadPreviewProps {
    threadId: string;
    defaultOpen: boolean;
}

function ThreadSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 animate-pulse">
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
    );
}

export const Thread = ({threadId, defaultOpen}: ThreadPreviewProps) => {
    const {data, isPending, error} = useThreadDetails(threadId);

    if (isPending) {
        return <ThreadSkeleton/>
    }

    if (error) {
        return <div>coult not fetch data</div>
    }

    return (
        <Previewable defaultOpen={defaultOpen}>
            <ThreadCard thread={data} className={"px-0"}>
                <ThreadCard.Header className={"px-3"}>
                    <ThreadPreviewHeader/>
                </ThreadCard.Header>
                <ThreadCard.Body className={"px-3"}>
                    <ThreadPreviewContent/>
                </ThreadCard.Body>
                <ThreadCard.Footer className={"flex-col px-0"}>
                    {/*<ThreadPreviewStatsSection/>*/}
                    <ThreadPreviewActionSection/>
                </ThreadCard.Footer>
            </ThreadCard>
            <Previewable.View className={"space-y-3 pb-3"}>
                <Previewable.Header>
                    <p className="text-xl font-semibold text-slate-700 leading-relaxed whitespace-pre-wrap">
                        URBANCARE
                    </p>
                </Previewable.Header>
                <Previewable.Body className={"space-y-3 px-3"}>
                    <ThreadCard thread={data} className={"px-0"}>
                        <ThreadCard.Header className="px-3">
                            <ThreadViewHeader/>
                        </ThreadCard.Header>
                        <ThreadCard.Body className={"px-3"}>
                            <ThreadViewContent/>
                        </ThreadCard.Body>
                        <ThreadCard.Footer className="flex-col px-0">
                            <ThreadPreviewActionSection/>
                        </ThreadCard.Footer>
                    </ThreadCard>
                    <ThreadCard thread={data} className={"px-0 space-y-0"}>
                        <ThreadCard.Header className="border-b px-3">
                            <ThreadCommentsHeader/>
                        </ThreadCard.Header>
                        <ThreadCard.Body>
                            <ThreadCommentGrid/>
                        </ThreadCard.Body>
                    </ThreadCard>
                </Previewable.Body>
                <Previewable.Footer className={"px-0 border shadow-2xl"}>
                    {/* Comment Input */}
                    <ThreadViewCommentButton thread={data}/>
                </Previewable.Footer>
            </Previewable.View>
        </Previewable>
    )
        ;
};
