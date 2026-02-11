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

  // TODO akac igive
  if (!profileImageId) {
    return <div></div>;
  }

  return (
    <div className="relative inline-block outline-none">
      <Avatar className="cursor-pointer w-10 h-10 rounded-full bg-primary">
        <Image
          src={getClientFileUrl(profileImageId)}
          alt="@shadcn"
          fill
          className="object-cover"
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
};
