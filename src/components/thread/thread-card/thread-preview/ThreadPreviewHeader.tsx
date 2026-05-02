import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { Clock } from 'lucide-react';
import React from 'react';
import { cn, formatTime } from '@/lib/utils';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import ThreadTags from '@/components/thread/thread-card/common/ThreadTags';
import { ThreadOptionsDropDown } from '@/components/thread/thread-card/common/ThreadOptionsDropDown';

interface ThreadCardHeaderProps {
  className?: string;
}

export const ThreadPreviewHeader = ({ className }: ThreadCardHeaderProps) => {
  const router = useRouter();
  const params = useParams<{ apartmentId: string }>();
  const { thread, expanded } = useThread();
  const { userInfo, createdAt } = thread;

  const goToUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userInfo?.id || !params?.apartmentId) return;
    router.push(`/apartment/${params.apartmentId}/user/${userInfo.id}`);
  };

  return (
    <div className={cn('flex items-start gap-3 w-full', className)}>
      <Avatar
        onClick={goToUser}
        className={cn(
          'w-11 h-11 lg:w-12 lg:h-12 urbancare-rounded-full shrink-0 ring-2 ring-border cursor-pointer',
          'lg:hover:ring-primary/40 transition-all'
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
          <AvatarFallback className="urbancare-text-sm font-semibold bg-primary-container text-primary">
            {userInfo.name ? userInfo.name[0] : ''}
            {userInfo.surname ? userInfo.surname[0] : ''}
          </AvatarFallback>
        )}
      </Avatar>
      <div
        className={cn(
          'flex flex-col min-w-0 flex-1',
          !expanded && 'cursor-pointer'
        )}
        onClick={() => {
          if (expanded) return;
          router.push(`thread/${thread.id}`);
        }}
      >
        <div className="flex items-center justify-start gap-2 min-w-0">
          <h3
            onClick={goToUser}
            className="font-semibold text-text-primary urbancare-text-base truncate cursor-pointer lg:hover:underline"
          >
            {userInfo && userInfo.name} {userInfo && userInfo.surname}
          </h3>
          <span className="urbancare-text-xs text-text-tertiary flex items-center gap-1 shrink-0 leading-none">
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
