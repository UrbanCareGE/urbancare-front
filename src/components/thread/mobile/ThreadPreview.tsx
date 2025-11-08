import {ThreadInfoDTO} from "@/model/thread.dto";
import ThreadCard from "@/components/thread/mobile/thread-card/ThreadCard";
import {ThreadCardHeader} from "@/components/thread/mobile/thread-card/ThreadCardHeader";
import {ThreadCardContent} from "@/components/thread/mobile/thread-card/ThreadCardContent";
import {ThreadVoteButtonGroup} from "@/components/thread/mobile/thread-card/button/ThreadVoteComponenet";
import {ThreadCommentButton} from "@/components/thread/mobile/thread-card/button/ThreadCommentButton";
import {ThreadShareButton} from "@/components/thread/mobile/thread-card/button/ThreadShareButton";
import React from "react";
import {SheetClose} from "@/components/ui/sheet";

interface ThreadPreviewProps {
    thread: ThreadInfoDTO;
}

export const ThreadPreview = ({thread}: ThreadPreviewProps) => {
    return (
        <ThreadCard thread={thread}>
            <ThreadCard.Header>
                <ThreadCardHeader/>
            </ThreadCard.Header>
            <ThreadCard.Body>
                <ThreadCardContent/>
            </ThreadCard.Body>
            <ThreadCard.Footer>
                <ThreadVoteButtonGroup className={"mr-auto"}/>
                <ThreadCommentButton/>
                <ThreadShareButton/>
            </ThreadCard.Footer>
            <ThreadCard.Sheet>
                <div className="max-w-2xl mx-auto p-6">
                    <SheetClose>
                        X
                    </SheetClose>
                    <ThreadCard.Header className="border-b pb-4">
                        <ThreadCardHeader/>
                    </ThreadCard.Header>

                    <ThreadCard.Body className="py-6">
                        <ThreadCardContent/>
                    </ThreadCard.Body>

                    <ThreadCard.Footer className="border-t pt-4">
                        <ThreadVoteButtonGroup className={"mr-auto"}/>
                        <ThreadCommentButton/>
                        <ThreadShareButton/>
                    </ThreadCard.Footer>
                </div>
            </ThreadCard.Sheet>
        </ThreadCard>
    );
};
