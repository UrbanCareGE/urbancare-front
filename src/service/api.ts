import axios, {AxiosError, AxiosResponse} from "axios";
import {API_SERVICES} from "@/service/config";
import type {ErrorResponse} from "@/model/common";

export const getApiInstance = (service: keyof typeof API_SERVICES) => {
    const api = axios.create({
        baseURL: API_SERVICES[service],
        headers: {"Content-Type": "application/json"},
        withCredentials: true,
    });

    // api.interceptors.request.use(
    //     async (config) => {
    //         let accessToken = jwtTokenData?.authToken; // Use provided token if available
    //
    //         if (accessToken) {
    //             config.headers["Authorization"] = `Bearer ${accessToken}`;
    //         }
    //
    //         return config;
    //     },
    //     (error) => Promise.reject(error)
    // );
    //
    // api.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //         const originalRequest = error.config;
    //
    //         if (error.response?.status === 401 && !originalRequest._retry) {
    //             originalRequest._retry = true;
    //
    //             let refreshToken = jwtTokenData?.refreshToken;
    //
    //             if (refreshToken) {
    //                 const newAccessToken = await refreshAccessToken(refreshToken);
    //
    //                 if (!newAccessToken) {
    //                     // TODO determine logic for invalid access token afrer refreshing
    //                 }
    //
    //                 originalRequest.headers["Authorization"] = `Bearer ${newAccessToken.authToken}`;
    //
    //                 return api(originalRequest);
    //             }
    //         }
    //
    //         return Promise.reject(error);
    //     }
    // );

    return api;
};

export async function apiCall<TResponse = void, TRequest = unknown>(
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    options?: {
        data?: TRequest;
        params?: Record<string, unknown>;
        apiName?: keyof typeof API_SERVICES;
    }
): Promise<AxiosResponse<TResponse>> {
    try {
        const api = getApiInstance(options?.apiName ?? "URBANCARE_API");
        const res = await api.request<TResponse>({
            method,
            url,
            data: options?.data,
            params: options?.params,
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