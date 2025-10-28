export type ErrorResp = {
    key: string;
    message: string;
    code: number;
    data?: never;
    stack?: never;
}

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