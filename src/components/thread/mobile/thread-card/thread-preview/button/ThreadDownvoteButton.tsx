import React from "react";
import {Button} from "@/components/ui/button";
import {ThumbsDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {useThreadVote} from "@/hooks/query/use-vote-thread";
import {VoteType} from "@/model/thread.dto";

function convertVote(vote: number): VoteType | null {
    if (vote === 1) return VoteType.UPVOTE;
    if (vote === -1) return VoteType.DOWNVOTE;
    return null;
}

export const ThreadDownvoteButton = ({className}: { className?: string }) => {
    const {thread, setThread} = useThread();
    const {mutate} = useThreadVote();

    const voteStatus = convertVote(thread.selfVote);

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
        <Button
            variant="mobile-ghost"
            size="icon"
            onClick={() => handleDownvote()}
            className={cn(
                "h-10 w-12 rounded-xl transition-all [&_svg]:size-6",
                {"bg-error": voteStatus === VoteType.DOWNVOTE}
            )}
        >
            <ThumbsDown className={cn("w-5 h-5 stroke-error", {"stroke-white": voteStatus === VoteType.DOWNVOTE})}/>
        </Button>
    );
};
