import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import React from 'react';
import { ThreadDeleteButton } from '@/components/thread/thread-card/common/ThreadDeleteButton';

export const ThreadOptionsDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis
          className={
            'shrink-0 text-icon lg:hover:text-text-secondary transition-colors cursor-pointer lg:active:scale-90'
          }
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 bg-surface-variant border-border"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuItem asChild>
          <ThreadDeleteButton />
        </DropdownMenuItem>
        <DropdownMenuItem asChild></DropdownMenuItem>
        <DropdownMenuItem asChild></DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
