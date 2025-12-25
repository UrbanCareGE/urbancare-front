import React from "react";
import {Button} from "@/components/ui/button";
import {ThumbsDown, ThumbsUp} from "lucide-react";
import {cn} from "@/lib/utils";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {useThreadVote} from "@/hooks/query/use-vote-thread";
import {VoteType} from "@/model/thread.dto";

export const ThreadUpvoteButton = ({className}: { className?: string }) => {
    const {thread} = useThread();
    const {vote} = useThreadVote();

    const isUpvoted = thread.selfVote === 1;
    const isDownvoted = thread.selfVote === -1;

    const handleUpvote = () => {
        vote(thread.id, VoteType.UPVOTE);
    };

    const handleDownvote = () => {
        vote(thread.id, VoteType.DOWNVOTE);
    };

    return (
        <div className={"flex items-center"}>
            <Button
                onClick={handleUpvote}
                className={cn(
                    "h-9 px-3 rounded-s-full rounded-e-none transition-all [&_svg]:size-5 text-primary bg-primary/10 text-sm",
                    {"bg-primary text-white": isUpvoted}
                )}
            >
                <ThumbsUp
                    className={cn("w-5 h-5 stroke-primary", {"stroke-white": isUpvoted})}/>
                {thread.voteDiff}
            </Button>
            <Button
                onClick={handleDownvote}
                className={cn(
                    "h-9 px-3 rounded-s-none text-error rounded-e-full transition-all [&_svg]:size-5 bg-error/10 text-sm",
                    {"bg-error text-white": isDownvoted}
                )}
            >
                {thread.voteDiff}
                <ThumbsDown className={cn("stroke-error", {"stroke-white": isDownvoted})}/>
            </Button>
        </div>
    );
};