import { UserSnapshotDTO } from '@/model/dto/auth.dto';
import { OptimisticData, PagingRespDTO } from '@/model/dto/common.dto';
import { UserModel } from '@/model/model/user.model';

export interface UrgentModel {
  id: string;
  content: string;
  resolved: boolean;
  expiresAt: Date;
  createdAt: Date;
  userInfo: UserSnapshotDTO;
}

export type UrgentModelOptimistic = OptimisticData<UrgentModel>;
export type UrgentPagingModel = PagingRespDTO<UrgentModel>;
