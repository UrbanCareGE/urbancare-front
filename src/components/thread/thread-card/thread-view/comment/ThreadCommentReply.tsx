import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import { ThreadCommentDTO } from '@/model/dto/thread.dto';
import { formatTime } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { CommentVoteButton } from '@/components/thread/thread-card/thread-view/comment/CommentVoteButton';
import { CommentOptionsDropdown } from '@/components/thread/thread-card/thread-view/comment/CommentOptionsDropdown';
import { MentionedText } from '@/components/common/mention/MentionedText';

type ThreadCommentReplyProps = {
  comment: ThreadCommentDTO;
};

export const ThreadCommentReply = ({ comment }: ThreadCommentReplyProps) => {
  const { userInfo, createdAt, content } = comment;
  const router = useRouter();
  const params = useParams<{ apartmentId: string }>();
  let initials = '';
  if (userInfo.name && userInfo.surname)
    initials = `${userInfo.name[0]}${userInfo.surname[0]}`.toUpperCase();

  const goToUser = () => {
    if (!userInfo?.id || !params?.apartmentId) return;
    router.push(`/apartment/${params.apartmentId}/user/${userInfo.id}`);
  };
  const goToMention = (mentionUserId: string) => {
    if (!params?.apartmentId) return;
    router.push(`/apartment/${params.apartmentId}/user/${mentionUserId}`);
  };

  return (
    <div className="flex gap-2.5 py-1.5">
      {/* Small avatar */}
      <div
        className="flex-shrink-0 cursor-pointer"
        onClick={goToUser}
      >
        <Avatar className="w-8 h-8 urbancare-rounded-full">
          {userInfo.profileImageId && (
            <Image
              src={getClientFileUrl(userInfo.profileImageId)}
              alt={initials}
              fill
              className="object-cover"
            />
          )}
          <AvatarFallback className="urbancare-text-2xs font-semibold bg-primary-container text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <div className="bg-surface-container urbancare-rounded-3xl urbancare-rounded-tl-xs px-3 py-2 inline-block max-w-full space-y-0.5">
            <p
              onClick={goToUser}
              className="font-semibold urbancare-text-sm leading-tight text-text-primary cursor-pointer lg:hover:underline"
            >
              {userInfo.name} {userInfo.surname}
            </p>
            <p className="urbancare-text-base text-text-primary leading-relaxed whitespace-pre-wrap break-words">
              <MentionedText
                content={content}
                mentions={comment.mentions}
                onMentionClick={(m) => goToMention(m.userId)}
              />
            </p>
          </div>
          <CommentOptionsDropdown comment={comment} />
        </div>
        <div className="flex items-center gap-3 mt-1 px-1.5">
          <span className="urbancare-text-xs text-text-tertiary">
            {formatTime(createdAt.toString())}
          </span>
          <CommentVoteButton comment={comment} />
        </div>
      </div>
    </div>
  );
};
