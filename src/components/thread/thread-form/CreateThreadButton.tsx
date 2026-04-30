'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/provider/AuthProvider';
import { getClientFileUrl } from '@/lib/api-client';
import { cn, ExtractUserInitials } from '@/lib/utils';
import Image from 'next/image';
import { ArrowDownNarrowWide, SlidersHorizontal } from 'lucide-react';
import { useThreadOverlay } from '@/components/thread/thread-form/CreateThreadOverlay';
import { useTranslation } from '@/i18n';

export type StartThreadFormProps = {
  className?: string;
};

export function CreateThreadButton({ className }: StartThreadFormProps) {
  const { user } = useAuth();
  const threadDrawer = useThreadOverlay();
  const t = useTranslation();
  const initials = ExtractUserInitials(user)

  return (
    <div className={cn('flex flex-1 gap-2 px-1 items-center', className)}>
      <Avatar className="cursor-pointer w-10 h-10 urbancare-rounded-full ring-2 ring-border bg-primary">
        <Image
          src={getClientFileUrl(user?.profileImageId)}
          alt={user?.name?.[0] + ' ' + user?.surname?.[0]}
          fill
          className="object-cover"
        />
        <AvatarFallback className="urbancare-text-5xl sm:urbancare-text-7xl">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div
          className="flex items-center urbancare-rounded-full px-4 py-2 h-10 bg-surface-container transition-colors duration-200 mr-auto urbancare-text-base text-muted-foreground lg:hover:bg-surface-hover lg:cursor-pointer"
          onClick={threadDrawer.openDrawer}
        >
          {t.thread.whatToShare}
        </div>
      </div>
    </div>
  );
}
