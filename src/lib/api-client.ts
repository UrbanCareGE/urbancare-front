import type {ErrorResponse} from '@/model/common';

const JAVA_API_URL = process.env.JAVA_API_URL || 'http://localhost:8080';
const NEXT_API_URL = process.env.NEXT_PUBLIC_APP_URL || '';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiCallOptions<TRequest = unknown> {
    data?: TRequest;
    params?: Record<string, string | number | boolean>;
    headers?: Record<string, string>;
    serverSide?: boolean;
    jwtToken?: string;
    timeout?: number; // Request timeout in milliseconds
    cache?: RequestCache; // Next.js cache option
    revalidate?: number | false; // Next.js revalidation time
    tags?: string[]; // Next.js cache tags
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
    const {data, params, headers = {}, serverSide, jwtToken, timeout, cache, revalidate, tags} = options;

    try {
        const shouldCallServerSide = serverSide ?? false;

        let url: string;
        let fetchConfig: ApiFetchConfig;

        if (shouldCallServerSide) {
            const token = jwtToken;

            url = buildUrl(JAVA_API_URL, path, params);

            fetchConfig = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            };


            if (token) {
                fetchConfig.headers['Authorization'] = `Bearer ${token}`;
            }
        } else {

            const proxyPath = path.startsWith('/api/') ? path : `/api/proxy${path}`;
            url = buildUrl(NEXT_API_URL, proxyPath, params);

            fetchConfig = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            };
        }

        // Add body for POST, PUT, PATCH requests
        if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
            fetchConfig.body = JSON.stringify(data);
        }

        // Add Next.js cache options (only on server-side)
        if (shouldCallServerSide) {
            if (cache) {
                fetchConfig.cache = cache;
            }
            if (revalidate !== undefined) {
                fetchConfig.next = {revalidate};
            }
            if (tags && tags.length > 0) {
                fetchConfig.next = {...fetchConfig.next, tags};
            }
        }

        // Handle timeout with AbortController
        let timeoutId: NodeJS.Timeout | undefined;
        if (timeout) {
            const controller = new AbortController();
            fetchConfig.signal = controller.signal;
            timeoutId = setTimeout(() => controller.abort(), timeout);
        }

        // Make the request
        const response = await fetch(url, fetchConfig);

        // Clear timeout if it was set
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Handle non-ok responses
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

        // Parse response
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
            return await response.json();
        }

        // For text responses
        const text = await response.text();
        return text as TResponse;

    } catch (error) {
        // If it's already an ErrorResponse, rethrow it
        if (error && typeof error === 'object' && 'success' in error) {
            throw error;
        }

        // Handle AbortError (timeout)
        if (error instanceof Error && error.name === 'AbortError') {
            throw {
                success: false,
                error: {
                    key: 'TIMEOUT_ERROR',
                    message: 'Request timeout',
                    code: 408,
                },
            } as ErrorResponse;
        }

        // Handle network errors or other exceptions
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
