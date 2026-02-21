'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/provider/AuthProvider';
import { getClientFileUrl } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowDownNarrowWide, SlidersHorizontal } from 'lucide-react';
import { useThreadDrawer } from '@/components/thread/thread-form/ThreadForm';

export type StartThreadFormProps = {
  className?: string;
};

export function CreateThreadButton({ className }: StartThreadFormProps) {
  const { user } = useAuth();
  const threadDrawer = useThreadDrawer();

  return (
    <div className={cn('flex gap-2 px-1 items-center', className)}>
      <Avatar className="cursor-pointer w-10 h-10 rounded-full">
        <Image
          src={getClientFileUrl(user?.profileImageId)}
          alt="@shadcn"
          fill
          className="object-cover"
        />
        <AvatarFallback>{user?.name + ' ' + user?.surname[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div
          className="flex items-center rounded-full px-4 py-2 h-10 bg-surface-container transition-colors mr-auto text-sm text-muted-foreground"
          onClick={threadDrawer.openDrawer}
        >
          რისი გაზიარება გსურთ?
        </div>
      </div>
      <SlidersHorizontal className={'text-icon'}></SlidersHorizontal>
      <ArrowDownNarrowWide className={'text-icon'}></ArrowDownNarrowWide>
    </div>
  );
}
