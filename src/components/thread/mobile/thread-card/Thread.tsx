'use client';

import {ThreadInfoDTO} from "@/model/thread.dto";
import ThreadCard from "@/components/thread/mobile/thread-card/ThreadCard";
import {ThreadPreviewHeader} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewHeader";
import {ThreadPreviewContent} from "@/components/thread/mobile/thread-card/thread-preview/ThreadPreviewContent";
import {ThreadVoteButtonGroup} from "@/components/thread/mobile/thread-card/button/ThreadVoteComponenet";
import {ThreadCommentButton} from "@/components/thread/mobile/thread-card/button/ThreadCommentButton";
import {ThreadShareButton} from "@/components/thread/mobile/thread-card/button/ThreadShareButton";
import React from "react";
import {ThreadViewHeader} from "@/components/thread/mobile/thread-card/thread-view/ThreadViewHeader";
import {ThreadViewContent} from "@/components/thread/mobile/thread-card/thread-view/ThreadViewContent";
import Previewable from "@/components/thread/mobile/sheet/Previewable";
import {ThreadComments} from "@/components/thread/mobile/thread-card/thread-view/ThreadComments";
import {ThreadCommentsHeader} from "@/components/thread/mobile/thread-card/thread-view/ThreadCommentsHeader";

interface ThreadPreviewProps {
    thread: ThreadInfoDTO;
}

export const Thread = ({thread}: ThreadPreviewProps) => {
    return (
        <Previewable>
            <ThreadCard thread={thread}>
                <ThreadCard.Header>
                    <ThreadPreviewHeader/>
                </ThreadCard.Header>
                <ThreadCard.Body>
                    <ThreadPreviewContent/>
                </ThreadCard.Body>
                <ThreadCard.Footer>
                    <ThreadVoteButtonGroup className={"mr-auto"}/>
                    <ThreadCommentButton/>
                    <ThreadShareButton/>
                </ThreadCard.Footer>
            </ThreadCard>
            <Previewable.View className={"space-y-3"}>
                <ThreadCard thread={thread}>
                    <ThreadCard.Header className="border-b pb-4">
                        <ThreadViewHeader/>
                    </ThreadCard.Header>
                    <ThreadCard.Body className="py-6">
                        <ThreadViewContent/>
                    </ThreadCard.Body>
                    <ThreadCard.Footer className="border-t pt-4">
                        <ThreadVoteButtonGroup className={"mr-auto"}/>
                        <ThreadCommentButton/>
                        <ThreadShareButton/>
                    </ThreadCard.Footer>
                </ThreadCard>
                <ThreadCard thread={thread}>
                    <ThreadCard.Header className="border-b">
                        <ThreadCommentsHeader/>
                    </ThreadCard.Header>
                    <ThreadCard.Body>
                        <ThreadComments/>
                    </ThreadCard.Body>
                    <ThreadCard.Footer className="border-t pt-4">
                        ბლაბლა
                    </ThreadCard.Footer>
                </ThreadCard>
            </Previewable.View>
        </Previewable>
    )
        ;
};
