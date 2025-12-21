import React, {useState} from "react";
import {ThreadCommentDTO} from "@/model/thread.dto";
import {formatTime} from "@/lib/utils";
import {Clock, CornerDownRight, MessageCircle} from "lucide-react";
import {UserAvatar} from "@/components/common/avatar/UserAvatar";
import {ThreadCommentReply} from "@/components/thread/mobile/thread-card/thread-view/comment/ThreadCommentReply";

type ThreadCommentProps = {
    comment: ThreadCommentDTO;
}

export const ThreadComment = ({comment}: ThreadCommentProps) => {
    const {userInfo, createdAt, content, replies = []} = comment;
    const [showAllReplies, setShowAllReplies] = useState(false);

    const hasReplies = replies && replies.length > 0;
    const firstReply = hasReplies ? replies[0] : null;
    const remainingRepliesCount = replies.length - 1;
    const repliesToShow = showAllReplies ? replies : (firstReply ? [firstReply] : []);

    return (
        <div
            className="group/comment py-3 px-3 border-b border-slate-200 last:border-b-0 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-transparent transition-all duration-300">
            <div className="flex gap-4 mb-3">
                <UserAvatar
                    firstName={userInfo.name}
                    surname={userInfo.surname}
                    profileImageId={userInfo.profileImageId}
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-base">
                            {userInfo.name} {userInfo.surname}
                        </h3>
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <Clock className="w-4 h-4"/>
                            {formatTime(createdAt.toString())}
                        </span>
                    </div>

                    <p className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-wrap break-words mb-3">
                        {content}
                    </p>

                    {hasReplies && (
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-medium">
                            <MessageCircle className="w-3.5 h-3.5"/>
                            <span>{replies.length} {replies.length === 1 ? 'reply' : 'replies'}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Replies Section */}
            {hasReplies && (
                <div className="mt-4 space-y-1">
                    <div className="relative">
                        <div
                            className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-indigo-400 via-purple-400 to-transparent rounded-full opacity-40"/>

                        <div className="pl-3 space-y-0">
                            {repliesToShow.map((reply, index) => (
                                <div key={reply.id} className="relative">
                                    <CornerDownRight
                                        className="absolute top-5 w-4 h-4 mr-2 text-indigo-300"
                                        strokeWidth={2.5}
                                    />
                                    <ThreadCommentReply comment={reply}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    {remainingRepliesCount > 0 && (
                        <div className="pl-6 pt-2">
                            <button
                                onClick={() => setShowAllReplies(!showAllReplies)}
                                className="group/btn inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 hover:text-white bg-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 border-2 border-indigo-200 hover:border-transparent rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <MessageCircle className="w-4 h-4"/>
                                <span>
                                    {showAllReplies ? 'Show less'
                                        : `View ${remainingRepliesCount} more ${remainingRepliesCount === 1 ? 'reply' : 'replies'}`
                                    }
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};