import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getClientFileUrl } from '@/lib/api-client';
import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/components/provider/AuthProvider';

type UserAvatarProps = {
  profileImageId?: string;
  firstName?: string;
  surname?: string;
  phone?: string;
};

export const UserAvatarView = ({
  firstName,
  surname,
  phone,
  profileImageId,
}: UserAvatarProps) => {
  let userInitials: string = '';
  if (firstName && surname)
    userInitials = `${firstName[0]}${surname[0]}`.toUpperCase();

  return (
    <div className="relative inline-block outline-none">
      <Avatar className="cursor-pointer w-10 h-10 rounded-urbancare-full">
        {profileImageId && (
          <Image
            src={getClientFileUrl(profileImageId)}
            alt={userInitials}
            fill
            className="object-cover"
          />
        )}
        <AvatarFallback className="text-urbancare-sm font-semibold bg-primary-container text-primary">
          {userInitials}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export const CurrentUserAvatar = () => {
  const { user } = useAuth();

  return (
    <UserAvatarView
      firstName={user.name}
      surname={user.surname}
      phone={user.phone.number}
      profileImageId={user.profileImageId}
    />
  );
};
