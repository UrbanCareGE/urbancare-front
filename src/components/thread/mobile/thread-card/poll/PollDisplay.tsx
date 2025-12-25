'use client';

import React from 'react';
import {PollOptionDTO, ThreadInfoDTO} from '@/model/thread.dto';
import {cn} from '@/lib/utils';
import {Circle, CircleCheck} from "lucide-react";
import {usePollVote} from "@/hooks/query/thread/use-poll-vote";
import {useAuth} from "@/components/provider/AuthProvider";

interface PollDisplayProps {
    thread: ThreadInfoDTO;
    className?: string;
}

interface PollOptionBarProps {
    thread: ThreadInfoDTO;
    option: PollOptionDTO;
    totalVotes: number;
    isHighest: boolean;
    isVotedByUser: boolean;
    apartmentId: string;
}

const PollOptionBar = ({thread, option, totalVotes, isHighest, isVotedByUser, apartmentId}: PollOptionBarProps) => {
    const percentage = totalVotes > 0 ? Math.round((option.voteCount / totalVotes) * 100) : 0;
    const {mutate, isPending} = usePollVote();

    const handleVote = () => {
        if (!thread.poll || isPending) return;
        mutate({
            apartmentId,
            pollId: thread.poll.id,
            voteId: option.id,
            threadId: thread.id
        });
    };

    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center text-sm">
                <span className={cn(
                    "text-sky-950",
                    isHighest && "font-semibold"
                )}>
                    {option.content}
                </span>
                <span className={cn(
                    "text-sky-800",
                    isHighest && "font-semibold"
                )}>
                    {percentage}%
                </span>
            </div>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={handleVote}
                    disabled={isPending}
                    className={cn(
                        "transition-colors",
                        isPending && "opacity-50"
                    )}
                >
                    {isVotedByUser ? (
                        <CircleCheck className="w-5 h-5 text-primary"/>
                    ) : (
                        <Circle className="w-5 h-5 text-slate-400"/>
                    )}
                </button>
                <div className="relative flex-1 ml-3 h-8 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                        className={cn(
                            "absolute inset-y-0 left-0 rounded-lg transition-all duration-500 ease-out",
                            isHighest ? "bg-primary" : "bg-primary/60"
                        )}
                        style={{width: `${percentage}%`}}
                    />
                    <div className="absolute inset-0 flex items-center px-3">
                        <span className={cn(
                            "text-sm",
                            percentage > 50 ? "text-white" : "text-sky-900"
                        )}>
                            {option.voteCount} {option.voteCount === 1 ? 'ხმა' : 'ხმა'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PollDisplay = ({thread, className}: PollDisplayProps) => {
    const {user} = useAuth();
    const poll = thread.poll;

    const apartmentId = user?.selectedApartment?.id;
    const userId = user?.id;

    if (!poll || !apartmentId || !userId) return null;

    const totalVotes = poll.items.reduce((sum, opt) => sum + opt.voteCount, 0);
    const highestVotes = Math.max(...poll.items.map(opt => opt.voteCount), 0);

    return (
        <div className={cn("space-y-3 py-2", className)}>
            {poll.items.map((option) => (
                <PollOptionBar
                    key={option.id}
                    thread={thread}
                    option={option}
                    apartmentId={apartmentId}
                    totalVotes={totalVotes}
                    isHighest={option.voteCount === highestVotes && highestVotes > 0}
                    isVotedByUser={option.voters.some(voter => voter.id === userId)}
                />
            ))}
            <div className="text-sm text-slate-500 text-center pt-1">
                სულ: {totalVotes} ხმა
            </div>
        </div>
    );
};

export default PollDisplay;
