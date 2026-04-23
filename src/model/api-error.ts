import { ErrorResponse } from '@/model/dto/common.dto';

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