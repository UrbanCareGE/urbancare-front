import { OptimisticData, PagingRespDTO } from '@/model/dto/common.dto';
import { ThreadModel } from '@/model/model/thread.model';

export interface ApartmentModel {
  id: string;
  name: string;
  isManager: boolean;
  imageId: string;
}

export type ApartmentModelOptimistic = OptimisticData<ApartmentModel>;
export type ApartmentPagingModel = PagingRespDTO<ApartmentModel>;
