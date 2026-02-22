import React, { useState } from 'react';
import { ThreadCommentDTO } from '@/model/dto/thread.dto';
import { cn, formatTime } from '@/lib/utils';
import { Clock, CornerDownRight } from 'lucide-react';
import { UserAvatar } from '@/components/common/avatar/UserAvatar';
import { ReplyInput } from '@/components/thread/thread-card/thread-view/comment/ThreadReplyInput';
import { ThreadCommentReply } from '@/components/thread/thread-card/thread-view/comment/ThreadCommentReply';

type ThreadCommentProps = {
  comment: ThreadCommentDTO;
  onReply?: (commentId: string, replyText: string) => void;
};

export const ThreadComment = ({ comment, onReply }: ThreadCommentProps) => {
  const { userInfo, createdAt, content, replies = [] } = comment;
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const hasReplies = replies && replies.length > 0;
  const remainingRepliesCount = showAllReplies
    ? 0
    : Math.max(0, replies.length - 3);
  const repliesToShow = showAllReplies ? replies : replies.slice(0, 3);

  const handleReplySubmit = (text: string) => {
    if (onReply) {
      onReply(comment.id, text);
    }
    setIsReplying(false);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  return (
    <div className="py-4 px-4 bg-surface">
      {/* Main Comment */}
      <div className="flex gap-3">
        <UserAvatar
          firstName={userInfo.name}
          surname={userInfo.surname}
          profileImageId={userInfo.profileImageId}
        />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-baseline mb-1">
            <span className="font-semibold text-sm text-text-primary">
              {userInfo.name} {userInfo.surname}
            </span>
            <span className="ml-auto flex gap-1 text-xs text-text-muted">
              <Clock className="w-4 h-4" />
              {formatTime(createdAt.toString())}
            </span>
          </div>

          {/* Content */}
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap break-words mb-2">
            {content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsReplying(!isReplying)}
              className={cn(
                'text-xs font-medium transition-colors',
                isReplying ? 'text-blue-600' : 'text-slate-600'
              )}
            >
              Reply
            </button>
            {hasReplies && (
              <span className="text-xs text-slate-500">
                {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reply Input */}
      {isReplying && (
        <div className="mt-3">
          <ReplyInput
            commentId={comment.id}
            userInfo={userInfo}
            onSubmit={handleReplySubmit}
            onCancel={handleCancelReply}
            placeholder={`Reply to ${userInfo.name}...`}
          />
        </div>
      )}

      {/* Replies */}
      {hasReplies && (
        <div className="ml-5 mt-3">
          {repliesToShow.map((reply) => (
            <ThreadCommentReply key={reply.id} comment={reply} />
          ))}

          {remainingRepliesCount > 0 && (
            <button
              onClick={() => setShowAllReplies(true)}
              className="flex items-center gap-2 text-sm font-medium text-text-primary py-2"
            >
              <CornerDownRight className="w-4 h-4" />
              <span>
                {remainingRepliesCount} more{' '}
                {remainingRepliesCount === 1 ? 'reply' : 'replies'}
              </span>
            </button>
          )}

          {showAllReplies && replies.length > 3 && (
            <button
              onClick={() => setShowAllReplies(false)}
              className="text-sm font-medium text-blue-600 py-2"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};
