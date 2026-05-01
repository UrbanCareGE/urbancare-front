'use client';

import React from 'react';
import { Ellipsis, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/components/provider/AuthProvider';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useDeleteComment } from '@/hooks/query/thread/use-delete-comment';
import { ThreadCommentDTO } from '@/model/dto/thread.dto';
import { useTranslation } from '@/i18n';

interface CommentOptionsDropdownProps {
  comment: ThreadCommentDTO;
}

export const CommentOptionsDropdown = ({
  comment,
}: CommentOptionsDropdownProps) => {
  const { user } = useAuth();
  const { thread } = useThread();
  const t = useTranslation();
  const apartmentId = user?.selectedApartmentId;
  const { mutate, isPending } = useDeleteComment();

  const canDelete = comment.userInfo?.id === user?.id;
  if (!canDelete || !apartmentId) return null;

  const handleDelete = () => {
    mutate({ apartmentId, threadId: thread.id, commentId: comment.id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Options"
          className={cn(
            'w-7 h-7 urbancare-rounded-full flex items-center justify-center shrink-0',
            'text-icon transition-all duration-150',
            'lg:hover:bg-surface-container lg:hover:text-text-secondary',
            'active:scale-90'
          )}
        >
          <Ellipsis className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-surface-variant border-border p-1.5"
        align="end"
        sideOffset={6}
      >
        <DropdownMenuItem
          onSelect={handleDelete}
          disabled={isPending}
          className="flex items-center gap-2.5 px-2 py-1 urbancare-text-base urbancare-rounded-lg lg:hover:bg-error/5 transition-colors duration-150 disabled:opacity-50 cursor-pointer"
        >
          <div className="w-7 h-7 urbancare-rounded-lg bg-error-container flex items-center justify-center shrink-0">
            {isPending ? (
              <Spinner className="w-4 h-4 text-error" />
            ) : (
              <Trash2 className="w-4 h-4 text-error" />
            )}
          </div>
          <span className="font-medium text-error">{t.common.delete}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
