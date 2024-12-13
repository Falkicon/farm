/**
 * @module Types
 */

/**
 * Route configuration interface
 */
export interface Route {
  path: string;
  component: string;
  title?: string;
  children?: Route[];
}

/**
 * API Client configuration
 */
export interface ApiClient {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Table configuration interface
 */
export interface TableConfig {
  columns: string[];
  sortable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
}

/**
 * Validation rule types
 */
export type ValidationRule = {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  url?: boolean;
  custom?: (value: unknown) => boolean;
};

/**
 * Form configuration interface
 */
export interface FormConfig {
  fields: FormField[];
  submitUrl: string;
  method?: 'POST' | 'PUT' | 'PATCH';
}

/**
 * Form field configuration
 */
export interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  validation?: Record<string, ValidationRule>;
}

/**
 * File upload configuration
 */
export interface UploadConfig {
  maxSize: number;
  allowedTypes: string[];
  uploadUrl: string;
  multiple?: boolean;
}

/**
 * Metric history interface
 */
export interface MetricHistory {
  timestamp: number;
  value: number;
  label?: string;
}

/**
 * Server information interface
 */
export interface ServerInfo {
  version: string;
  environment: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
  };
}

/**
 * Error type for retry conditions
 */
export interface RetryError extends Error {
  code?: string | number;
  status?: number;
  response?: {
    status?: number;
    data?: unknown;
  };
}

/**
 * Retry configuration interface
 */
export interface RetryConfig {
  maxRetries: number;
  delay: number;
  retryCondition?: (error: RetryError) => boolean;
}
