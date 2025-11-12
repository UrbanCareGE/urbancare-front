import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {usePreviewable} from "@/components/thread/mobile/sheet/Previewable";

interface ThreadCardContentProps {
    className?: string;
}

export const ThreadViewContent = ({className}: ThreadCardContentProps) => {
    const {thread} = useThread();
    return (
        <div className={`flex flex-col w-full overflow-hidden ${className || ''}`}>
            {/* Title - visible with max 2 lines */}
            {thread.title && (
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    {thread.title}
                </h2>
            )}

            {/* Content - truncated after 3-4 lines with ellipsis */}
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {thread.content}
            </p>

            {/* Image - commented for full view only */}
            {/*{thread. && (*/}
            {/*    <div className="pb-3">*/}
            {/*        <img*/}
            {/*            src={thread.image}*/}
            {/*            alt="Thread content"*/}
            {/*            className="w-full rounded-2xl object-cover max-h-80"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*)}*/}

        </div>
    );
};