import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { Clock } from 'lucide-react';
import React from 'react';
import { useThread } from '@/components/thread/mobile/thread-card/ThreadCard';
import { cn, formatTime } from '@/lib/utils';
import { usePreviewable } from '@/components/thread/mobile/Previewable';
import { ThreadTags } from '@/components/thread/mobile/thread-card/common/ThreadTags';
import Image from 'next/image';

interface ThreadCardHeaderProps {
  className?: string;
}

export const ThreadPreviewHeader = ({ className }: ThreadCardHeaderProps) => {
  const { thread } = useThread();
  const { userInfo, createdAt } = thread;
  const { openView } = usePreviewable();

  return (
    <div className={cn('flex items-start gap-3', className)} onClick={openView}>
      <Avatar className="cursor-pointer w-12 h-12 rounded-full">
        <Image
          src={getClientFileUrl(userInfo?.profileImageId)}
          alt="@shadcn"
          fill
          className="object-cover"
        />
        {userInfo && (
          <AvatarFallback>
            {userInfo.name[0] + ' ' + userInfo.surname[0]}
          </AvatarFallback>
        )}
      </Avatar>
      <div className={'flex flex-col flex-1 '}>
        <div className="flex flex-1 justify-start gap-2 min-w-0">
          <h3 className="font-semibold text-sky-950 text-base truncate">
            {userInfo && userInfo.name} {userInfo && userInfo.surname}
          </h3>
          <span className="text-xs text-sky-900 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTime(createdAt.toString())}
          </span>
        </div>
        <ThreadTags tags={thread.tags} className="mt-1" />
      </div>
    </div>
  );
};
