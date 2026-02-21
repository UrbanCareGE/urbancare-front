export interface UrgentItemDTO {
  id: string;
  content: string;
  resolved: boolean;
  expiresAt: Date;
  createdAt: Date;
  userInfo: UserSnapshotDTO;
}

export interface CreateUrgentItemDTO {
  apartmentId: string;
  content: string;
}

export interface ResolveUrgentItemDTO {
  id: string;
  apartmentId: string;
}

export interface UserSnapshotDTO {
  id: string;
  name: string;
  surname: string;
  profileImageId?: string;
}
