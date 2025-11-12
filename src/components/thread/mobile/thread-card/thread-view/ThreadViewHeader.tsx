import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {getClientFileUrl} from "@/lib/api-client";
import {Clock, XIcon} from "lucide-react";
import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {cn, formatTime} from "@/lib/utils";
import {SheetClose} from "@/components/ui/sheet";
import {usePreviewable} from "@/components/thread/mobile/sheet/Previewable";

interface ThreadCardHeaderProps {
    className?: string;
}

export const ThreadViewHeader = ({className}: ThreadCardHeaderProps) => {
    const {thread} = useThread();
    const {userInfo, createdAt} = thread;

    return (
        <div className={cn("w-full flex items-start gap-3", className)}>
            <Avatar className="cursor-pointer w-12 h-12 rounded-full">
                <AvatarImage src={getClientFileUrl(userInfo?.profileImageId)} alt="@shadcn"
                             className={'object-cover'}/>
                <AvatarFallback>{userInfo.name[0] + ' ' + userInfo.surname[0]}</AvatarFallback>
            </Avatar>
            <div className={"flex flex-col flex-1 min-w-0"}>
                <div className="flex justify-start gap-2 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-base truncate">
                        {userInfo.name} {userInfo.surname}
                    </h3>
                    <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3"/>{formatTime(createdAt.toString())}
                    </span>
                </div>
            </div>
            <SheetClose className="shrink-0">
                <XIcon className="w-8 h-8"/>
            </SheetClose>
        </div>
    );
};