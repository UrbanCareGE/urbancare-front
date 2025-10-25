import type {ErrorResponse} from '@/model/common.dto';

export const JAVA_API_URL = process.env.JAVA_API_URL || 'http://localhost:8080';
export const NEXT_API_URL = process.env.NEXT_PUBLIC_APP_URL || '';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiCallOptions<TRequest = unknown> {
    data?: TRequest;
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
}

interface ApiFetchConfig extends RequestInit {
    method: HttpMethod;
    headers: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
}

function buildUrl(baseUrl: string, path: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(path.startsWith('/') ? path : `/${path}`, baseUrl);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    return url.toString();
}

export async function apiClient<TResponse = unknown, TRequest = unknown>(
    method: HttpMethod,
    path: string,
    options: ApiCallOptions<TRequest> = {}
): Promise<TResponse> {
    try {
        const {data, params, headers = {}} = options;

        const url: string = buildUrl(NEXT_API_URL, path, params);
        const fetchConfig: ApiFetchConfig = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'ababa',
                ...headers,
            },
        };

        if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
            fetchConfig.body = JSON.stringify(data);
        }

        const response = await fetch(url, fetchConfig);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                success: false,
                error: {
                    key: 'REQUEST_FAILED',
                    message: `Request failed with status ${response.status}`,
                    code: response.status,
                },
            }));

            throw errorData as ErrorResponse;
        }

        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
            return await response.json();
        }

        const text = await response.text();
        return text as TResponse;

    } catch (error) {
        if (error && typeof error === 'object' && 'success' in error) {
            throw error;
        }

        throw {
            success: false,
            error: {
                key: 'NETWORK_ERROR',
                message: error instanceof Error ? error.message : 'An unknown error occurred',
                code: 500,
            },
        } as ErrorResponse;
    }
}

export const api = {
    get: <TResponse = unknown>(
        path: string,
        options?: Omit<ApiCallOptions, 'data'>
    ) => apiClient<TResponse>('GET', path, options),

    post: <TResponse = unknown, TRequest = unknown>(
        path: string,
        data?: TRequest,
        options?: Omit<ApiCallOptions<TRequest>, 'data'>
    ) => apiClient<TResponse, TRequest>('POST', path, {...options, data}),

    put: <TResponse = unknown, TRequest = unknown>(
        path: string,
        data?: TRequest,
        options?: Omit<ApiCallOptions<TRequest>, 'data'>
    ) => apiClient<TResponse, TRequest>('PUT', path, {...options, data}),

    patch: <TResponse = unknown, TRequest = unknown>(
        path: string,
        data?: TRequest,
        options?: Omit<ApiCallOptions<TRequest>, 'data'>
    ) => apiClient<TResponse, TRequest>('PATCH', path, {...options, data}),

    delete: <TResponse = unknown>(
        path: string,
        options?: Omit<ApiCallOptions, 'data'>
    ) => apiClient<TResponse>('DELETE', path, options),
};
