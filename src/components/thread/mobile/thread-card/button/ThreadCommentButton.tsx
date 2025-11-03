import {Button} from "@/components/ui/button";
import {MessageCircle} from "lucide-react";
import React from "react";
import {ThreadInfoDTO} from "@/model/thread.dto";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";

interface ThreadCommentButtonProps {
    className?: string
}

export const ThreadCommentButton = ({className}: ThreadCommentButtonProps) => {
    const thread = useThread();

    return (
        <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-slate-600 hover:text-slate-900 p-2"
        >
            <MessageCircle className="w-5 h-5"/>
            {/*<span className="text-sm font-medium">{thread.comments}</span>*/}
        </Button>
    );
};
