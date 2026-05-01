'use client';

import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { NotificationService } from '@/service/notification-service';
import { NotificationDTO } from '@/model/dto/notification.dto';

const PAGE_SIZE = 20;
const POLL_INTERVAL_MS = 30_000;

export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const,
  unreadCount: () => [...notificationKeys.all, 'unread-count'] as const,
};

export const useNotifications = () =>
  useInfiniteQuery({
    queryKey: notificationKeys.list(),
    initialPageParam: 0,
    queryFn: ({ pageParam }) => NotificationService.list(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage) =>
      lastPage.page.number === lastPage.page.totalPages - 1 ||
      lastPage.page.totalPages === 0
        ? null
        : lastPage.page.number + 1,
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: 10_000,
  });

export const useUnreadNotificationCount = () =>
  useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: () => NotificationService.unreadCount(),
    refetchInterval: POLL_INTERVAL_MS,
    staleTime: 10_000,
  });

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) => NotificationService.markRead(notificationId),
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.all });

      queryClient.setQueriesData<{
        pages: { content: NotificationDTO[] }[];
        pageParams: number[];
      }>({ queryKey: notificationKeys.list() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.map((n) =>
              n.id === notificationId ? { ...n, read: true } : n
            ),
          })),
        };
      });

      queryClient.setQueryData<{ count: number }>(
        notificationKeys.unreadCount(),
        (old) => (old ? { count: Math.max(0, old.count - 1) } : old)
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => NotificationService.markAllRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.all });

      queryClient.setQueriesData<{
        pages: { content: NotificationDTO[] }[];
        pageParams: number[];
      }>({ queryKey: notificationKeys.list() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            content: page.content.map((n) => ({ ...n, read: true })),
          })),
        };
      });

      queryClient.setQueryData(notificationKeys.unreadCount(), { count: 0 });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
};
