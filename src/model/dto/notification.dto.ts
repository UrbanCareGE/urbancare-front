import { UserSnapshotDTO } from '@/model/dto/auth.dto';

export type NotificationType = 'MENTION_THREAD' | 'MENTION_COMMENT';

export interface NotificationDTO {
  id: string;
  type: NotificationType;
  apartmentId: string;
  threadId: string;
  commentId?: string;
  read: boolean;
  createdAt: string;
  actorInfo?: UserSnapshotDTO;
}

export interface UnreadCountDTO {
  count: number;
}
