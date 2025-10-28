export interface UrgentItemDTO {
    id: string;
    content: string;
    resolved: boolean;
    expiresAt: Date;
    createdAt: Date;
    creatorId: string;
    createdBy: UserSnapshotDTO;
}

export interface UserSnapshotDTO {
    name: string;
    surname: string;
}