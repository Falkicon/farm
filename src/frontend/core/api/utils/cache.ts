import { APIResponse } from '../types';

interface CacheEntry<T> {
  data: APIResponse<T>;
  timestamp: number;
  expiresAt: number;
}

export class APICache {
  private static instance: APICache;
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  static getInstance(): APICache {
    if (!APICache.instance) {
      APICache.instance = new APICache();
    }
    return APICache.instance;
  }

  set<T>(key: string, data: APIResponse<T>, ttl: number = this.defaultTTL): void {
    const timestamp = Date.now();
    const expiresAt = timestamp + ttl;

    this.cache.set(key, {
      data,
      timestamp,
      expiresAt,
    });
  }

  get<T>(key: string): APIResponse<T> | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  setDefaultTTL(ttl: number): void {
    this.defaultTTL = ttl;
  }

  getCacheKey(endpoint: string, params?: Record<string, unknown>): string {
    const queryString = params
      ? new URLSearchParams(params as Record<string, string>).toString()
      : '';
    return `${endpoint}${queryString ? `?${queryString}` : ''}`;
  }
}
