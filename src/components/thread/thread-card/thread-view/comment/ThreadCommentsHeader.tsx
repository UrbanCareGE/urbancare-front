import React from 'react';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { CommentSortOption } from '@/model/dto/thread.dto';
import { CommentSortDropDown } from '@/components/thread/thread-card/thread-view/comment/CommentSortDropDown';

interface ThreadCommentsHeaderProps {
  commentSort?: CommentSortOption;
  onCommentSortChange?: (value: CommentSortOption) => void;
}

export const ThreadCommentsHeader = ({
  commentSort,
  onCommentSortChange,
}: ThreadCommentsHeaderProps = {}) => {
  const { thread } = useThread();
  const t = useTranslation();
  const { commentCount } = thread;
  const showSort = !!commentSort && !!onCommentSortChange;

  return (
    <div className="flex items-center gap-2 w-full">
      <MessageCircle className="w-5 h-5 text-text-tertiary shrink-0" />
      <h2 className="urbancare-text-xl font-semibold text-text-primary truncate">
        {t.thread.comments}
        {commentCount > 0 && (
          <span className="ml-1.5 urbancare-text-base font-normal text-text-tertiary tabular-nums">
            ({commentCount})
          </span>
        )}
      </h2>
      {showSort && (
        <div className="ml-auto">
          <CommentSortDropDown
            value={commentSort}
            onChange={onCommentSortChange}
          />
        </div>
      )}
    </div>
  );
};
