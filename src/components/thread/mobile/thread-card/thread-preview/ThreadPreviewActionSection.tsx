import {ThreadShareButton} from "@/components/thread/mobile/thread-card/thread-preview/button/ThreadShareButton";
import React from "react";
import {
    ThreadPreviewCommentButton
} from "@/components/thread/mobile/thread-card/thread-preview/button/ThreadCommentButton";
import {ThreadUpvoteButton} from "@/components/thread/mobile/thread-card/thread-preview/button/ThreadUpvoteButton";

export const ThreadPreviewActionSection = () => {
    return (
        <div className={"flex justify-evenly items-center w-full border-t pt-2.5 border-t-slate-200"}>
            <ThreadUpvoteButton/>
            <ThreadPreviewCommentButton/>
            <ThreadShareButton/>
        </div>
    );
};
