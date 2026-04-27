'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';
import { useCreateComment } from '@/hooks/query/thread/use-create-comment';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useAuth } from '@/components/provider/AuthProvider';
import { ExtractUserInitials } from '@/lib/utils';
import Image from 'next/image';
import { CommentComposerInput } from '@/components/thread/thread-card/thread-view/comment/CommentComposerInput';

type ReplyInputProps = {
  commentId: string;
  userInfo: UserSnapshotDTO;
  onSubmit: (text: string) => void;
  onCancel: () => void;
  placeholder?: string;
};

export const ReplyInput = ({
  userInfo,
  commentId,
  onSubmit,
  onCancel,
  placeholder = 'Add a reply...',
}: ReplyInputProps) => {
  const { thread } = useThread();
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const [replyText, setReplyText] = useState('');
  const { onSubmit: createReply } = useCreateComment();

  const initials = ExtractUserInitials(userInfo);

  const handleSubmit = () => {
    if (!apartmentId || !replyText.trim()) return;
    createReply(apartmentId, thread.id, {
      content: replyText,
      replyToId: commentId,
    });
    onSubmit(replyText.trim());
    setReplyText('');
  };

  return (
    <div className="flex items-start gap-2">
      <Avatar className="w-8 h-8 urbancare-rounded-full flex-shrink-0 mt-0.5">
        {userInfo.profileImageId && (
          <Image
            src={getClientFileUrl(userInfo.profileImageId)}
            alt={initials}
            fill
            className="object-cover"
          />
        )}
        <AvatarFallback className="urbancare-text-2xs font-semibold bg-primary-container text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <CommentComposerInput
          value={replyText}
          onChange={setReplyText}
          onSubmit={handleSubmit}
          placeholder={placeholder}
          autoFocus
        />

        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="urbancare-text-xs text-text-tertiary">
            Enter to send ·
          </span>
          <button
            onClick={onCancel}
            className="urbancare-text-xs font-semibold text-text-secondary transition-colors lg:hover:text-primary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
