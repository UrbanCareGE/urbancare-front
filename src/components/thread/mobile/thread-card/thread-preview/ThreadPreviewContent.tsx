'use client'

import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {usePreviewable} from "@/components/thread/mobile/Previewable";
import {PollDisplay} from "@/components/thread/mobile/thread-card/poll/PollDisplay";
import {ThreadImagePreview} from "@/components/thread/mobile/thread-card/image-preview/ThreadImagePreview";
import {getClientFileUrl} from "@/lib/api-client";

interface ThreadCardContentProps {
    className?: string;
}

export const ThreadPreviewContent = ({className}: ThreadCardContentProps) => {
    const {thread} = useThread();
    const {openView} = usePreviewable();

    return (
        <div className={`flex flex-col w-full ${className || ''}`}>
            {/* Title - max 3 lines with ellipsis */}
            {thread.title && (
                <h2 className="text-lg font-semibold text-sky-950 mb-2 line-clamp-3">
                    {thread.title}
                </h2>
            )}

            {/* Content - truncated after 3-4 lines with ellipsis */}
            <p className="text-sky-950 leading-relaxed whitespace-pre-wrap line-clamp-3" onClick={openView}>
                {thread.content}
            </p>

            {/* Poll images */}
            {thread.imageIds &&
                <ThreadImagePreview imageLinks={thread.imageIds.map(id => getClientFileUrl(id))}/>
            }

            {/* Poll display */}
            {thread.poll && (
                <PollDisplay thread={thread} className="mt-3"/>
            )}

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