'use client';

import {ThreadInfoDTO} from "@/model/thread.dto";
import ThreadCard from "@/components/thread/mobile/thread-card/ThreadCard";
import {ThreadPreviewHeader} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewHeader";
import {ThreadPreviewContent} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewContent";
import {ThreadVoteButtonGroup} from "@/components/thread/mobile/thread-card/thread-preview/ThreadVoteComponenet";
import {ThreadShareButton} from "@/components/thread/mobile/thread-card/thread-preview/button/ThreadShareButton";
import React from "react";
import {ThreadViewHeader} from "@/components/thread/mobile/thread-card/thread-view/ThreadViewHeader";
import {ThreadViewContent} from "@/components/thread/mobile/thread-card/thread-view/ThreadViewContent";
import Previewable from "@/components/thread/mobile/sheet/Previewable";
import {ThreadComments} from "@/components/thread/mobile/thread-card/thread-view/ThreadComments";
import {ThreadCommentsHeader} from "@/components/thread/mobile/thread-card/thread-view/ThreadCommentsHeader";
import {
    ThreadPreviewActionSection
} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewActionSection";
import {
    ThreadPreviewStatsSection
} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewStatsSection";

interface ThreadPreviewProps {
    thread: ThreadInfoDTO;
}

export const Thread = ({thread}: ThreadPreviewProps) => {
    return (
        <Previewable>
            <ThreadCard thread={thread} className={"px-0"}>
                <ThreadCard.Header className={"px-3"}>
                    <ThreadPreviewHeader/>
                </ThreadCard.Header>
                <ThreadCard.Body className={"px-3"}>
                    <ThreadPreviewContent/>
                </ThreadCard.Body>
                <ThreadCard.Footer className={"flex-col px-0"}>
                    <ThreadPreviewStatsSection/>
                    <ThreadPreviewActionSection/>
                </ThreadCard.Footer>
            </ThreadCard>
            <Previewable.View className={"space-y-3 pb-3"}>
                <Previewable.Header>
                    <div></div>
                </Previewable.Header>
                <Previewable.Body className={"space-y-3 px-3"}>
                    <ThreadCard thread={thread}>
                        <ThreadCard.Header className="border-b">
                            <ThreadViewHeader/>
                        </ThreadCard.Header>
                        <ThreadCard.Body>
                            <ThreadViewContent/>
                        </ThreadCard.Body>
                        <ThreadCard.Footer className="border-t pt-4">
                            <ThreadPreviewActionSection/>
                            {/*<ThreadVoteButtonGroup className={"mr-auto"}/>*/}
                            {/*<ThreadCommentButton/>*/}
                            {/*<ThreadShareButton/>*/}
                        </ThreadCard.Footer>
                    </ThreadCard>
                    <ThreadCard thread={thread} className={"px-0 space-y-0"}>
                        <ThreadCard.Header className="border-b px-3">
                            <ThreadCommentsHeader/>
                        </ThreadCard.Header>
                        <ThreadCard.Body>
                            <ThreadComments/>
                        </ThreadCard.Body>
                    </ThreadCard>
                </Previewable.Body>
            </Previewable.View>
        </Previewable>
    )
        ;
};
