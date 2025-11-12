import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";

export const ThreadCommentsHeader = () => {
    const {thread} = useThread();
    return (
        <div className="mb-3">
            <h2 className="text-lg font-semibold text-slate-900">
                კომენტარები ({thread.comments.length})
            </h2>
        </div>
    );
};
