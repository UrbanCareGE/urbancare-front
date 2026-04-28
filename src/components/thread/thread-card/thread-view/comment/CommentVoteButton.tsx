'use client';

import React from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCommentReactionVote } from '@/hooks/query/thread/use-comment-reaction-vote';
import { useAuth } from '@/components/provider/AuthProvider';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { ThreadCommentDTO } from '@/model/dto/thread.dto';

interface CommentVoteButtonProps {
  comment: ThreadCommentDTO;
}

export const CommentVoteButton = ({ comment }: CommentVoteButtonProps) => {
  const { thread } = useThread();
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const { mutate, isPending } = useCommentReactionVote();

  const reactions = comment.reactions;
  const likeOption = reactions?.items?.[0];
  const dislikeOption = reactions?.items?.[1];

  const userId = user?.id;

  const isLiked =
    likeOption?.voters?.some((v) => v.id === userId) ?? false;
  const isDisliked =
    dislikeOption?.voters?.some((v) => v.id === userId) ?? false;

  const likeCount = likeOption?.voteCount ?? 0;
  const dislikeCount = dislikeOption?.voteCount ?? 0;

  if (!reactions || !likeOption || !dislikeOption || !apartmentId) return null;

  const handleVote = (optionId: string) => {
    if (isPending) return;
    mutate({
      apartmentId,
      reactionId: reactions.id,
      optionId,
      threadId: thread.id,
      commentId: comment.id,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => handleVote(likeOption.id)}
        disabled={isPending}
        className={cn(
          'group inline-flex items-center gap-1 urbancare-text-xs font-bold',
          'transition-colors duration-150 disabled:opacity-60',
          isLiked
            ? 'text-primary'
            : 'text-text-secondary lg:hover:text-primary'
        )}
      >
        <ThumbsUp
          className={cn(
            'w-3.5 h-3.5',
            isLiked ? 'fill-primary stroke-primary' : 'stroke-current'
          )}
        />
        {likeCount > 0 && <span className="tabular-nums">{likeCount}</span>}
      </button>
      <button
        type="button"
        onClick={() => handleVote(dislikeOption.id)}
        disabled={isPending}
        className={cn(
          'group inline-flex items-center gap-1 urbancare-text-xs font-bold',
          'transition-colors duration-150 disabled:opacity-60',
          isDisliked
            ? 'text-error'
            : 'text-text-secondary lg:hover:text-error'
        )}
      >
        <ThumbsDown
          className={cn(
            'w-3.5 h-3.5',
            isDisliked ? 'fill-error stroke-error' : 'stroke-current'
          )}
        />
        {dislikeCount > 0 && (
          <span className="tabular-nums">{dislikeCount}</span>
        )}
      </button>
    </div>
  );
};
