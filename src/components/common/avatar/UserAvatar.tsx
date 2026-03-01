import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import React from 'react';
import Image from 'next/image';

type UserAvatarProps = {
  profileImageId?: string;
  firstName: string;
  surname: string;
};

export const UserAvatar = ({
  firstName,
  surname,
  profileImageId,
}: UserAvatarProps) => {
  const initials = `${firstName[0]}${surname[0]}`.toUpperCase();

  return (
    <div className="relative inline-block outline-none">
      <Avatar className="cursor-pointer w-10 h-10 rounded-full">
        {profileImageId && (
          <Image
            src={getClientFileUrl(profileImageId)}
            alt={initials}
            fill
            className="object-cover"
          />
        )}
        <AvatarFallback className="text-xs font-semibold bg-primary-container text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
