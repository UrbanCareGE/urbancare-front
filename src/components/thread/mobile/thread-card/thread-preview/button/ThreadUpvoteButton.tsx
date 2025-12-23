import React from "react";
import {Button} from "@/components/ui/button";
import {ArrowBigUp, ThumbsDown, ThumbsUp} from "lucide-react";
import {cn} from "@/lib/utils";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {useThreadVote} from "@/hooks/query/use-vote-thread";
import {VoteType} from "@/model/thread.dto";

function convertVote(vote: number): VoteType | null {
    if (vote === 1) return VoteType.UPVOTE;
    if (vote === -1) return VoteType.DOWNVOTE;
    return null;
}

export const ThreadUpvoteButton = ({className}: { className?: string }) => {
    const {thread, setThread} = useThread();
    const {mutate} = useThreadVote();

    const voteStatus = convertVote(thread.selfVote);

    const handleUpvote = () => {
        setThread(prev => ({
            ...prev,
            selfVote: thread.selfVote == 1 ? 0 : 1
        }));

        mutate(
            {threadId: thread.id, vote: {voteType: VoteType.UPVOTE}},
            {
                onError: () => {
                    // Roll back on error
                    setThread(prev => ({...prev, ...thread}));
                },
            }
        );
    };

    const handleDownvote = () => {
        mutate(
            {threadId: thread.id, vote: {voteType: VoteType.DOWNVOTE}},
            {
                onError: () => {
                    // Roll back on error
                    setThread(prev => ({...prev, ...thread}));
                },
            }
        );
        setThread(prev => ({
            ...prev,
            selfVote: thread.selfVote === -1 ? 0 : -1
        }));
    };

    return (
        <div className={"flex items-center"}>
            <Button
                onClick={() => handleUpvote()}
                className={cn(
                    "h-9 px-3 rounded-s-full rounded-e-none transition-all [&_svg]:size-5 text-primary bg-primary/10 text-sm",
                    {"bg-primary text-white": voteStatus === VoteType.UPVOTE}
                )}
            >
                <ThumbsUp
                    className={cn("w-5 h-5 stroke-primary", {"stroke-white ": voteStatus === VoteType.UPVOTE})}/>
                {thread.voteDiff}
            </Button>
            <Button
                onClick={() => handleDownvote()}
                className={cn(
                    "h-9 px-3 rounded-s-none text-error rounded-e-full transition-all [&_svg]:size-5 bg-error/10 text-sm",
                    {"bg-error text-white": voteStatus === VoteType.DOWNVOTE}
                )}
            >
                {thread.voteDiff}
                <ThumbsDown className={cn("stroke-error", {"stroke-white": voteStatus === VoteType.DOWNVOTE})}/>
            </Button>
        </div>
    );
};