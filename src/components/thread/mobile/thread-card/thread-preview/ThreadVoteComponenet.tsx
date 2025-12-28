import React from "react";
import {Button} from "@/components/ui/button";
import {ThumbsDown, ThumbsUp} from "lucide-react";
import {cn} from "@/lib/utils";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";
import {VoteType} from "@/model/thread.dto";

function convertVote(vote: number): VoteType | null {
    if (vote === 1) return VoteType.UPVOTE;
    if (vote === -1) return VoteType.DOWNVOTE;
    return null;
}

export const ThreadVoteButtonGroup = ({className}: { className?: string }) => {
    const {thread, setThread} = useThread();

    const voteStatus = convertVote(thread.selfVote);

    const handleVote = (type: VoteType) => {
        let newVoteDiff = thread.voteDiff;
        let newSelfVote = 0;

        if (voteStatus === type) {
            newVoteDiff += type === VoteType.UPVOTE ? -1 : 1;
            newSelfVote = 0;
        } else if (voteStatus === null) {
            // First-time vote
            newVoteDiff += type === VoteType.UPVOTE ? 1 : -1;
            newSelfVote = type === VoteType.UPVOTE ? 1 : -1;
        } else {
            // Switching vote
            newVoteDiff += type === VoteType.UPVOTE ? 2 : -2;
            newSelfVote = type === VoteType.UPVOTE ? 1 : -1;
        }

        setThread(prev => ({
            ...prev,
            voteDiff: newVoteDiff,
            selfVote: newSelfVote,
        }));

        // mutate(
        //     {threadId: thread.id, vote: {voteType: type}},
        //     {
        //         onError: () => {
        //             // Roll back on error
        //             setThread(prev => ({...prev, ...thread}));
        //         },
        //     }
        // );
    };

    return (
        <div className={cn("flex items-center gap-0.5 bg-slate-100 rounded-full p-1", className)}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVote(VoteType.UPVOTE)}
                className={cn(
                    "h-8 w-8 rounded-full transition-all",
                    voteStatus === VoteType.UPVOTE ? "bg-green-500 text-white" : "text-slate-600"
                )}
            >
                <ThumbsUp className="w-5 h-5"/>
            </Button>

            <span
                className={cn(
                    "px-1 text-sm font-semibold min-w-7 text-center",
                    voteStatus === VoteType.UPVOTE && "text-green-500",
                    voteStatus === VoteType.DOWNVOTE && "text-red-500"
                )}
            >
        {thread.voteDiff}
      </span>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVote(VoteType.DOWNVOTE)}
                className={cn(
                    "h-8 w-8 rounded-full transition-all",
                    voteStatus === VoteType.DOWNVOTE ? "bg-red-500 text-white" : "text-slate-600"
                )}
            >
                <ThumbsDown className="w-5 h-5"/>
            </Button>
        </div>
    );
};
