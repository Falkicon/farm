/**
 * Error handling middleware implementation
 * @module backend/middleware
 */

import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

/**
 * Extended error interface for custom error handling
 * @category Error Handling
 */
interface CustomError extends FastifyError {
  /** HTTP status code for the error */
  statusCode?: number;
  /** Validation error details */
  validation?: any[];
}

/**
 * Global error handler middleware for consistent error responses
 * Handles validation errors, known errors, and unexpected errors
 *
 * @category Error Handling
 *
 * @example
 * ```ts
 * // Register error handler
 * fastify.setErrorHandler(errorHandler);
 *
 * // Errors will be handled consistently
 * fastify.get('/example', async () => {
 *   throw {
 *     statusCode: 400,
 *     message: 'Bad request'
 *   };
 * });
 * ```
 *
 * @remarks
 * Error responses follow this format:
 * ```ts
 * {
 *   statusCode: number;  // HTTP status code
 *   error: string;      // Error name/type
 *   message: string;    // Error message
 *   details?: any[];    // Optional validation details
 * }
 * ```
 *
 * @param error - The error object to handle
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 */
export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  // Log all errors
  request.log.error(error);

  const customError = error as CustomError;

  // Handle validation errors (400 Bad Request)
  if (customError.validation) {
    await reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation error',
      details: customError.validation
    });
    return;
  }

  // Handle known errors (with status code)
  if (customError.statusCode) {
    await reply.status(customError.statusCode).send({
      statusCode: customError.statusCode,
      error: error.name,
      message: error.message
    });
    return;
  }

  // Handle unknown errors (500 Internal Server Error)
  await reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
}
