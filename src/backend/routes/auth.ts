import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

/** JWT secret key for token signing and verification */
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Error response interface
 */
interface ErrorResponse {
  statusCode: number;
  message: string;
}

/**
 * JWT payload interface for authentication tokens
 */
interface JWTPayload {
  /** User's unique identifier */
  userId: string;
  /** User's role in the system */
  role: string;
  /** User's email address */
  email: string;
}

/**
 * Login request interface
 */
interface LoginRequest {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
}

/**
 * Token response interface
 */
interface TokenResponse {
  /** JWT token for authentication */
  token: string;
}

/**
 * Success response interface
 */
interface SuccessResponse {
  /** Operation success status */
  success: boolean;
}

/**
 * Registers authentication routes for the application.
 * Handles user login, logout, and token refresh operations.
 *
 * @group Authentication
 * @category Routes
 *
 * @example
 * ```typescript
 * // Register auth routes
 * await fastify.register(registerAuthRoutes);
 *
 * // Login example
 * const response = await fetch('/auth/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     email: 'user@example.com',
 *     password: 'password123'
 *   })
 * });
 * const { token } = await response.json();
 * ```
 *
 * @param fastify - The Fastify instance to register routes with
 */
export async function registerAuthRoutes(fastify: FastifyInstance): Promise<void> {
  /**
   * User login endpoint
   *
   * @name POST /auth/login
   * @summary Authenticate user
   * @description Authenticates a user with email and password,
   * returning a JWT token for subsequent requests.
   *
   * @param {object} body - Login credentials
   * @param {string} body.email - User's email address
   * @param {string} body.password - User's password (min 6 characters)
   * @throws {ErrorResponse} 401 - If credentials are invalid
   * @returns {TokenResponse} JWT token for authentication
   *
   * @example
   * ```typescript
   * const response = await fetch('/auth/login', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({
   *     email: 'user@example.com',
   *     password: 'password123'
   *   })
   * });
   *
   * if (response.ok) {
   *   const { token } = await response.json();
   *   // Store token for future requests
   *   localStorage.setItem('authToken', token);
   * }
   * ```
   */
  fastify.post<{ Body: LoginRequest; Reply: TokenResponse }>(
    '/auth/login',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          401: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request): Promise<TokenResponse> => {
      const { email, password } = request.body;

      // TODO: Implement actual user authentication
      // This is just a mock implementation
      if (email === 'test@example.com' && password === 'password123') {
        const payload: JWTPayload = { userId: '1', role: 'user', email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return { token };
      }

      throw { statusCode: 401, message: 'Invalid credentials' } as ErrorResponse;
    },
  );

  /**
   * User logout endpoint
   *
   * @name POST /auth/logout
   * @summary Logout user
   * @description Logs out the current user. Currently just returns success
   * as token invalidation is not implemented.
   *
   * @returns {SuccessResponse} Logout confirmation
   *
   * @example
   * ```typescript
   * const response = await fetch('/auth/logout', {
   *   method: 'POST',
   *   headers: {
   *     'Authorization': `Bearer ${token}`
   *   }
   * });
   *
   * if (response.ok) {
   *   // Clear stored token
   *   localStorage.removeItem('authToken');
   * }
   * ```
   */
  fastify.post<{ Reply: SuccessResponse }>(
    '/auth/logout',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
            },
          },
        },
      },
    },
    async (): Promise<SuccessResponse> => {
      // TODO: Implement token invalidation
      return { success: true };
    },
  );

  /**
   * Token refresh endpoint
   *
   * @name POST /auth/refresh
   * @summary Refresh authentication token
   * @description Issues a new JWT token using a valid existing token.
   * Used to extend the session without requiring re-authentication.
   *
   * @throws {ErrorResponse} 401 - If no token is provided or token is invalid
   * @returns {TokenResponse} New JWT token
   *
   * @example
   * ```typescript
   * const response = await fetch('/auth/refresh', {
   *   method: 'POST',
   *   headers: {
   *     'Authorization': `Bearer ${currentToken}`
   *   }
   * });
   *
   * if (response.ok) {
   *   const { token } = await response.json();
   *   // Update stored token
   *   localStorage.setItem('authToken', token);
   * }
   * ```
   */
  fastify.post<{ Reply: TokenResponse }>(
    '/auth/refresh',
    {
      schema: {
        headers: {
          type: 'object',
          required: ['authorization'],
          properties: {
            authorization: { type: 'string', pattern: '^Bearer ' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          },
          401: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request): Promise<TokenResponse> => {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        throw { statusCode: 401, message: 'No token provided' } as ErrorResponse;
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        const newToken = jwt.sign(decoded, JWT_SECRET, { expiresIn: '1h' });
        return { token: newToken };
      } catch (error) {
        throw {
          statusCode: 401,
          message: error instanceof Error ? error.message : 'Invalid token',
        } as ErrorResponse;
      }
    },
  );
}
