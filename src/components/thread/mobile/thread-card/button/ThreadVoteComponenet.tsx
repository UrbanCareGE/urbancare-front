import {Button} from "@/components/ui/button";
import {ThumbsDown, ThumbsUp} from "lucide-react";
import {cn} from "@/lib/utils";
import React, {useState} from "react";
import type {VoteStatus} from "@/components/thread/types";
import {useThread} from "@/components/thread/mobile/thread-card/ThreadCard";

interface ThreadVoteButtonGroup {
    className?: string;
}

export const ThreadVoteButtonGroup = ({className}: ThreadVoteButtonGroup) => {
    const {thread} = useThread();
    const [votes, setVotes] = useState<number>(thread.voteDiff);
    const [voteStatus, setVoteStatus] = useState<VoteStatus>(null);

    const handleVote = (type: 'up' | 'down') => {
        if (voteStatus === type) {
            setVotes(votes + (type === 'up' ? -1 : 1));
            setVoteStatus(null);
        } else if (voteStatus === null) {
            setVotes(votes + (type === 'up' ? 1 : -1));
            setVoteStatus(type);
        } else {
            setVotes(votes + (type === 'up' ? 2 : -2));
            setVoteStatus(type);
        }
    };
    return (
        <div className={cn("flex items-center gap-0.5 bg-slate-100 rounded-full p-1", className)}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVote('up')}
                className={`h-8 w-8 rounded-full transition-all ${
                    voteStatus === 'up'
                        ? 'bg-green-500 text-white'
                        : 'text-slate-600'
                }`}
            >
                <ThumbsUp className={`w-5 h-5 ${voteStatus === 'up' ? 'fill-current' : ''}`}/>
            </Button>

            <span className={cn(`px-1 text-sm font-semibold min-w-7 text-center text-slate-700`,
                {
                    'text-green-500': voteStatus === 'up',
                    'text-red-500': voteStatus === 'down'
                }
            )}>
                    {thread.voteDiff}
                </span>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => handleVote('down')}
                className={`h-8 w-8 rounded-full transition-all ${
                    voteStatus === 'down'
                        ? 'bg-red-500 text-white'
                        : 'text-slate-600'
                }`}
            >
                <ThumbsDown className={`w-5 h-5 ${voteStatus === 'down' ? 'fill-current' : ''}`}/>
            </Button>
        </div>
    );
};
