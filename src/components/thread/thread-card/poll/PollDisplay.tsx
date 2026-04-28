'use client';

import React from 'react';
import { PollOptionDTO, ThreadInfoDTO } from '@/model/dto/thread.dto';
import { cn } from '@/lib/utils';
import { Check, Vote } from 'lucide-react';
import { usePollVote } from '@/hooks/query/thread/use-poll-vote';
import { useAuth } from '@/components/provider/AuthProvider';
import { useTranslation } from '@/i18n';

interface PollDisplayProps {
  thread: ThreadInfoDTO;
  className?: string;
}

interface PollOptionRowProps {
  thread: ThreadInfoDTO;
  option: PollOptionDTO;
  totalVotes: number;
  isLeading: boolean;
  isVotedByUser: boolean;
  hasUserVoted: boolean;
  apartmentId: string;
}

const PollOptionRow = ({
  thread,
  option,
  totalVotes,
  isLeading,
  isVotedByUser,
  hasUserVoted,
  apartmentId,
}: PollOptionRowProps) => {
  const percentage =
    totalVotes > 0 ? Math.round((option.voteCount / totalVotes) * 100) : 0;
  const { mutate, isPending } = usePollVote();

  const handleVote = () => {
    if (!thread.poll || isPending) return;
    mutate({
      apartmentId,
      pollId: thread.poll.id,
      voteId: option.id,
      threadId: thread.id,
    });
  };

  return (
    <button
      type="button"
      onClick={handleVote}
      disabled={isPending}
      className={cn(
        'group relative w-full overflow-hidden urbancare-rounded-lg',
        'transition-all duration-200 px-3 py-2 text-left',
        'bg-surface lg:hover:bg-surface-hover',
        isVotedByUser && 'ring-1 ring-text-tertiary/40',
        isPending && 'opacity-60 cursor-progress',
        !isPending && 'lg:active:scale-[0.99]'
      )}
    >
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 transition-all duration-500 ease-out bg-surface-container"
        style={{ width: hasUserVoted ? `${percentage}%` : '0%' }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={cn(
              'shrink-0 w-4 h-4 urbancare-rounded-full flex items-center justify-center transition-all',
              isVotedByUser
                ? 'bg-text-secondary text-surface'
                : 'border-2 border-border'
            )}
          >
            {isVotedByUser && <Check className="w-3 h-3" strokeWidth={3} />}
          </span>
          <span
            className={cn(
              'urbancare-text-base truncate',
              isVotedByUser || isLeading
                ? 'font-semibold text-text-primary'
                : 'text-text-secondary'
            )}
          >
            {option.content}
          </span>
        </div>

        {hasUserVoted && (
          <span
            className={cn(
              'shrink-0 urbancare-text-sm font-bold tabular-nums',
              isVotedByUser ? 'text-text-primary' : 'text-text-tertiary'
            )}
          >
            {percentage}%
          </span>
        )}
      </div>
    </button>
  );
};

export const PollDisplay = ({ thread, className }: PollDisplayProps) => {
  const t = useTranslation();
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const poll = thread.poll;

  const userId = user?.id;

  if (!poll || !apartmentId || !userId) return null;

  const totalVotes = poll.items.reduce((sum, opt) => sum + opt.voteCount, 0);
  const highestVotes = Math.max(...poll.items.map((opt) => opt.voteCount), 0);
  const hasUserVoted = poll.items.some((opt) =>
    opt.voters.some((voter) => voter.id === userId)
  );

  return (
    <div
      className={cn(
        'urbancare-rounded-2xl border border-border bg-surface-container/40 overflow-hidden',
        className
      )}
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-surface-variant/40">
        <div className="w-7 h-7 urbancare-rounded-lg bg-surface-container text-text-secondary flex items-center justify-center shrink-0">
          <Vote className="w-4 h-4" strokeWidth={2.25} />
        </div>
        <h4 className="flex-1 urbancare-text-sm font-semibold text-text-primary">
          {t.tags.POLL}
        </h4>
        <span className="urbancare-text-xs text-text-tertiary tabular-nums">
          {t.thread.totalVotes.replace('{count}', String(totalVotes))}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 p-2.5">
        {poll.items.map((option) => (
          <PollOptionRow
            key={option.id}
            thread={thread}
            option={option}
            apartmentId={apartmentId}
            totalVotes={totalVotes}
            isLeading={option.voteCount === highestVotes && highestVotes > 0}
            isVotedByUser={option.voters.some((voter) => voter.id === userId)}
            hasUserVoted={hasUserVoted}
          />
        ))}
      </div>
    </div>
  );
};

export default PollDisplay;
