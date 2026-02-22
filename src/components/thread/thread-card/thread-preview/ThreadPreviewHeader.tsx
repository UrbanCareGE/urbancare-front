import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { Clock, Ellipsis } from 'lucide-react';
import React from 'react';
import { cn, formatTime } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import ThreadTags from '@/components/thread/thread-card/common/ThreadTags';

interface ThreadCardHeaderProps {
  className?: string;
}

export const ThreadPreviewHeader = ({ className }: ThreadCardHeaderProps) => {
  const router = useRouter();
  const { thread } = useThread();
  const { userInfo, createdAt } = thread;

  return (
    <div
      className={cn('flex items-start gap-3 w-full', className)}
      onClick={() => {
        router.push(`thread/${thread.id}`);
      }}
    >
      <Avatar className="cursor-pointer w-10 h-10 rounded-full shrink-0 ring-2 ring-[rgb(var(--color-border))]">
        <Image
          src={getClientFileUrl(userInfo?.profileImageId)}
          alt="@shadcn"
          fill
          className="object-cover"
        />
        {userInfo && (
          <AvatarFallback className="text-xs font-semibold bg-[rgb(var(--color-primary-container))] text-[rgb(var(--color-primary))]">
            {userInfo.name[0]}
            {userInfo.surname[0]}
          </AvatarFallback>
        )}
      </Avatar>
      <div className={'flex flex-col min-w-0 flex-1'}>
        <div className="flex items-center justify-between gap-2 min-w-0">
          <h3 className="font-semibold text-[rgb(var(--color-text-primary))] text-sm truncate">
            {userInfo && userInfo.name} {userInfo && userInfo.surname}
          </h3>
          <span className="text-xs text-[rgb(var(--color-text-tertiary))] flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {formatTime(createdAt.toString())}
          </span>
        </div>
        <ThreadTags tags={thread.tags} className="mt-1.5" />
      </div>
      <Ellipsis
        className={
          'shrink-0 text-[rgb(var(--color-icon))] hover:text-[rgb(var(--color-text-secondary))] transition-colors'
        }
      />
    </div>
  );
};
