import { API_CONFIG } from '../config/api';

export interface ApiError {
  error: string;
  message: string;
  details?: unknown;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');
      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        const apiError: ApiError = {
          error: data?.error || 'API Error',
          message: data?.message || response.statusText,
          details: data?.details,
        };
        throw new Error(JSON.stringify(apiError));
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          const timeoutError: ApiError = {
            error: 'Request Timeout',
            message: `Request to ${path} timed out after ${this.timeout}ms`,
          };
          throw new Error(JSON.stringify(timeoutError));
        }
        throw error;
      }
      const networkError: ApiError = {
        error: 'Network Error',
        message: 'Failed to connect to the server',
      };
      throw new Error(JSON.stringify(networkError));
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'GET' });
  }
}

export const apiClient = new ApiClient();
