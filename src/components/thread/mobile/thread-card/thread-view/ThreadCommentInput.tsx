'use client';

import {Send} from "lucide-react";
import React, {useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useCreateComment} from "@/hooks/query/use-create-comment";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";

export const ThreadCommentInput = () => {
    const [commentText, setCommentText] = useState('');
    const {thread} = useThread();

    const {onSubmit} = useCreateComment()

    const handleAddComment = () => {
        if (commentText.trim()) {
            setCommentText('');
        }
        onSubmit(thread.id, {content: commentText})
    };
    return (
        <div className="p-1">
            <div className="flex gap-2 items-start">
                <div className="flex-1 relative">
                    <Textarea
                        placeholder="დაწერეთ კომენტარი..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows={1}
                        className="w-full px-4 py-2.5 pr-11 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none text-sm"
                        style={{minHeight: '40px', maxHeight: '100px'}}
                    />
                    <Button
                        variant={"ghost"}
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                        className="absolute right-1.5 bottom-1.5 h-7 w-7 rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                        <Send className="w-3.5 h-3.5 text-white"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};
