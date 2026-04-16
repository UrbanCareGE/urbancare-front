import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { Clock } from 'lucide-react';
import React from 'react';
import { cn, ExtractUserInitials, formatTime } from '@/lib/utils';
import Image from 'next/image';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import ThreadTags from '@/components/thread/thread-card/common/ThreadTags';
import { ThreadOptionsDropDown } from '@/components/thread/thread-card/common/ThreadOptionsDropDown';

interface ThreadCardHeaderProps {
  className?: string;
}

export const ThreadViewHeader = ({ className }: ThreadCardHeaderProps) => {
  const { thread } = useThread();
  const { userInfo, createdAt } = thread;

  return (
    <div className={cn('flex items-start gap-3 w-full', className)}>
      <Avatar className="cursor-pointer w-11 h-11 lg:w-12 lg:h-12 rounded-urbancare-full shrink-0 ring-2 ring-border">
        <Image
          src={getClientFileUrl(userInfo?.profileImageId)}
          alt={
            userInfo ? `${userInfo.name} ${userInfo.surname}` : 'User avatar'
          }
          fill
          className="object-cover"
        />
        {userInfo && (
          <AvatarFallback className="text-urbancare-sm font-semibold bg-primary-container text-primary">
            {ExtractUserInitials(userInfo)}
          </AvatarFallback>
        )}
      </Avatar>
      <div className={'flex flex-col min-w-0 flex-1'}>
        <div className="flex items-center justify-start gap-2 min-w-0">
          <h3 className="font-semibold text-text-primary text-urbancare-base truncate">
            {userInfo && userInfo.name} {userInfo && userInfo.surname}
          </h3>
          <span className="text-urbancare-xs text-text-tertiary flex items-center gap-1 shrink-0 leading-none">
            <Clock className="w-3.5 h-3.5" />
            {formatTime(createdAt.toString())}
          </span>
        </div>
        <ThreadTags tags={thread.tags} className="mt-2" />
      </div>
      <ThreadOptionsDropDown />
    </div>
  );
};
