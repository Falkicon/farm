/**
 * HTTP Methods supported by the API
 */
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Query parameters type for API requests
 */
export type QueryParams = Record<string, unknown>;

/**
 * Request configuration options
 */
export interface RequestConfig extends Omit<RequestInit, 'body' | 'method'> {
  method?: HTTPMethod;
  endpoint?: string;
  url?: string;
  body?: BodyInit | null;
  timeout?: number;
  retry?: boolean;
  maxAttempts?: number;
  headers?: Record<string, string>;
  query?: QueryParams;
}

/**
 * API Response interface
 */
export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
}

/**
 * API Error class with additional properties
 */
export class APIError extends Error {
  status?: number;
  code?: string;
  retry?: boolean;
  data?: unknown;

  constructor(message: string, status?: number, code?: string, retry?: boolean, data?: unknown) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.retry = retry;
    this.data = data;
  }
}

/**
 * Cache configuration options
 */
export interface CacheConfig {
  ttl?: number;
  key?: string;
  enabled?: boolean;
}

/**
 * API Configuration options
 */
export interface APIConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  retry: boolean;
  maxAttempts: number;
  cache?: CacheConfig;
}
