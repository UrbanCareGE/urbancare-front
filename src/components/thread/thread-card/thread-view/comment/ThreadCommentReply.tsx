import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { ThreadCommentDTO } from '@/model/dto/thread.dto';
import { formatTime } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

type ThreadCommentReplyProps = {
  comment: ThreadCommentDTO;
};

export const ThreadCommentReply = ({ comment }: ThreadCommentReplyProps) => {
  const { userInfo, createdAt, content } = comment;
  let initials = '';
  if (userInfo.name && userInfo.surname)
    initials = `${userInfo.name[0]}${userInfo.surname[0]}`.toUpperCase();

  return (
    <div className="flex gap-2.5 py-1.5">
      {/* Small avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8 rounded-urbancare-full">
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
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-surface-container rounded-urbancare-3xl rounded-tl-urbancare-xs px-3 py-2 inline-block max-w-full space-y-0.5">
          <p className="font-semibold text-urbancare-sm leading-tight text-text-primary">
            {userInfo.name} {userInfo.surname}
          </p>
          <p className="text-urbancare-base text-text-primary leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
        <p className="text-urbancare-xs text-text-tertiary mt-1 px-1.5">
          {formatTime(createdAt.toString())}
        </p>
      </div>
    </div>
  );
};
