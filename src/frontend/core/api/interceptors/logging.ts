import * as Sentry from '@sentry/browser';
import { RequestInterceptor, ResponseInterceptor } from './index';
import { RequestConfig, APIResponse } from '../types';

/**
 * Sentry configuration interface
 */
interface SentryConfig {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
}

/**
 * Sentry transaction interface
 */
interface SentryTransaction {
  finish(): void;
}

/**
 * Extended request config with Sentry transaction
 */
interface RequestConfigWithSentry extends RequestConfig {
  __sentry_transaction?: SentryTransaction;
}

/**
 * Extended API response with Sentry transaction
 */
interface APIResponseWithSentry<T> extends APIResponse<T> {
  __sentry_transaction?: SentryTransaction;
}

// Add Sentry types until package is installed
declare module '@sentry/browser' {
  export function init(config: SentryConfig): void;
  export function startTransaction(config: { name: string; op: string }): SentryTransaction;
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

  private logRequest(config: RequestConfigWithSentry): void {
    const transaction = Sentry.startTransaction({
      name: `HTTP ${config.method || 'GET'}`,
      op: 'http.request',
    });

    // Add transaction to config for later use
    config.__sentry_transaction = transaction;

    console.debug('API Request:', {
      endpoint: config.endpoint,
      method: config.method,
      headers: config.headers,
      timestamp: new Date().toISOString(),
    });
  }

  private logResponse<T>(response: APIResponseWithSentry<T>): void {
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
    this.logRequest(config as RequestConfigWithSentry);
    return config;
  }

  async onRequestError(error: Error): Promise<never> {
    this.logError(error);
    throw error;
  }

  async onResponse<T>(response: APIResponse<T>): Promise<APIResponse<T>> {
    this.logResponse(response as APIResponseWithSentry<T>);

    // Finish Sentry transaction if it exists
    const typedResponse = response as APIResponseWithSentry<T>;
    if (typedResponse.__sentry_transaction) {
      typedResponse.__sentry_transaction.finish();
      delete typedResponse.__sentry_transaction;
    }

    return response;
  }

  async onResponseError(error: Error): Promise<never> {
    this.logError(error);
    throw error;
  }
}
