'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';
import { useCreateComment } from '@/hooks/query/thread/use-create-comment';
import { useParams } from 'next/navigation';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { Send } from 'lucide-react';
import { cn, ExtractUserInitials } from '@/lib/utils';
import Image from 'next/image';

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
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const [replyText, setReplyText] = useState('');
  const { onSubmit: createReply } = useCreateComment();

  const initials = ExtractUserInitials(userInfo);
  const hasText = replyText.trim().length > 0;

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
      <Avatar className="w-8 h-8 rounded-urbancare-full flex-shrink-0 mt-0.5">
        {userInfo.profileImageId && (
          <Image
            src={getClientFileUrl(userInfo.profileImageId)}
            alt={initials}
            fill
            className="object-cover"
          />
        )}
        <AvatarFallback className="text-urbancare-2xs font-semibold bg-primary-container text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        {/* Input pill matching comment bubble style */}
        <div className="relative bg-surface-container rounded-urbancare-3xl">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-urbancare-base text-text-primary placeholder:text-text-tertiary outline-none resize-none px-3.5 py-2.5 pr-11 leading-relaxed"
            rows={1}
            style={{ minHeight: '36px', maxHeight: '120px' }}
            onInput={(e) => {
              const t = e.target as HTMLTextAreaElement;
              t.style.height = 'auto';
              t.style.height = t.scrollHeight + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            autoFocus
          />
          <button
            onClick={handleSubmit}
            disabled={!hasText}
            className={cn(
              'absolute right-2 bottom-1.5 w-8 h-8 rounded-urbancare-full flex items-center justify-center transition-all duration-150',
              hasText
                ? 'bg-primary text-white lg:hover:bg-primary/90 lg:active:scale-95'
                : 'text-text-tertiary cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Hint */}
        <div className="flex items-center gap-1 mt-1 px-1">
          <span className="text-urbancare-xs text-text-tertiary">
            Enter to send ·
          </span>
          <button
            onClick={onCancel}
            className="text-urbancare-xs font-semibold text-text-secondary transition-colors lg:hover:text-primary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
