declare module '@sentry/browser' {
  interface SentryConfig {
    dsn: string;
    environment?: string;
    tracesSampleRate?: number;
    [key: string]: any;
  }

  interface Transaction {
    finish(): void;
  }

  export function init(config: SentryConfig): void;
  export function startTransaction(config: { name: string; op: string }): Transaction;
  export function captureException(error: Error): string;
}
