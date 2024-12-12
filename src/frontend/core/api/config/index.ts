import { APIConfig } from '../types';

const defaultConfig: APIConfig = {
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
  timeout: import.meta.env.PROD ? 10000 : 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: true,
  maxAttempts: 3,
};

export const developmentConfig: APIConfig = {
  ...defaultConfig,
  timeout: 30000,
  retry: true,
  maxAttempts: 3,
};

export const productionConfig: APIConfig = {
  ...defaultConfig,
  timeout: 10000,
  retry: true,
  maxAttempts: 2,
};

export const testConfig: APIConfig = {
  ...defaultConfig,
  baseURL: 'http://localhost:8000',
  timeout: 5000,
  retry: false,
  maxAttempts: 1,
};

export function getConfig(): APIConfig {
  switch (import.meta.env.MODE) {
    case 'development':
      return developmentConfig;
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    default:
      return defaultConfig;
  }
}
