import { api } from '@/lib/api-client';
import { PagingRespDTO } from '@/model/dto/common.dto';
import { NotificationDTO, UnreadCountDTO } from '@/model/dto/notification.dto';

export const NotificationService = {
  list: async (page: number, size: number): Promise<PagingRespDTO<NotificationDTO>> => {
    const { data } = await api.get<PagingRespDTO<NotificationDTO>>(
      '/api/notifications',
      { params: { page, size } }
    );
    return data;
  },

  unreadCount: async (): Promise<UnreadCountDTO> => {
    const { data } = await api.get<UnreadCountDTO>('/api/notifications/unread-count');
    return data;
  },

  markRead: async (notificationId: string): Promise<void> => {
    await api.post(`/api/notifications/${notificationId}/read`);
  },

  markAllRead: async (): Promise<void> => {
    await api.post('/api/notifications/read-all');
  },
};
