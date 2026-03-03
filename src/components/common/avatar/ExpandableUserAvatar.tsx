import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

export function ExpandableUserAvatar() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      <Popover>
        <PopoverTrigger asChild={true}>
          <Avatar className={'relative cursor-pointer'}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          className={
            'w-64 bg-surface border border-border drop-shadow-sm text-text-primary'
          }
        ></PopoverContent>
      </Popover>
    </div>
  );
}
