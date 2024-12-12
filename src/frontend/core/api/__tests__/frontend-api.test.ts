import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FrontendAPI } from '../frontend-api';
import { APIError } from '../types';

describe('FrontendAPI', () => {
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

  it('getInstance', () => {
    const instance1 = FrontendAPI.getInstance();
    const instance2 = FrontendAPI.getInstance();
    expect(instance1).toBe(instance2);
  });

  describe('HTTP Methods', () => {
    it('should make GET request', async () => {
      const mockResponse = { data: 'test' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers(),
      });

      const response = await api.get('/test');
      expect(response.data).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('should make POST request with data', async () => {
      const mockData = { test: 'data' };
      const mockResponse = { success: true };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers(),
      });

      const response = await api.post('/test', mockData);
      expect(response.data).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockData),
        })
      );
    });

    it('should handle errors', async () => {
      const errorStatus = 500;
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: errorStatus,
      });

      try {
        await api.get('/test');
        expect.fail('Expected error to be thrown');
      } catch (error) {
        expect((error as APIError).status).toBe(errorStatus);
      }
    });
  });

  describe('Interceptors', () => {
    it('should apply interceptors', async () => {
      const mockResponse = { data: 'test' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers(),
      });

      const interceptor = {
        onRequest: vi
          .fn()
          .mockImplementation((config) => ({ ...config, headers: { 'X-Test': 'test' } })),
        onResponse: vi.fn().mockImplementation((response) => response),
      };

      api.addRequestInterceptor(interceptor);
      await api.get('/test');

      expect(interceptor.onRequest).toHaveBeenCalled();
    });
  });

  describe('Configuration', () => {
    it('should use default config', async () => {
      const mockResponse = { data: 'test' };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
        headers: new Headers(),
      });

      await api.get('/test');
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include',
        })
      );
    });
  });
});
