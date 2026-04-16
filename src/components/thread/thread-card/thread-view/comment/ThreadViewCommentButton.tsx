'use client';

import { Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useCreateComment } from '@/hooks/query/thread/use-create-comment';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { useAuth } from '@/components/provider/AuthProvider';
import { ThreadInfoDTO } from '@/model/dto/thread.dto';
import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';

type ThreadViewCommentButtonProps = {
  thread: ThreadInfoDTO;
  className: string;
};

export const ThreadViewCommentButton = ({
  thread,
  className,
}: ThreadViewCommentButtonProps) => {
  const [commentText, setCommentText] = useState('');
  const { user } = useAuth();
  const t = useTranslation();
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const searchParams = useSearchParams();
  const shouldFocusComment = searchParams.get('comment') === 'true';

  useEffect(() => {
    if (shouldFocusComment && commentRef.current) {
      commentRef.current.focus();
    }
  }, [shouldFocusComment]);

  const { onSubmit } = useCreateComment();

  const handleAddComment = () => {
    if (!apartmentId) return;
    if (commentText.trim()) {
      setCommentText('');
    }
    onSubmit(apartmentId, thread.id, { content: commentText });
  };

  if (!user) {
    return <div></div>;
  }

  return (
    <div
      className={cn('flex items-center px-4 py-3 gap-3 w-full', className)}
    >
      <UserAvatarView
        profileImageId={user?.profileImageId}
        firstName={user?.name}
        surname={user?.surname}
      />
      <div className="flex-1 relative">
        <Textarea
          ref={commentRef}
          placeholder={t.thread.writeComment}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={1}
          className="w-full px-4 py-2.5 pr-12 bg-surface-container border-none rounded-urbancare-full focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none text-urbancare-base text-text-primary placeholder:text-text-tertiary"
          style={{ minHeight: '40px', maxHeight: '100px' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
        />
        <button
          onClick={handleAddComment}
          disabled={!commentText.trim()}
          className="absolute right-2 bottom-1.5 h-9 w-9 rounded-urbancare-full bg-primary lg:hover:bg-primary/80 lg:active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-150"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
