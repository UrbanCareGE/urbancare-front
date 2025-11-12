'use client';

import React, {useState} from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {Heart, Send} from "lucide-react";
import {cn} from "@/lib/utils";
import {ThreadCommentInput} from "@/components/thread/mobile/thread-card/thread-view/ThreadCommentInput";

interface Comment {
    id: string;
    userInfo: {
        name: string;
        surname: string;
        profileImageId?: string;
    };
    content: string;
    createdAt: string;
    likes: number;
}

interface ThreadCommentsProps {
    className?: string;
}

export const ThreadComments = ({className}: ThreadCommentsProps) => {
    const {thread} = useThread();
    const {comments, commentCount} = thread;


    return (
        <div className={cn("flex flex-col gap-3", className)}>
            {/* Comment Input */}
            <ThreadCommentInput/>

            {/* Comments List */}
            <div className="space-y-3 mb-4">
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <p>კომენტარები ჯერ არ არის</p>
                        <p className="text-sm mt-1">იყავი პირველი ვინც დაწერს კომენტარს</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                            <div
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                {comment.userInfo.name[0]}{comment.userInfo.surname[0]}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-slate-900 text-sm">
                                        {comment.userInfo.name} {comment.userInfo.surname}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        15 წთ
                                    </span>
                                </div>

                                <p className="text-slate-700 text-sm leading-relaxed mb-2">
                                    {comment.content}
                                </p>

                                <div className="flex items-center gap-4">
                                    <button
                                        className="flex items-center gap-1 text-xs text-slate-600 hover:text-red-500 transition-colors">
                                        <Heart className="w-3.5 h-3.5"/>
                                        <span>{comment.voteDiff}</span>
                                    </button>
                                    <button
                                        className="text-xs text-slate-600 hover:text-blue-500 transition-colors font-medium">
                                        პასუხი
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Comment Input */}
        </div>
    );
};