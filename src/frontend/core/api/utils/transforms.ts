import { APIError } from '../types';

export function isAPIError(error: unknown): error is APIError {
  return error instanceof Error && 'status' in error;
}

export function createAPIError(
  message: string,
  status?: number,
  code?: string,
  retry?: boolean
): APIError {
  const error = new Error(message) as APIError;
  error.status = status;
  error.code = code;
  error.retry = retry;
  return error;
}

export function parseQueryParams(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else if (typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
}

export function formatRequestBody(data: unknown): string | FormData | undefined {
  if (data === undefined || data === null) {
    return undefined;
  }

  if (data instanceof FormData) {
    return data;
  }

  if (typeof data === 'object') {
    return JSON.stringify(data);
  }

  return String(data);
}

export function parseResponseData<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  if (contentType?.includes('text/')) {
    return response.text() as Promise<T>;
  }

  if (contentType?.includes('multipart/form-data')) {
    return response.formData() as Promise<T>;
  }

  return response.blob() as Promise<T>;
}
