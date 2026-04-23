import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ThreadDeleteButton } from '@/components/thread/thread-card/common/ThreadDeleteButton';
import { ThreadSaveButton } from '@/components/thread/thread-card/common/ThreadSaveButton';
import { ThreadCopyLinkButton } from '@/components/thread/thread-card/common/ThreadCopyLinkButton';
import { ThreadEditButton } from '@/components/thread/thread-card/common/ThreadEditButton';
import { ThreadReportButton } from '@/components/thread/thread-card/common/ThreadReportButton';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useAuth } from '@/components/provider/AuthProvider';
import {
  EditThreadOverlay,
} from '@/components/thread/thread-edit/EditThreadOverlay';
import { EditThreadForm } from '@/components/thread/thread-edit/EditThreadForm';

export const ThreadOptionsDropDown = () => {
  const { thread } = useThread();
  const { user } = useAuth();

  const canModify = useMemo(
    () => thread.userInfo?.id === user?.id,
    [user, thread]
  );

  return (
    <EditThreadOverlay>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'w-8 h-8 rounded-urbancare-full flex items-center justify-center shrink-0',
              'text-icon transition-all duration-150',
              'lg:hover:bg-surface-container lg:hover:text-text-secondary',
              'active:scale-90'
            )}
          >
            <Ellipsis className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-72 bg-surface-variant border-border p-1.5"
          align="end"
          sideOffset={8}
        >
          <DropdownMenuItem asChild>
            <ThreadSaveButton />
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <ThreadCopyLinkButton />
          </DropdownMenuItem>

          {canModify && (
            <DropdownMenuItem asChild>
              <ThreadEditButton />
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem asChild>
            <ThreadReportButton />
          </DropdownMenuItem>

          {canModify && (
            <>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuItem asChild>
                <ThreadDeleteButton />
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {canModify && (
        <EditThreadOverlay.Content>
          <EditThreadForm />
        </EditThreadOverlay.Content>
      )}
    </EditThreadOverlay>
  );
};
