import React from "react";
import {ThreadInfoDTO} from "@/model/thread.dto";

interface ThreadCardTitleProps {
    thread: ThreadInfoDTO
    className?: string
}


export const ThreadCardTitle = ({thread, className}: ThreadCardTitleProps) => {
    return (
        <div className="px-5 pb-3">
            {thread.title && (
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                    {thread.title}
                </h2>
            )}
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {thread.content}
            </p>
        </div>
    );
};
