import { FastifyRequest, FastifyReply } from 'fastify';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // requests per window

export async function rateLimiter(request: FastifyRequest, reply: FastifyReply) {
  const ip = request.ip;
  const now = Date.now();

  // Clean up expired entries
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }

  // Initialize or get existing record
  if (!store[ip] || store[ip].resetTime < now) {
    store[ip] = {
      count: 0,
      resetTime: now + WINDOW_MS
    };
  }

  // Increment request count
  store[ip].count++;

  // Set rate limit headers
  reply.header('X-RateLimit-Limit', MAX_REQUESTS);
  reply.header('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - store[ip].count));
  reply.header('X-RateLimit-Reset', store[ip].resetTime);

  // Check if rate limit exceeded
  if (store[ip].count > MAX_REQUESTS) {
    return reply.status(429).send({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please try again later.'
    });
  }
}
