import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { FrontendAPI } from '../../frontend-api';
import { APICache } from '../../utils/cache';
import { AuthInterceptor } from '../../interceptors/auth';
import { APIError } from '../../types';

interface HealthResponse {
  status: string;
  timestamp: string;
}

describe('API Integration', () => {
  let api: FrontendAPI;
  let cache: APICache;

  beforeAll(() => {
    api = FrontendAPI.getInstance();
    cache = APICache.getInstance();
    cache.clear();
  });

  afterAll(() => {
    cache.clear();
  });

  describe('Health Check', () => {
    it('should check backend health', async () => {
      const response = await api.get<HealthResponse>('/health');

      expect(response.status).toBe(200);
      expect(response.data).toEqual(
        expect.objectContaining({
          status: 'healthy',
          timestamp: expect.any(String),
        })
      );
    });

    it('should cache health check response', async () => {
      const cacheKey = cache.getCacheKey('/health');
      expect(cache.has(cacheKey)).toBe(false);

      const response = await api.get<HealthResponse>('/health');
      expect(cache.has(cacheKey)).toBe(true);

      const cachedResponse = cache.get<HealthResponse>(cacheKey);
      expect(cachedResponse?.data).toEqual(response.data);
    });
  });

  describe('Authentication', () => {
    it('should handle unauthorized requests', async () => {
      const authInterceptor = AuthInterceptor.getInstance();
      authInterceptor.clearAuthToken();

      await expect(async () => {
        await api.get('/protected-resource');
      }).rejects.toThrow();

      try {
        await api.get('/protected-resource');
      } catch (error) {
        expect((error as APIError).status).toBe(401);
      }
    });

    it('should add auth token to requests', async () => {
      const authInterceptor = AuthInterceptor.getInstance();
      const mockToken = 'test-token';
      authInterceptor.setAuthToken(mockToken);

      const response = await api.get('/auth-test');
      expect(response.status).toBe(200);
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 errors', async () => {
      await expect(async () => {
        await api.get('/non-existent-endpoint');
      }).rejects.toThrow();

      try {
        await api.get('/non-existent-endpoint');
      } catch (error) {
        expect((error as APIError).status).toBe(404);
      }
    });

    it('should handle network errors', async () => {
      await expect(async () => {
        await api.get('http://invalid-url');
      }).rejects.toThrow();
    });

    it('should handle timeout errors', async () => {
      await expect(async () => {
        await api.get('/slow-endpoint', { timeout: 1 });
      }).rejects.toThrowError();
    });
  });

  describe('Request Methods', () => {
    interface TestData {
      id: number;
      name: string;
    }

    it('should handle POST requests with JSON data', async () => {
      const data: TestData = { id: 1, name: 'test' };
      const response = await api.post<TestData>('/test', data);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(expect.objectContaining(data));
    });

    it('should handle PUT requests', async () => {
      const data: TestData = { id: 1, name: 'updated' };
      const response = await api.put<TestData>('/test/1', data);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(expect.objectContaining(data));
    });

    it('should handle DELETE requests', async () => {
      const response = await api.delete('/test/1');
      expect(response.status).toBe(200);
    });

    it('should handle query parameters', async () => {
      const response = await api.get('/test', {
        query: { filter: 'active', sort: 'desc' }
      });

      expect(response.status).toBe(200);
    });
  });

  describe('Content Types', () => {
    it('should handle JSON responses', async () => {
      const response = await api.get('/api/json');
      expect(response.headers.get('content-type')).toContain('application/json');
    });

    it('should handle form data submissions', async () => {
      const formData = new FormData();
      formData.append('file', new Blob(['test'], { type: 'text/plain' }));

      const response = await api.post('/api/upload', formData);
      expect(response.status).toBe(200);
    });
  });
});
