'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Check, AtSign } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { UserAvatarView } from '@/components/common/avatar/UserAvatar';
import { useAuth } from '@/components/provider/AuthProvider';
import {
  useNotifications,
  useUnreadNotificationCount,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from '@/hooks/query/notification/use-notifications';
import { NotificationDTO } from '@/model/dto/notification.dto';
import { cn, formatTime } from '@/lib/utils';
import { useTranslation } from '@/i18n';

const buildHref = (apartmentId: string, n: NotificationDTO) => {
  const base = `/apartment/${apartmentId}/thread/${n.threadId}`;
  return n.commentId ? `${base}?comment=${n.commentId}` : base;
};

export const NotificationDropdown = () => {
  const t = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { user, selectApartment } = useAuth();

  const { data: countData } = useUnreadNotificationCount();
  const { data: listData } = useNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const items = listData?.pages.flatMap((p) => p.content) ?? [];
  const unreadCount = countData?.count ?? 0;

  const handleSelect = (n: NotificationDTO) => {
    if (!n.read) markRead.mutate(n.id);
    setOpen(false);

    const href = buildHref(n.apartmentId, n);
    if (user?.selectedApartmentId !== n.apartmentId) {
      selectApartment(n.apartmentId, href);
    } else {
      router.push(href);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={t.notification.title}
          className={cn(
            'relative w-10 h-10 urbancare-rounded-xl flex items-center justify-center flex-shrink-0',
            'bg-surface border border-border',
            'lg:hover:bg-surface-hover lg:hover:border-border-hover',
            'text-icon lg:hover:text-text-primary',
            'transition-all duration-200 shadow-sm active:scale-95'
          )}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 urbancare-rounded-full bg-primary text-primary-foreground urbancare-text-2xs font-semibold flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-96 p-0 bg-surface-variant border-border urbancare-rounded-2xl"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="urbancare-text-base font-semibold text-text-primary">
            {t.notification.title}
          </span>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => markAllRead.mutate()}
              className="urbancare-text-sm text-primary lg:hover:underline cursor-pointer"
            >
              {t.notification.markAllRead}
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-4 py-10 text-center urbancare-text-sm text-text-tertiary">
              {t.notification.empty}
            </div>
          ) : (
            items.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => handleSelect(n)}
                className={cn(
                  'w-full flex items-start gap-3 px-4 py-3 transition-colors text-left cursor-pointer',
                  'lg:hover:bg-surface-hover',
                  !n.read && 'bg-primary/5'
                )}
              >
                <div className="relative shrink-0">
                  <UserAvatarView
                    firstName={n.actorInfo?.name}
                    surname={n.actorInfo?.surname}
                    profileImageId={n.actorInfo?.profileImageId}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 urbancare-rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <AtSign className="w-2.5 h-2.5" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="urbancare-text-sm text-text-primary line-clamp-2">
                    <span className="font-semibold">
                      {[n.actorInfo?.name, n.actorInfo?.surname]
                        .filter(Boolean)
                        .join(' ') || t.notification.someone}
                    </span>{' '}
                    {n.type === 'MENTION_COMMENT'
                      ? t.notification.mentionedYouComment
                      : t.notification.mentionedYouThread}
                  </p>
                  <p className="urbancare-text-xs text-text-tertiary mt-0.5">
                    {formatTime(n.createdAt)}
                  </p>
                </div>
                {!n.read && (
                  <span className="mt-2 w-2 h-2 urbancare-rounded-full bg-primary shrink-0" />
                )}
                {n.read && (
                  <Check className="mt-1 w-3.5 h-3.5 text-text-tertiary shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
