import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";


export const ThreadPreviewStatsSection = () => {
    const {thread} = useThread();
    return (
        <div className="w-full px-4 py-3 flex items-center justify-start text-sm text-gray-600 border-y">
            <span className="font-medium">{thread.voteDiff} მოწონება</span>
            <span className="mx-2">·</span>
            <span>{thread.commentCount} კომენტარი</span>
            <span className="mx-2">·</span>
            <span>{15} გაზიარება</span>
        </div>
    );
};
