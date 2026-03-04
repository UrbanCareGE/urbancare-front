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
  const initials = `${userInfo.name[0]}${userInfo.surname[0]}`.toUpperCase();

  return (
    <div className="flex gap-2 py-1">
      {/* Small avatar */}
      <div className="flex-shrink-0">
        <Avatar className="w-8 h-8 rounded-full">
          {userInfo.profileImageId && (
            <Image
              src={getClientFileUrl(userInfo.profileImageId)}
              alt={initials}
              fill
              className="object-cover"
            />
          )}
          <AvatarFallback className="text-[10px] font-semibold bg-primary-container text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-surface-container rounded-2xl rounded-tl-sm px-3 py-2 inline-block max-w-full">
          <p className="font-semibold text-[12px] leading-tight text-text-primary">
            {userInfo.name} {userInfo.surname}
          </p>
          <p className="text-[13px] text-text-primary leading-relaxed whitespace-pre-wrap break-words mt-0.5">
            {content}
          </p>
        </div>
        <p className="text-[11px] text-text-tertiary mt-0.5 px-1">
          {formatTime(createdAt.toString())}
        </p>
      </div>
    </div>
  );
};
