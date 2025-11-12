import React from "react";
import {ThreadCommentDTO} from "@/model/thread.dto";
import {UserAvatar} from "@/components/common/avatar/UserAvatar";

type ThreadCommentProps = {
    comment: ThreadCommentDTO;
}

export const ThreadComment = ({comment}: ThreadCommentProps) => {
    const {userInfo} = comment;
    return (
        <div key={comment.id} className="flex min-h-20 gap-3 border-b px-3">
            <UserAvatar firstName={userInfo.name} surname={userInfo.surname} profileImageId={userInfo.profileImageId}/>

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

                {/*<div className="flex items-center gap-4">*/}
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
        </div>
    );
};
