import { ApartmentDTO } from '@/model/dto/apartment.dto';
import { PhoneNumberDTO } from '@/model/dto/auth.dto';
import { OptimisticData, PagingRespDTO } from '@/model/dto/common.dto';
import { ThreadModel } from '@/model/model/thread.model';

export interface UserModel {
  id: string;
  phone: PhoneNumberDTO;
  name?: string;
  surname?: string;
  profileImageId?: string;
  joinedApartments: ApartmentDTO[];
  selectedApartment?: ApartmentDTO;
  selectedApartmentId?: string;
  hasPassword: boolean;
}

export type UserModelOptimistic = OptimisticData<ThreadModel>;
export type UserPagingModel = PagingRespDTO<UserModel>
