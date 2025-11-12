import {Button} from "@/components/ui/button";
import {MessageCircle} from "lucide-react";
import React from "react";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {cn} from "@/lib/utils";
import {VoteType} from "@/model/thread.dto";

interface ThreadCommentButtonProps {
    className?: string
}

export const ThreadPreviewCommentButton = ({className}: ThreadCommentButtonProps) => {
    const {thread} = useThread();

    return (
        <Button
            variant="ghost"
            size="sm"
            className={cn(
                "h-10 w-10 rounded-full transition-all [&_svg]:size-6 text-slate-600"
            )}
        >
            <MessageCircle className="w-5 h-5"/>
            {/*<span className="text-sm font-medium">{thread.comments}</span>*/}
        </Button>
    );
};
