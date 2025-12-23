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
            className={cn(
                "h-9 px-3 rounded-full bg-tertiary/10 transition-all [&_svg]:size-5 text-tertiary"
            )}
        >
            <MessageCircle className="text-tertiary"/>
            {thread.comments.length}
        </Button>
    );
};
