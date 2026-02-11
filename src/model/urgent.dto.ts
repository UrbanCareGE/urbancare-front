export interface UrgentItemDTO {
  id: string;
  content: string;
  resolved: boolean;
  expiresAt: Date;
  createdAt: Date;
  userInfo: UserSnapshotDTO;
}

export interface UserSnapshotDTO {
  name: string;
  surname: string;
}
