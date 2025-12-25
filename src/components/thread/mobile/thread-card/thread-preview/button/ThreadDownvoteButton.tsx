import React from "react";
import {Button} from "@/components/ui/button";
import {ThumbsDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {useThreadVote} from "@/hooks/query/thread/use-vote-thread";
import {VoteType} from "@/model/thread.dto";

export const ThreadDownvoteButton = ({className}: { className?: string }) => {
    const {thread} = useThread();
    const {vote} = useThreadVote();

    const isDownvoted = thread.selfVote === -1;

    const handleDownvote = () => {
        vote(thread.id, VoteType.DOWNVOTE);
    };

    return (
        <Button
            variant="mobile-ghost"
            size="icon"
            onClick={handleDownvote}
            className={cn(
                "h-10 w-12 rounded-xl transition-all [&_svg]:size-6",
                {"bg-error": isDownvoted}
            )}
        >
            <ThumbsDown className={cn("w-5 h-5 stroke-error", {"stroke-white": isDownvoted})}/>
        </Button>
    );
};
