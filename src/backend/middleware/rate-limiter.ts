import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Rate limit tracking store interface
 * @group Rate Limiting
 * @category Types
 */
interface RateLimitStore {
  /** IP address as key */
  [key: string]: {
    /** Number of requests made in current window */
    count: number;
    /** Timestamp when the current window resets */
    resetTime: number;
  };
}

/**
 * Rate limit error response interface
 * @group Rate Limiting
 * @category Types
 */
interface RateLimitError {
  /** HTTP status code */
  statusCode: number;
  /** Error type */
  error: string;
  /** Error message */
  message: string;
}

/** In-memory store for rate limit tracking */
const store: RateLimitStore = {};

/** Time window for rate limiting in milliseconds */
const WINDOW_MS = 60 * 1000; // 1 minute

/** Maximum number of requests allowed per window */
const MAX_REQUESTS = 100; // requests per window

/**
 * Rate limiting middleware to prevent abuse
 * Limits requests based on IP address using a sliding window
 *
 * @group Rate Limiting
 * @category Middleware
 *
 * @example
 * ```ts
 * // Apply to a single route
 * fastify.get('/api', {
 *   preHandler: rateLimiter
 * }, async () => {
 *   return { message: 'Rate limited endpoint' };
 * });
 *
 * // Apply to all routes
 * fastify.addHook('preHandler', rateLimiter);
 * ```
 *
 * @remarks
 * Rate limit information is returned in headers:
 * - `X-RateLimit-Limit`: Maximum requests allowed per window
 * - `X-RateLimit-Remaining`: Remaining requests in current window
 * - `X-RateLimit-Reset`: Timestamp when the current window resets
 *
 * @throws {RateLimitError} 429 - When rate limit is exceeded
 *
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 */
export async function rateLimiter(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const ip = request.ip;
  const now = Date.now();

  // Clean up expired entries
  cleanupExpiredEntries(now);

  // Initialize or get existing record
  initializeRateLimit(ip, now);

  // Increment request count
  store[ip].count++;

  // Set rate limit headers
  setRateLimitHeaders(reply, store[ip].count, store[ip].resetTime);

  // Check if rate limit exceeded
  if (store[ip].count > MAX_REQUESTS) {
    const error: RateLimitError = {
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.'
    };
    throw error;
  }
}

/**
 * Clean up expired rate limit entries
 * @param now - Current timestamp
 */
function cleanupExpiredEntries(now: number): void {
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
}

/**
 * Initialize or reset rate limit for an IP
 * @param ip - Client IP address
 * @param now - Current timestamp
 */
function initializeRateLimit(ip: string, now: number): void {
  if (!store[ip] || store[ip].resetTime < now) {
    store[ip] = {
      count: 0,
      resetTime: now + WINDOW_MS
    };
  }
}

/**
 * Set rate limit headers on the response
 * @param reply - Fastify reply object
 * @param count - Current request count
 * @param resetTime - Window reset timestamp
 */
function setRateLimitHeaders(reply: FastifyReply, count: number, resetTime: number): void {
  reply.header('X-RateLimit-Limit', MAX_REQUESTS);
  reply.header('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - count));
  reply.header('X-RateLimit-Reset', resetTime);
}
