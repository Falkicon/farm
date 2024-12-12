import * as Sentry from '@sentry/browser';
import { RequestInterceptor, ResponseInterceptor } from './index';
import { RequestConfig, APIResponse } from '../types';

/**
 * Extended request config with Sentry transaction
 */
interface RequestConfigWithSentry extends RequestConfig {
  __sentry_transaction?: Sentry.Transaction;
}

/**
 * Extended API response with Sentry transaction
 */
interface APIResponseWithSentry<T> extends APIResponse<T> {
  __sentry_transaction?: Sentry.Transaction;
}

export class LoggingInterceptor implements RequestInterceptor, ResponseInterceptor {
  private static instance: LoggingInterceptor;
  private initialized = false;

  private constructor() {
    this.initializeSentry();
  }

  private initializeSentry(): void {
    // Only initialize once and only in production
    if (this.initialized || !import.meta.env.PROD) {
      return;
    }

    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (!dsn) {
      console.warn('Sentry DSN not provided. Error tracking disabled.');
      return;
    }

    try {
      Sentry.init({
        dsn,
        environment: import.meta.env.MODE || 'production',
        tracesSampleRate: 1.0,
      });
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Sentry:', error);
    }
  }

  static getInstance(): LoggingInterceptor {
    if (!LoggingInterceptor.instance) {
      LoggingInterceptor.instance = new LoggingInterceptor();
    }
    return LoggingInterceptor.instance;
  }

  private logRequest(config: RequestConfigWithSentry): void {
    if (this.initialized) {
      const transaction = Sentry.startTransaction({
        name: `HTTP ${config.method || 'GET'}`,
        op: 'http.request',
      });
      config.__sentry_transaction = transaction;
    }

    // Always log to console in development
    if (import.meta.env.DEV) {
      console.debug('API Request:', {
        endpoint: config.endpoint,
        method: config.method,
        headers: config.headers,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private logResponse<T>(response: APIResponseWithSentry<T>): void {
    // Always log to console in development
    if (import.meta.env.DEV) {
      console.debug('API Response:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        timestamp: new Date().toISOString(),
      });
    }
  }

  private logError(error: Error): void {
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };

    // Always log to console in development
    if (import.meta.env.DEV) {
      console.error('API Error:', errorDetails);
    }

    // Log to Sentry in production if initialized
    if (this.initialized && import.meta.env.PROD) {
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

  async onResponseError(error: Error): Promise<Error> {
    this.logError(error);
    throw error;
  }
}
