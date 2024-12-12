import { RequestConfig, APIResponse, HTTPMethod, APIError } from './types';
import { InterceptorManager, RequestInterceptor, ResponseInterceptor } from './interceptors';
import { AuthInterceptor } from './interceptors/auth';
import { getConfig } from './config';
import { parseQueryParams } from './utils/transforms';
import { APICache } from './utils/cache';

export class FrontendAPI {
  private static instance: FrontendAPI;
  private baseURL: string;
  private defaultConfig: RequestConfig;
  private interceptors: InterceptorManager;
  private cache: APICache;

  private constructor() {
    const config = getConfig();
    this.baseURL = config.baseURL;
    this.defaultConfig = {
      credentials: 'include',
      headers: config.headers,
      timeout: config.timeout,
    };
    this.interceptors = new InterceptorManager();
    this.cache = APICache.getInstance();

    // Register default interceptors
    this.interceptors.addRequestInterceptor(AuthInterceptor.getInstance());
    this.interceptors.addResponseInterceptor(AuthInterceptor.getInstance());
  }

  static getInstance(): FrontendAPI {
    if (!FrontendAPI.instance) {
      FrontendAPI.instance = new FrontendAPI();
    }
    return FrontendAPI.instance;
  }

  private async request<T>(
    method: HTTPMethod,
    endpoint: string,
    config?: RequestConfig,
    data?: unknown
  ): Promise<APIResponse<T>> {
    const url = new URL(endpoint, this.baseURL);
    const cacheKey = `${method}:${url.toString()}`;

    // Check cache for GET requests
    if (method === 'GET') {
      const cachedResponse = this.cache.get<T>(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // Add query parameters if they exist
    if (config?.query) {
      const queryString = parseQueryParams(config.query);
      if (queryString) {
        url.search = queryString;
      }
    }

    const controller = new AbortController();

    // Merge configs
    const finalConfig: RequestConfig = {
      ...this.defaultConfig,
      ...config,
      signal: controller.signal,
    };

    // Run request interceptors
    const interceptedConfig = await this.interceptors.runRequestInterceptors(finalConfig);

    const timeoutId = setTimeout(
      () => controller.abort(),
      interceptedConfig.timeout ?? this.defaultConfig.timeout
    );

    try {
      const response = await fetch(url.toString(), {
        method,
        ...interceptedConfig,
        body: data ? JSON.stringify(data) : undefined,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`) as APIError;
        error.status = response.status;
        throw error;
      }

      const result = await response.json();
      const apiResponse: APIResponse<T> = {
        data: result as T,
        status: response.status,
        headers: response.headers,
      };

      // Cache the response if it's a GET request and has cache-control header
      if (method === 'GET') {
        const cacheControl = response.headers.get('cache-control');
        if (cacheControl) {
          const maxAge = parseInt(cacheControl.match(/max-age=(\d+)/)?.[1] || '0', 10);
          if (maxAge > 0) {
            this.cache.set(cacheKey, apiResponse, maxAge * 1000);
          }
        }
      }

      // Run response interceptors
      return this.interceptors.runResponseInterceptors(apiResponse);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Add interceptor management methods
  addRequestInterceptor(interceptor: RequestInterceptor): number {
    return this.interceptors.addRequestInterceptor(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): number {
    return this.interceptors.addResponseInterceptor(interceptor);
  }

  removeRequestInterceptor(index: number): void {
    this.interceptors.removeRequestInterceptor(index);
  }

  removeResponseInterceptor(index: number): void {
    this.interceptors.removeResponseInterceptor(index);
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('GET', endpoint, config);
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('POST', endpoint, config, data);
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('PUT', endpoint, config, data);
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('DELETE', endpoint, config);
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<APIResponse<T>> {
    return this.request<T>('PATCH', endpoint, config, data);
  }
}
