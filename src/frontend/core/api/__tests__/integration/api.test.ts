import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FrontendAPI } from '../../frontend-api';
import { APIError } from '../../types';

describe('API Integration', () => {
  let api: FrontendAPI;
  let originalFetch: typeof fetch;

  beforeEach(() => {
    api = FrontendAPI.getInstance();
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.clearAllMocks();
  });

  describe('Health Check', () => {
    it('should check backend health', async () => {
      const mockResponse = { status: 'healthy' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      const response = await api.get('/health');
      expect(response.data).toEqual(mockResponse);
    });

    it('should cache health check response', async () => {
      const mockResponse = { status: 'healthy' };
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({
          'content-type': 'application/json',
          'cache-control': 'max-age=60'
        }),
      });
      global.fetch = mockFetch;

      // First call should make a request
      await api.get('/health');

      // Second call within cache time should use cached response
      await api.get('/health');

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Authentication', () => {
    it('should handle unauthorized requests', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      try {
        await api.get('/protected-resource');
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect((error as APIError).status).toBe(401);
      }
    });

    it('should add auth token to requests', async () => {
      const mockResponse = { data: 'protected' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      await api.get('/protected-resource', {
        headers: { Authorization: 'Bearer test-token' },
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      try {
        await api.get('/non-existent-endpoint');
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect((error as APIError).status).toBe(404);
      }
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      try {
        await api.get('/test');
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Network error');
      }
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('Timeout');
      timeoutError.name = 'AbortError';
      global.fetch = vi.fn().mockRejectedValue(timeoutError);

      try {
        await api.get('/test', { timeout: 1000 });
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).name).toBe('AbortError');
      }
    });
  });

  describe('Request Methods', () => {
    it('should handle POST requests with JSON data', async () => {
      const mockData = { test: 'data' };
      const mockResponse = { success: true };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      const response = await api.post('/test', mockData);
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle PUT requests', async () => {
      const mockData = { test: 'data' };
      const mockResponse = { success: true };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      const response = await api.put('/test', mockData);
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle DELETE requests', async () => {
      const mockResponse = { success: true };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      const response = await api.delete('/test');
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle query parameters', async () => {
      const mockResponse = { data: 'test' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      await api.get('/test', { query: { param: 'value' } });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('param=value'),
        expect.any(Object)
      );
    });
  });

  describe('Content Types', () => {
    it('should handle JSON responses', async () => {
      const mockResponse = { data: 'test' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'application/json' }),
      });

      const response = await api.get('/test');
      expect(response.data).toEqual(mockResponse);
    });

    it('should handle form data submissions', async () => {
      const formData = new FormData();
      formData.append('test', 'data');

      const mockResponse = { success: true };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers({ 'content-type': 'multipart/form-data' }),
        formData: () => Promise.resolve(formData),
      });

      const response = await api.post('/test', formData);
      expect(response.data).toEqual(mockResponse);
    });
  });
});
