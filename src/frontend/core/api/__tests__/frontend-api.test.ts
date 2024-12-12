import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FrontendAPI } from '../frontend-api';
import { AuthInterceptor } from '../interceptors/auth';

describe('FrontendAPI', () => {
  let api: FrontendAPI;

  beforeEach(() => {
    // Reset the singleton instance before each test
    vi.clearAllMocks();
    api = FrontendAPI.getInstance();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getInstance', () => {
    it('should return the same instance', () => {
      const instance1 = FrontendAPI.getInstance();
      const instance2 = FrontendAPI.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('HTTP Methods', () => {
    const mockResponse = { data: { id: 1 } };
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
      headers: new Headers(),
      status: 200,
    });

    beforeEach(() => {
      global.fetch = mockFetch;
    });

    it('should make GET request', async () => {
      const response = await api.get('/test');
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({ method: 'GET' })
      );
      expect(response.data).toEqual(mockResponse);
    });

    it('should make POST request with data', async () => {
      const data = { name: 'test' };
      await api.post('/test', data);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(data),
        })
      );
    });

    it('should handle errors', async () => {
      const errorMessage = 'Not Found';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: errorMessage,
      });

      await expect(api.get('/not-found')).rejects.toThrow();
    });
  });

  describe('Interceptors', () => {
    it('should use auth interceptor', async () => {
      const token = 'test-token';
      const authInterceptor = AuthInterceptor.getInstance();
      vi.spyOn(authInterceptor, 'getAuthToken').mockReturnValue(token);

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
        headers: new Headers(),
        status: 200,
      });
      global.fetch = mockFetch;

      await api.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${token}`,
          }),
        })
      );
    });
  });

  describe('Configuration', () => {
    it('should use default timeout', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
        headers: new Headers(),
        status: 200,
      });
      global.fetch = mockFetch;

      await api.get('/test');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });
  });
});
