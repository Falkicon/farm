import { RequestInterceptor, ResponseInterceptor } from './index';
import { RequestConfig, APIResponse, APIError } from '../types';

interface RetryConfig {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  retryableStatuses: number[];
}

export class RetryInterceptor implements RequestInterceptor, ResponseInterceptor {
  private static instance: RetryInterceptor;
  private config: RetryConfig;

  private constructor() {
    this.config = {
      maxAttempts: 3,
      initialDelay: 1000, // 1 second
      maxDelay: 10000, // 10 seconds
      backoffFactor: 2,
      retryableStatuses: [408, 429, 500, 502, 503, 504],
    };
  }

  static getInstance(): RetryInterceptor {
    if (!RetryInterceptor.instance) {
      RetryInterceptor.instance = new RetryInterceptor();
    }
    return RetryInterceptor.instance;
  }

  private shouldRetry(error: Error, attempt: number): boolean {
    if (attempt >= this.config.maxAttempts) {
      return false;
    }

    if (error instanceof Error && 'status' in error) {
      const status = (error as APIError).status;
      return this.config.retryableStatuses.includes(status || 0);
    }

    return error.name === 'AbortError' || error.name === 'TimeoutError';
  }

  private async delay(attempt: number): Promise<void> {
    const backoffDelay = Math.min(
      this.config.initialDelay * Math.pow(this.config.backoffFactor, attempt),
      this.config.maxDelay
    );

    // Add jitter to prevent thundering herd
    const jitter = Math.random() * 100;
    const finalDelay = backoffDelay + jitter;

    await new Promise(resolve => setTimeout(resolve, finalDelay));
  }

  async onRequest(config: RequestConfig): Promise<RequestConfig> {
    // Store original request config for retries
    (config as any).__retry_original = { ...config };
    return config;
  }

  async onRequestError(error: Error): Promise<Error> {
    throw error;
  }

  async onResponse<T>(response: APIResponse<T>): Promise<APIResponse<T>> {
    return response;
  }

  async onResponseError(error: Error, attempt = 0): Promise<Error> {
    const originalConfig = (error as any).__retry_original as RequestConfig;

    if (originalConfig?.endpoint && this.shouldRetry(error, attempt)) {
      await this.delay(attempt);

      try {
        // Re-attempt the request using the endpoint from config
        const response = await fetch(originalConfig.endpoint, {
          method: originalConfig.method || 'GET',
          headers: originalConfig.headers,
          body: originalConfig.body || null
        });

        if (!response.ok) {
          const apiError = new APIError(`HTTP error! status: ${response.status}`);
          apiError.status = response.status;
          throw apiError;
        }

        const data = await response.json();
        const successError = new APIError('Success after retry');
        successError.status = response.status;
        successError.data = data;
        return successError;
      } catch (retryError) {
        // Pass the attempt number for the next retry
        return this.onResponseError(retryError as Error, attempt + 1);
      }
    }

    throw error;
  }

  configure(config: Partial<RetryConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }
}
