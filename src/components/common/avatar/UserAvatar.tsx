import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import React from 'react';
import Image from 'next/image';

type UserAvatarProps = {
  profileImageId?: string;
  firstName: string;
  surname: string;
  phone: string;
};

export const UserAvatar = ({
  firstName,
  surname,
  phone,
  profileImageId,
}: UserAvatarProps) => {
  let initials: string = phone;
  if (firstName && surname && profileImageId)
    initials = `${firstName[0]}${surname[0]}`.toUpperCase();

  return (
    <div className="relative inline-block outline-none">
      <Avatar className="cursor-pointer w-10 h-10 rounded-urbancare-full">
        {profileImageId && (
          <Image
            src={getClientFileUrl(profileImageId)}
            alt={initials}
            fill
            className="object-cover"
          />
        )}
        <AvatarFallback className="text-urbancare-sm font-semibold bg-primary-container text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
