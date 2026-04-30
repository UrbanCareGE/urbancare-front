import { PagingRespDTO } from '@/model/dto/common.dto';
import { UserSnapshotDTO } from '@/model/dto/auth.dto';

export interface ApartmentDTO {
  id: string;
  name: string;
  isManager: boolean;
  imageId: string;
}

export type ApartmentPagingDTO = PagingRespDTO<Omit<ApartmentDTO, 'isManager'>>;

export interface ApartmentMemberDTO {
  id: string;
  userId: string;
  isManager: boolean;
  createdAt: string;
  userInfo?: UserSnapshotDTO;
}
