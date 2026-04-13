export type ErrorResponse = {
  key: string;
  message: string;
  code: number;
  data?: unknown;
};

export class ApiError extends Error {
  key: string;
  code: number;
  httpStatus: number;
  data?: unknown;

  constructor(response: ErrorResponse, httpStatus: number) {
    super(response.message);
    this.name = 'ApiError';
    this.key = response.key;
    this.code = response.code;
    this.httpStatus = httpStatus;
    this.data = response.data;
  }
}

export type SuccessResponse<T> = {
  success: true;
  data: T;
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
  sort?: SortRestDTO;
  page: PageInfo;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export type OptimisticData<T> = T & {
  _isPending?: boolean;
  _tempId?: string;
};
