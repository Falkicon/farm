import { describe, it, beforeEach, expect } from 'vitest';
import {
  isAPIError,
  createAPIError,
  parseQueryParams,
  formatRequestBody,
  parseResponseData,
} from '../utils/transforms';
import { APICache } from '../utils/cache';
import { APIResponse, QueryParams } from '../types';

describe('API Utilities', () => {
  describe('Error Utilities', () => {
    it('should identify API errors', () => {
      const error = createAPIError('Test error', 404, 'NOT_FOUND');
      expect(isAPIError(error)).toBe(true);
      expect(isAPIError(new Error())).toBe(false);
    });

    it('should create API error with properties', () => {
      const error = createAPIError('Test error', 404, 'NOT_FOUND', true);
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
      expect(error.retry).toBe(true);
    });
  });

  describe('Query Parameter Utilities', () => {
    it('should parse query parameters', () => {
      const params: QueryParams = {
        id: 1,
        name: 'test',
        tags: ['a', 'b'],
        filter: { status: 'active' },
      };

      const queryString = parseQueryParams(params);
      expect(queryString).toContain('id=1');
      expect(queryString).toContain('name=test');
      expect(queryString).toContain('tags=a');
      expect(queryString).toContain('tags=b');
      expect(queryString).toContain('filter=');
    });

    it('should handle null and undefined values', () => {
      const params: QueryParams = {
        id: 1,
        name: null,
        description: undefined,
      };

      const queryString = parseQueryParams(params);
      expect(queryString).toBe('id=1');
    });
  });

  describe('Request Body Formatting', () => {
    it('should format object to JSON string', () => {
      const data = { id: 1, name: 'test' };
      const result = formatRequestBody(data);
      expect(result).toBe(JSON.stringify(data));
    });

    it('should pass through FormData', () => {
      const formData = new FormData();
      const result = formatRequestBody(formData);
      expect(result).toBe(formData);
    });

    it('should handle primitive values', () => {
      expect(formatRequestBody('test')).toBe('test');
      expect(formatRequestBody(123)).toBe('123');
      expect(formatRequestBody(null)).toBeUndefined();
    });
  });

  describe('Response Data Parsing', () => {
    it('should parse JSON response', async () => {
      const response = new Response(JSON.stringify({ data: 'test' }), {
        headers: { 'content-type': 'application/json' },
      });
      const result = await parseResponseData(response);
      expect(result).toEqual({ data: 'test' });
    });

    it('should parse text response', async () => {
      const response = new Response('test data', {
        headers: { 'content-type': 'text/plain' },
      });
      const result = await parseResponseData(response);
      expect(result).toBe('test data');
    });

    it('should handle form data response', async () => {
      const formData = new FormData();
      formData.append('test', 'data');

      // Create a proper multipart form-data body
      const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
      const body = [`--${boundary}`, 'Content-Disposition: form-data; name="test"', '', 'data', `--${boundary}--`].join(
        '\r\n',
      );

      const response = new Response(body, {
        headers: {
          'content-type': `multipart/form-data; boundary=${boundary}`,
        },
      });

      const result = (await parseResponseData(response)) as FormData;
      expect(result).toBeTruthy();
      expect(result.get('test')).toBe('data');
    });
  });
});

describe('APICache', () => {
  let cache: APICache;

  beforeEach(() => {
    cache = APICache.getInstance();
    cache.clear();
  });

  it('should be a singleton', () => {
    const instance1 = APICache.getInstance();
    const instance2 = APICache.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should cache and retrieve data', () => {
    const key = 'test-key';
    const data: APIResponse<{ id: number }> = {
      data: { id: 1 },
      status: 200,
      headers: new Headers(),
    };

    cache.set(key, data);
    expect(cache.get(key)).toEqual(data);
  });

  it('should respect TTL', async () => {
    const key = 'test-key';
    const data: APIResponse<{ id: number }> = {
      data: { id: 1 },
      status: 200,
      headers: new Headers(),
    };

    cache.set(key, data, 100); // 100ms TTL
    expect(cache.get(key)).toEqual(data);

    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(cache.get(key)).toBeNull();
  });

  it('should generate consistent cache keys', () => {
    const endpoint = '/api/test';
    const params: Record<string, unknown> = { id: 1, name: 'test' };

    const key1 = cache.getCacheKey(endpoint, params);
    const key2 = cache.getCacheKey(endpoint, { ...params });

    expect(key1).toBe(key2);
  });
});
