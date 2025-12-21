import {UserAvatar} from "@/components/common/avatar/UserAvatar";
import {ThreadCommentDTO} from "@/model/thread.dto";
import {formatTime} from "@/lib/utils";
import {Clock} from "lucide-react";
import React from "react";

type ThreadCommentReplyProps = {
    comment: ThreadCommentDTO;
}

export const ThreadCommentReply = ({comment}: ThreadCommentReplyProps) => {
    const {userInfo, createdAt, content} = comment;

    return (
        <div className="group relative flex gap-3 py-3 px-4 rounded-lg hover:bg-slate-50 transition-all duration-200">
            <UserAvatar
                firstName={userInfo.name}
                surname={userInfo.surname}
                profileImageId={userInfo.profileImageId}
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-base">
                        {userInfo.name} {userInfo.surname}
                    </h4>
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-4 h-4"/>
                        {formatTime(createdAt.toString())}
                    </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {content}
                </p>
            </div>
        </div>
    );
};