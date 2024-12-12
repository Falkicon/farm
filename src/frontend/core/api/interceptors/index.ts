import { RequestConfig, APIResponse } from '../types';

export interface RequestInterceptor {
  onRequest(config: RequestConfig): Promise<RequestConfig> | RequestConfig;
  onRequestError?(error: Error): Promise<Error> | Error;
}

export interface ResponseInterceptor {
  onResponse<T>(response: APIResponse<T>): Promise<APIResponse<T>> | APIResponse<T>;
  onResponseError?(error: Error): Promise<Error> | Error;
}

export class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  addRequestInterceptor(interceptor: RequestInterceptor): number {
    return this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): number {
    return this.responseInterceptors.push(interceptor);
  }

  removeRequestInterceptor(index: number): void {
    this.requestInterceptors.splice(index - 1, 1);
  }

  removeResponseInterceptor(index: number): void {
    this.responseInterceptors.splice(index - 1, 1);
  }

  async runRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let currentConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      try {
        currentConfig = await interceptor.onRequest(currentConfig);
      } catch (error) {
        if (interceptor.onRequestError) {
          throw await interceptor.onRequestError(error as Error);
        }
        throw error;
      }
    }

    return currentConfig;
  }

  async runResponseInterceptors<T>(response: APIResponse<T>): Promise<APIResponse<T>> {
    let currentResponse = { ...response };

    for (const interceptor of this.responseInterceptors) {
      try {
        currentResponse = await interceptor.onResponse(currentResponse);
      } catch (error) {
        if (interceptor.onResponseError) {
          throw await interceptor.onResponseError(error as Error);
        }
        throw error;
      }
    }

    return currentResponse;
  }
}
