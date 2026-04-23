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
      <Avatar
        className={cn(
          'cursor-pointer w-11 h-11 lg:w-12 lg:h-12 rounded-urbancare-full shrink-0',
          'ring-2 ring-border lg:hover:ring-border-hover',
          'transition-all duration-200 lg:hover:scale-105'
        )}
      >
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

      <div className="flex flex-col min-w-0 flex-1 gap-1">
        <h3 className="font-bold text-text-primary text-urbancare-lg leading-tight-georgian truncate">
          {userInfo && userInfo.name} {userInfo && userInfo.surname}
        </h3>

        <span className="text-urbancare-xs text-text-tertiary flex items-center gap-1 leading-none">
          <Clock className="w-3 h-3 shrink-0" />
          {formatTime(createdAt.toString())}
        </span>

        <ThreadTags tags={thread.tags} className="mt-1" />
      </div>

      <ThreadOptionsDropDown />
    </div>
  );
};
