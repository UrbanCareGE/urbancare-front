'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useParams, useRouter } from 'next/navigation';
import { ThreadCommentDTO } from '@/model/dto/thread.dto';
import { cn, formatTime } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { ReplyInput } from '@/components/thread/thread-card/thread-view/comment/ThreadReplyInput';
import { ThreadCommentReply } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentReply';
import { CommentVoteButton } from '@/components/thread/thread-card/thread-view/comment/CommentVoteButton';
import { CommentOptionsDropdown } from '@/components/thread/thread-card/thread-view/comment/CommentOptionsDropdown';
import { MentionedText } from '@/components/common/mention/MentionedText';

const INITIAL_REPLIES = 3;

type ThreadCommentProps = {
  comment: ThreadCommentDTO;
  onReply?: (commentId: string, replyText: string) => void;
};

export const ThreadComment = ({ comment, onReply }: ThreadCommentProps) => {
  const { userInfo, createdAt, content, replies = [] } = comment;
  const [showAll, setShowAll] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const router = useRouter();
  const params = useParams<{ apartmentId: string }>();

  const hasReplies = replies.length > 0;
  const visibleReplies = showAll ? replies : replies.slice(0, INITIAL_REPLIES);
  const hiddenCount = replies.length - INITIAL_REPLIES;

  const goToUser = () => {
    if (!userInfo?.id || !params?.apartmentId) return;
    router.push(`/apartment/${params.apartmentId}/user/${userInfo.id}`);
  };
  const goToMention = (mentionUserId: string) => {
    if (!params?.apartmentId) return;
    router.push(`/apartment/${params.apartmentId}/user/${mentionUserId}`);
  };

  const handleReplySubmit = (text: string) => {
    onReply?.(comment.id, text);
    setIsReplying(false);
  };

  return (
    <div className="px-4 py-3">
      {/* Comment row */}
      <div className="flex gap-3">
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={goToUser}
        >
          <UserAvatarView
            firstName={userInfo.name}
            surname={userInfo.surname}
            profileImageId={userInfo.profileImageId}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Content bubble */}
          <div className="flex items-center gap-1">
            <div className="bg-surface-container urbancare-rounded-3xl urbancare-rounded-tl-xs px-3.5 py-2 inline-block max-w-full space-y-0.5">
              <p
                onClick={goToUser}
                className="font-semibold urbancare-text-sm leading-tight text-text-primary cursor-pointer lg:hover:underline"
              >
                {userInfo.name} {userInfo.surname}
              </p>
              <p className="urbancare-text-base text-text-primary leading-relaxed whitespace-pre-wrap break-words">
                <MentionedText
                  content={content}
                  mentions={comment.mentions}
                  onMentionClick={(m) => goToMention(m.userId)}
                />
              </p>
            </div>
            <CommentOptionsDropdown comment={comment} />
          </div>

          {/* Meta / actions */}
          <div className="flex items-center gap-4 mt-1 px-1.5">
            <span className="urbancare-text-xs text-text-tertiary">
              {formatTime(createdAt.toString())}
            </span>
            <CommentVoteButton comment={comment} />
            <button
              onClick={() => setIsReplying(!isReplying)}
              className={cn(
                'urbancare-text-xs font-bold transition-colors duration-150',
                isReplying
                  ? 'text-primary'
                  : 'text-text-secondary lg:hover:text-primary'
              )}
            >
              Reply
            </button>
          </div>

          {/* Animated reply input */}
          <AnimatePresence>
            {isReplying && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <ReplyInput
                  commentId={comment.id}
                  userInfo={userInfo}
                  onSubmit={handleReplySubmit}
                  onCancel={() => setIsReplying(false)}
                  placeholder={`Reply to ${[userInfo.name, userInfo.surname].filter(Boolean).join(' ')}...`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Replies — indented with left border connector */}
      {hasReplies && (
        <div className="mt-2 ml-5 pl-4 border-l-2 border-border/50 space-y-1">
          {visibleReplies.map((reply) => (
            <ThreadCommentReply key={reply.id} comment={reply} />
          ))}

          {!showAll && hiddenCount > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-1 urbancare-text-sm font-semibold text-primary py-1 transition-colors lg:hover:text-primary/75"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              {hiddenCount} more {hiddenCount === 1 ? 'reply' : 'replies'}
            </button>
          )}

          {showAll && replies.length > INITIAL_REPLIES && (
            <button
              onClick={() => setShowAll(false)}
              className="flex items-center gap-1 urbancare-text-sm font-semibold text-text-secondary py-1 transition-colors lg:hover:text-primary"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};
