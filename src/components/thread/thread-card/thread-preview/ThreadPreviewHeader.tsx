import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { Clock, Ellipsis } from 'lucide-react';
import React from 'react';
import { cn, formatTime } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import ThreadTags from '@/components/thread/thread-card/common/ThreadTags';
import { ThreadOptionsDropDown } from '@/components/thread/thread-card/common/ThreadOptionsDropDown';

interface ThreadCardHeaderProps {
  className?: string;
}

export const ThreadPreviewHeader = ({ className }: ThreadCardHeaderProps) => {
  const router = useRouter();
  const { thread } = useThread();
  const { userInfo, createdAt } = thread;

  return (
    <div className={cn('flex items-start gap-3 w-full', className)}>
      <Avatar className="cursor-pointer w-11 h-11 lg:w-12 lg:h-12  rounded-full shrink-0 ring-2 ring-border">
        <Image
          src={getClientFileUrl(userInfo?.profileImageId)}
          alt="@shadcn"
          fill
          className="object-cover"
        />
        {userInfo && (
          <AvatarFallback className="text-xs font-semibold bg-primary-container text-primary">
            {userInfo.name[0]}
            {userInfo.surname[0]}
          </AvatarFallback>
        )}
      </Avatar>
      <div
        className={'flex flex-col min-w-0 flex-1'}
        onClick={() => {
          router.push(`thread/${thread.id}`);
        }}
      >
        <div className="flex items-center justify-begin gap-2 min-w-0">
          <h3 className="font-semibold text-text-primary text-sm truncate">
            {userInfo && userInfo.name} {userInfo && userInfo.surname}
          </h3>
          <span className="text-xs text-text-tertiary flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" />
            {formatTime(createdAt.toString())}
          </span>
        </div>
        <ThreadTags tags={thread.tags} className="mt-1.5" />
      </div>
      <ThreadOptionsDropDown />
    </div>
  );
};
