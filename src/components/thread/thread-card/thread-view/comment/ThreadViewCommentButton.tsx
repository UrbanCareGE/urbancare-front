'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCreateComment } from '@/hooks/query/thread/use-create-comment';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { useAuth } from '@/components/provider/AuthProvider';
import { ThreadInfoDTO } from '@/model/dto/thread.dto';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/i18n';
import { CommentComposerInput } from '@/components/thread/thread-card/thread-view/comment/CommentComposerInput';

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
  const apartmentId = user?.selectedApartmentId;
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
      <CommentComposerInput
        value={commentText}
        onChange={setCommentText}
        onSubmit={handleAddComment}
        placeholder={t.thread.writeComment}
        inputRef={commentRef}
        className="flex-1"
      />
    </div>
  );
};
