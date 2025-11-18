'use client';

import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {cn} from "@/lib/utils";
import {ThreadViewCommentButton} from "@/components/thread/mobile/thread-card/thread-view/comment/ThreadViewCommentButton";
import {ThreadComment} from "@/components/thread/mobile/thread-card/thread-view/comment/ThreadComment";

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

export const ThreadCommentGrid = ({className}: ThreadCommentsProps) => {
    const {thread} = useThread();
    const {comments, commentCount} = thread;

    return (
        <div className={cn("flex flex-col", className)}>
            {/* Comments List */}
            <div>
                {comments.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <p>კომენტარები ჯერ არ არის</p>
                        <p className="text-sm mt-1">იყავი პირველი ვინც დაწერს კომენტარს</p>
                    </div>
                ) : (
                    comments.map((comment) => (
                        <ThreadComment key={comment.id} comment={comment}/>
                    ))
                )}
            </div>
        </div>
    );
};