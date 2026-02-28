import { PagingRespDTO } from '@/model/dto/common.dto';

export interface ApartmentDTO {
  id: string;
  name: string;
  isManager: boolean;
  imageId: string;
}

export type ApartmentPagingDTO = PagingRespDTO<Omit<ApartmentDTO, 'isManager'>>;
