import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {PollDisplay} from "@/components/thread/mobile/thread-card/poll/PollDisplay";

interface ThreadCardContentProps {
    className?: string;
}

export const ThreadViewContent = ({className}: ThreadCardContentProps) => {
    const {thread} = useThread();
    return (
        <div className={`flex flex-col w-full overflow-hidden ${className || ''}`}>
            {thread.title && (
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    {thread.title}
                </h2>
            )}

            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {thread.content}
            </p>

            {thread.poll && (
                <PollDisplay thread={thread} className="p-3 mt-4 border border-border rounded-panel"/>
            )}
        </div>
    );
};