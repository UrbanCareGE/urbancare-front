'use client';

import React, { useState } from 'react';
import { useCreateComment } from '@/hooks/query/thread/use-create-comment';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { useAuth } from '@/components/provider/AuthProvider';
import { MentionDTO, ThreadInfoDTO } from '@/model/dto/thread.dto';
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
  const [commentMentions, setCommentMentions] = useState<MentionDTO[]>([]);
  const { user } = useAuth();
  const t = useTranslation();
  const apartmentId = user?.selectedApartmentId;
  const searchParams = useSearchParams();
  const shouldFocusComment = searchParams.get('comment') === 'true';

  const { onSubmit } = useCreateComment();

  const handleAddComment = () => {
    if (!apartmentId) return;
    if (commentText.trim()) {
      setCommentText('');
      setCommentMentions([]);
    }
    onSubmit(apartmentId, thread.id, {
      content: commentText,
      mentions: commentMentions,
    });
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
        mentions={commentMentions}
        onMentionsChange={setCommentMentions}
        onSubmit={handleAddComment}
        placeholder={t.thread.writeComment}
        autoFocus={shouldFocusComment}
        className="flex-1"
      />
    </div>
  );
};
