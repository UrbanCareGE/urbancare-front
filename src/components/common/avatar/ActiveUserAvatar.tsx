'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import { useAuth } from '@/components/provider/AuthProvider';
import { getClientFileUrl } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

function ActiveUserAvatarSkeleton() {
  return (
    <div className="relative inline-block">
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
}

export const ActiveUserAvatar = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <ActiveUserAvatarSkeleton />;
  }

  return (
    <div className="relative inline-block outline-none">
      <Avatar className="cursor-pointer w-11 h-11 rounded-full">
        <Image
          src={getClientFileUrl(user?.profileImageId)}
          alt="@shadcn"
          fill
          className="object-cover"
        />
        <AvatarFallback>{'TODO'}</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white bg-success" />
    </div>
  );
};
