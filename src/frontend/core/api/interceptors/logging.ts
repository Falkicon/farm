import * as Sentry from '@sentry/browser';
import { RequestInterceptor, ResponseInterceptor } from './index';
import { RequestConfig, APIResponse } from '../types';

// Add Sentry types until package is installed
declare module '@sentry/browser' {
  export function init(config: any): void;
  export function startTransaction(config: { name: string; op: string }): any;
  export function captureException(error: Error): void;
}

export class LoggingInterceptor implements RequestInterceptor, ResponseInterceptor {
  private static instance: LoggingInterceptor;

  private constructor() {
    // Initialize Sentry if not in development
    if (import.meta.env.PROD) {
      Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.MODE,
        tracesSampleRate: 1.0,
      });
    }
  }

  static getInstance(): LoggingInterceptor {
    if (!LoggingInterceptor.instance) {
      LoggingInterceptor.instance = new LoggingInterceptor();
    }
    return LoggingInterceptor.instance;
  }

  private logRequest(config: RequestConfig): void {
    const transaction = Sentry.startTransaction({
      name: `HTTP ${config.method || 'GET'}`,
      op: 'http.request',
    });

    // Add transaction to config for later use
    (config as any).__sentry_transaction = transaction;

    console.debug('API Request:', {
      endpoint: config.endpoint,
      method: config.method,
      headers: config.headers,
      timestamp: new Date().toISOString(),
    });
  }

  private logResponse<T>(response: APIResponse<T>): void {
    console.debug('API Response:', {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      timestamp: new Date().toISOString(),
    });
  }

  private logError(error: Error): void {
    console.error('API Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    if (import.meta.env.PROD) {
      Sentry.captureException(error);
    }
  }

  async onRequest(config: RequestConfig): Promise<RequestConfig> {
    this.logRequest(config);
    return config;
  }

  async onRequestError(error: Error): Promise<Error> {
    this.logError(error);
    throw error;
  }

  async onResponse<T>(response: APIResponse<T>): Promise<APIResponse<T>> {
    this.logResponse(response);

    // Finish Sentry transaction if it exists
    const transaction = (response as any).__sentry_transaction;
    if (transaction) {
      transaction.finish();
      delete (response as any).__sentry_transaction;
    }

    return response;
  }

  async onResponseError(error: Error): Promise<Error> {
    this.logError(error);
    throw error;
  }
}
