/**
 * @packageDocumentation
 * Backend middleware components for request processing, authentication, and security
 * @module backend/middleware
 */

/**
 * Authentication middleware for protecting routes
 * @category Authentication
 */
export * from './authenticate';

/**
 * Error handling middleware for consistent error responses
 * @category Error Handling
 */
export * from './error-handler';

/**
 * Rate limiting middleware for API protection
 * @category Security
 */
export * from './rate-limiter';

/**
 * Request validation middleware for enforcing API standards
 * @category Validation
 */
export * from './request-validator';
