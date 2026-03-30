'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/provider/AuthProvider';
import { getClientFileUrl } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowDownNarrowWide, SlidersHorizontal } from 'lucide-react';
import { useThreadDrawer } from '@/components/thread/thread-form/CreateThreadSheet';
import { useTranslation } from '@/i18n';

export type StartThreadFormProps = {
  className?: string;
};

export function CreateThreadButton({ className }: StartThreadFormProps) {
  const { user } = useAuth();
  const threadDrawer = useThreadDrawer();
  const t = useTranslation();
  const initials = `${user.name?.[0]}${user.surname?.[0]}`.toUpperCase();

  return (
    <div className={cn('flex gap-2 px-1 items-center', className)}>
      <Avatar className="cursor-pointer w-10 h-10 rounded-urbancare-full ring-2 ring-border bg-primary">
        <Image
          src={getClientFileUrl(user?.profileImageId)}
          alt={user?.name?.[0] + ' ' + user?.surname?.[0]}
          fill
          className="object-cover"
        />
        <AvatarFallback className="text-urbancare-5xl sm:text-urbancare-7xl">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div
          className="flex items-center rounded-urbancare-full px-4 py-2 h-10 text-sm lg:text-base bg-surface-container transition-colors mr-auto text-urbancare-base text-muted-foreground lg:hover:bg-surface-hover lg:cursor-pointer"
          onClick={threadDrawer.openDrawer}
        >
          {t.thread.whatToShare}
        </div>
      </div>
      <SlidersHorizontal className={'text-icon'}></SlidersHorizontal>
      <ArrowDownNarrowWide className={'text-icon'}></ArrowDownNarrowWide>
    </div>
  );
}
