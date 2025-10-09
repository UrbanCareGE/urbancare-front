import axios, {AxiosError, AxiosResponse} from "axios";
import {API_SERVICES} from "@/service/config";
import type {ErrorResponse} from "@/model/common";

export const getApiInstance = (service: keyof typeof API_SERVICES) => {
    return axios.create({
        baseURL: API_SERVICES[service],
        withCredentials: true,
    });
};

export async function apiCall<TResponse = void, TRequest = unknown>(
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    options?: {
        data?: TRequest;
        params?: Record<string, unknown>;
        apiName?: keyof typeof API_SERVICES;
        withCredentials?: boolean;
    }
): Promise<AxiosResponse<TResponse>> {
    try {
        const api = getApiInstance(options?.apiName ?? "URBANCARE_API");
        const res = await api.request<TResponse>({
            method,
            url,
            data: options?.data,
            params: options?.params,
            withCredentials: options?.withCredentials,
            headers: {"ngrok-skip-browser-warning": "dwad"}
        });

        return res;
    } catch (err) {
        const axiosErr = err as AxiosError<ErrorResponse>;

        if (axiosErr.response?.data) throw axiosErr.response.data;

        throw {
            success: false,
            error: {
                key: "UNKNOWN_ERROR",
                message: axiosErr.message || "Something went wrong",
                code: axiosErr.response?.status ?? 500,
            },
        } as ErrorResponse;
    }
}