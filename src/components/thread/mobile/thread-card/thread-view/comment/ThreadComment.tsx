import React from "react";
import {ThreadCommentDTO} from "@/model/thread.dto";
import {cn, formatTime} from "@/lib/utils";
import {Clock} from "lucide-react";
import {UserAvatar} from "@/components/common/avatar/UserAvatar";

type ThreadCommentProps = {
    comment: ThreadCommentDTO;
}

export const ThreadComment = ({comment}: ThreadCommentProps) => {
    const {userInfo, createdAt} = comment;

    return (
        <div key={comment.id} className="flex flex-col border-b px-3 pt-3 pb-3">
            <div className={cn("flex items-start gap-3 mb-2")}>
                <UserAvatar
                    firstName={userInfo.name}
                    surname={userInfo.surname}
                    profileImageId={userInfo.profileImageId}
                />
                <div className={"flex flex-col flex-1 min-w-0"}>
                    <div className="flex flex-1 justify-start gap-2 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-base truncate">
                            {userInfo.name} {userInfo.surname}
                        </h3>
                        <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3"/>{formatTime(createdAt.toString())}
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap break-words w-full line-clamp-5">
                {comment.content}
            </p>


            {/*<div className="flex items-center gap-4 mt-2">*/}
            {/*    <Button*/}
            {/*        variant={"ghost"}*/}
            {/*        className="flex items-center gap-1 text-xs text-slate-600 hover:text-red-500 transition-colors">*/}
            {/*        <Heart className="w-3.5 h-3.5"/>*/}
            {/*        <span>{comment.voteDiff}</span>*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        variant={"ghost"}*/}
            {/*        className="text-xs text-slate-600 hover:text-blue-500 transition-colors font-medium">*/}
            {/*        პასუხი*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    );
};