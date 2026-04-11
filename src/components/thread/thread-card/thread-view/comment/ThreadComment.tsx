'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThreadCommentDTO } from '@/model/dto/thread.dto';
import { cn, formatTime } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { ReplyInput } from '@/components/thread/thread-card/thread-view/comment/ThreadReplyInput';
import { ThreadCommentReply } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentReply';

const INITIAL_REPLIES = 3;

type ThreadCommentProps = {
  comment: ThreadCommentDTO;
  onReply?: (commentId: string, replyText: string) => void;
};

export const ThreadComment = ({ comment, onReply }: ThreadCommentProps) => {
  const { userInfo, createdAt, content, replies = [] } = comment;
  const [showAll, setShowAll] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const hasReplies = replies.length > 0;
  const visibleReplies = showAll ? replies : replies.slice(0, INITIAL_REPLIES);
  const hiddenCount = replies.length - INITIAL_REPLIES;

  const handleReplySubmit = (text: string) => {
    onReply?.(comment.id, text);
    setIsReplying(false);
  };

  return (
    <div className="px-3 py-3">
      {/* Comment row */}
      <div className="flex gap-2.5">
        <div className="flex-shrink-0">
          <UserAvatarView
            firstName={userInfo.name}
            surname={userInfo.surname}
            profileImageId={userInfo.profileImageId}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Content bubble */}
          <div className="bg-surface-container rounded-urbancare-3xl rounded-tl-urbancare-xs px-3.5 py-2.5 inline-block max-w-full">
            <p className="font-semibold text-urbancare-md leading-tight text-text-primary">
              {userInfo.name} {userInfo.surname}
            </p>
            <p className="text-urbancare-md text-text-primary leading-relaxed whitespace-pre-wrap break-words mt-1">
              {content}
            </p>
          </div>

          {/* Meta / actions */}
          <div className="flex items-center gap-3 mt-1.5 px-1">
            <span className="text-urbancare-xs text-text-tertiary">
              {formatTime(createdAt.toString())}
            </span>
            <button
              onClick={() => setIsReplying(!isReplying)}
              className={cn(
                'text-urbancare-xs font-bold transition-colors duration-150',
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
                  placeholder={`Reply to ${userInfo.name}...`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Replies — indented with left border connector */}
      {hasReplies && (
        <div className="mt-2 ml-[19px] pl-4 border-l-2 border-border/50 space-y-1">
          {visibleReplies.map((reply) => (
            <ThreadCommentReply key={reply.id} comment={reply} />
          ))}

          {!showAll && hiddenCount > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-1 text-urbancare-sm font-semibold text-primary py-1 transition-colors lg:hover:text-primary/75"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              {hiddenCount} more {hiddenCount === 1 ? 'reply' : 'replies'}
            </button>
          )}

          {showAll && replies.length > INITIAL_REPLIES && (
            <button
              onClick={() => setShowAll(false)}
              className="flex items-center gap-1 text-urbancare-sm font-semibold text-text-secondary py-1 transition-colors lg:hover:text-primary"
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
