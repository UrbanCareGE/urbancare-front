import { getBindingIdentifiers } from '@babel/types';
import keys = getBindingIdentifiers.keys;

export type ErrorResp = {
  key: string;
  message: string;
  code: number;
  data?: unknown;
  stack?: unknown;
};

export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  error: ErrorResp;
};

export interface PairIdNameWrapperDTO {
  id: string;
  name: string;
}

export interface IdWrapperDTO {
  id: string;
}

export interface SuccessDTO {
  success: boolean;
}

export interface PagingDTO {
  page: number;
  size: number;
}

export interface SortRestDTO {
  direction: 'DESC' | 'ASC';
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  descending: boolean;
  ascending: boolean;
}

export interface PagingRespDTO<TResponse> {
  content: TResponse[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  number: number;
  sort?: SortRestDTO;
}

export type OptimisticData<T> = T & {
  _isPending?: boolean;
  _tempId?: string;
};
