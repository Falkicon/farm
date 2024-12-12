/**
 * Authentication middleware implementation
 * @module backend/middleware
 */

import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

/** JWT secret key for token verification */
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * JWT payload interface for decoded tokens
 * @category Authentication
 */
interface JWTPayload {
  /** User's unique identifier */
  userId: string;
  /** User's role in the system */
  role: string;
  /** Additional custom claims */
  [key: string]: unknown;
}

/**
 * Authentication middleware for protecting routes
 * Verifies JWT tokens and adds user information to the request
 *
 * @category Authentication
 *
 * @example
 * ```ts
 * // Apply to a single route
 * fastify.get('/protected', {
 *   preHandler: authenticate
 * }, async (request) => {
 *   // Access user info
 *   console.log('User ID:', request.user?.userId);
 *   return { message: 'Protected route' };
 * });
 *
 * // Apply to all routes in a plugin
 * fastify.addHook('preHandler', authenticate);
 * ```
 *
 * @throws {Error} 401 - No authorization header
 * @throws {Error} 401 - No token provided
 * @throws {Error} 401 - Invalid token
 * @throws {Error} 401 - Token expired
 *
 * @param request - Fastify request object
 */
export async function authenticate(request: FastifyRequest): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw { statusCode: 401, message: 'No authorization header' };
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw { statusCode: 401, message: 'No token provided' };
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Add user info to request
    request.user = decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid token',
      };
    }

    if (error instanceof jwt.TokenExpiredError) {
      throw {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Token expired',
      };
    }

    throw error;
  }
}

/**
 * Type declaration merging for Fastify request
 * Adds user property to request object
 *
 * @category Authentication
 */
declare module 'fastify' {
  interface FastifyRequest {
    /** Authenticated user information */
    user?: JWTPayload;
  }
}
