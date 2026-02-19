'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/provider/AuthProvider';
import { getClientFileUrl } from '@/lib/api-client';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export type StartThreadFormProps = {
  className?: string;
};

export function CreateThreadButton({ className }: StartThreadFormProps) {
  const { user } = useAuth();

  return (
    <Card
      className={cn(
        'flex gap-2 items-center overflow-hidden shadow-xl border-border border bg-surface p-2 cursor-pointer',
        className
      )}
    >
      <Avatar className="cursor-pointer w-12 h-12 rounded-full">
        <Image
          src={getClientFileUrl(user?.profileImageId)}
          alt="@shadcn"
          fill
          className="object-cover"
        />
        <AvatarFallback>{user?.name + ' ' + user?.surname[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center rounded-full px-4 h-10 py-3 text-slate-400 transition-colors mr-auto">
          What&apos;s on your mind?
        </div>
      </div>
    </Card>
  );
}
