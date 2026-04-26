'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useTranslation } from '@/i18n';

interface ThreadCommentButtonProps {
  className?: string;
}

export const ThreadPreviewCommentButton = ({
  className,
}: ThreadCommentButtonProps) => {
  const router = useRouter();
  const { thread } = useThread();
  const t = useTranslation();
  const commentCount = thread.commentCount ?? thread.comments?.length ?? 0;

  return (
    <Button
      className={cn(
        'h-9 px-3 urbancare-rounded-full bg-tertiary/10 transition-all [&_svg]:size-5 text-tertiary lg:hover:bg-tertiary/20 lg:active:scale-95',
        className
      )}
      onClick={() => {
        router.push(`thread/${thread.id}?comment=true`);
      }}
    >
      <MessageCircle className="text-tertiary" />
      {commentCount > 0 && (
        <span className="tabular-nums">{commentCount}</span>
      )}
      <span className={'hidden lg:inline'}>{t.thread.comment}</span>
    </Button>
  );
};
