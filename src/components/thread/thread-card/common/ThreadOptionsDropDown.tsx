'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bookmark, Ellipsis, Flag, Link2, Pencil, Trash2 } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { useThread } from '@/components/thread/thread-card/ThreadCard';
import { useAuth } from '@/components/provider/AuthProvider';
import { useDeleteThread } from '@/hooks/query/thread/use-delete-thread';
import { useToggleSaveThread } from '@/hooks/query/thread/use-toggle-save-thread';
import { useThreadOverlay } from '@/components/thread/thread-form/CreateThreadOverlay';
import { CreateThreadFormContainer } from '@/components/thread/thread-form/CreateThreadForm';
import { useTranslation } from '@/i18n';

interface ItemRowProps {
  icon: React.ReactNode;
  label: string;
  iconBgClass?: string;
  labelClass?: string;
  hoverClass?: string;
}

const ItemRow = ({
  icon,
  label,
  iconBgClass = 'bg-surface-container',
  labelClass = 'text-text-primary',
  hoverClass,
}: ItemRowProps) => (
  <div
    className={cn(
      'flex w-full items-center gap-2.5 px-2 py-1 urbancare-text-base urbancare-rounded-lg transition-colors duration-150',
      hoverClass ?? 'lg:hover:bg-surface-container'
    )}
  >
    <div
      className={cn(
        'w-7 h-7 urbancare-rounded-lg flex items-center justify-center shrink-0',
        iconBgClass
      )}
    >
      {icon}
    </div>
    <span className={cn('font-medium', labelClass)}>{label}</span>
  </div>
);

const InnerDropdown = ({ onEdit }: { onEdit?: () => void }) => {
  const router = useRouter();
  const t = useTranslation();
  const { thread } = useThread();
  const { user } = useAuth();
  const apartmentId = user?.selectedApartmentId;
  const deleteThread = useDeleteThread();
  const toggleSave = useToggleSaveThread();
  const [open, setOpen] = useState(false);

  const saved = thread.selfSaved ?? false;

  const canModify = useMemo(
    () => thread.userInfo?.id === user?.id,
    [user, thread]
  );

  const handleToggleSave = () => {
    if (!apartmentId || toggleSave.isPending) return;
    toggleSave.mutate(
      { apartmentId, threadId: thread.id, next: !saved },
      { onError: () => toast.error(t.common.error) }
    );
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success(t.thread.linkCopied);
  };

  const handleReport = () => {
    toast.info(t.thread.reportSubmitted);
  };

  const handleDelete = () => {
    if (!apartmentId) return;
    deleteThread.mutate({ apartmentId, threadId: thread.id });
    router.push(`/apartment/${apartmentId}/post`);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Options"
          className={cn(
            'w-8 h-8 urbancare-rounded-full flex items-center justify-center shrink-0',
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
        <DropdownMenuItem
          className="p-0 cursor-pointer focus:bg-transparent"
          onSelect={handleToggleSave}
        >
          <ItemRow
            icon={
              <Bookmark
                className={cn(
                  'w-4 h-4 transition-colors duration-150',
                  saved ? 'fill-primary text-primary' : 'text-icon'
                )}
              />
            }
            label={saved ? t.thread.saved : t.thread.save}
            iconBgClass={saved ? 'bg-primary/10' : 'bg-surface-container'}
            labelClass={saved ? 'text-primary' : 'text-text-primary'}
            hoverClass={
              saved ? 'lg:hover:bg-primary/5' : 'lg:hover:bg-surface-container'
            }
          />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="p-0 cursor-pointer focus:bg-transparent"
          onSelect={handleCopyLink}
        >
          <ItemRow
            icon={<Link2 className="w-4 h-4 text-icon" />}
            label={t.thread.copyLink}
          />
        </DropdownMenuItem>

        {canModify && onEdit && (
          <DropdownMenuItem
            className="p-0 cursor-pointer focus:bg-transparent"
            onSelect={onEdit}
          >
            <ItemRow
              icon={<Pencil className="w-4 h-4 text-primary" />}
              label={t.common.edit}
              iconBgClass="bg-primary/10"
              hoverClass="lg:hover:bg-primary/5"
            />
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          className="p-0 cursor-pointer focus:bg-transparent"
          onSelect={handleReport}
        >
          <ItemRow
            icon={<Flag className="w-4 h-4 text-warning" />}
            label={t.thread.reportProblem}
            iconBgClass="bg-warning/10"
            labelClass="text-warning"
            hoverClass="lg:hover:bg-warning/5"
          />
        </DropdownMenuItem>

        {canModify && (
          <>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="p-0 cursor-pointer focus:bg-transparent"
              disabled={deleteThread.isPending}
              onSelect={handleDelete}
            >
              <ItemRow
                icon={
                  deleteThread.isPending ? (
                    <Spinner className="w-4 h-4 text-error" />
                  ) : (
                    <Trash2 className="w-4 h-4 text-error" />
                  )
                }
                label={t.common.delete}
                iconBgClass="bg-error-container"
                labelClass="text-error"
                hoverClass="lg:hover:bg-error/5"
              />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const EditableDropdown = () => {
  const { openDrawer } = useThreadOverlay();
  return <InnerDropdown onEdit={openDrawer} />;
};

export const ThreadOptionsDropDown = () => {
  const { thread } = useThread();
  const { user } = useAuth();
  const canModify = thread.userInfo?.id === user?.id;

  if (!canModify) {
    return <InnerDropdown />;
  }

  return (
    <CreateThreadFormContainer editingThread={thread}>
      <EditableDropdown />
    </CreateThreadFormContainer>
  );
};
