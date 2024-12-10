const DEFAULT_TIMEOUT = 5000;

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL ||
              (import.meta.env.PROD ? '/api' : 'http://localhost:8000/api'),
    TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT as string) || DEFAULT_TIMEOUT
} as const;

// Type for the API configuration
export type ApiConfig = typeof API_CONFIG;
