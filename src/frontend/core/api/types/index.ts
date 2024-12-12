export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig extends Omit<RequestInit, 'method' | 'body'> {
  method?: HTTPMethod;
  endpoint?: string;
  url?: string;
  body?: BodyInit | null;
  timeout?: number;
  retry?: boolean;
  maxAttempts?: number;
  headers?: Record<string, string>;
  query?: Record<string, unknown>;
}

export interface APIResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

export class APIError extends Error {
  status?: number;
  code?: string;
  retry?: boolean;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export interface APIConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  retry: boolean;
  maxAttempts: number;
}
