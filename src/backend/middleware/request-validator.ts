import { FastifyRequest } from 'fastify';

/**
 * Request validation middleware for enforcing API standards
 * Validates Content-Type and Accept headers for proper API usage
 *
 * @group Request Validation
 * @category Middleware
 *
 * @example
 * ```ts
 * // Apply to a single route
 * fastify.post('/api', {
 *   preHandler: requestValidator
 * }, async () => {
 *   return { message: 'Validated request' };
 * });
 *
 * // Apply to all routes
 * fastify.addHook('preHandler', requestValidator);
 * ```
 *
 * @remarks
 * Validation rules:
 * - POST/PUT/PATCH requests must have `Content-Type: application/json`
 * - Accept header must include `application/json` or wildcard
 * - Health check endpoint (/health) is exempt from validation
 *
 * @throws {Error} 415 - If Content-Type is not application/json for POST/PUT/PATCH
 * @throws {Error} 406 - If Accept header doesn't allow application/json
 *
 * @param request - Fastify request object
 */
export async function requestValidator(request: FastifyRequest): Promise<void> {
  // Skip validation for health check endpoint
  if (request.url === '/health') {
    return;
  }

  // Validate Content-Type for POST/PUT/PATCH requests
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentType = request.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      throw {
        statusCode: 415,
        error: 'Unsupported Media Type',
        message: 'Content-Type must be application/json'
      };
    }
  }

  // Validate Accept header (application/json or wildcard)
  const accept = request.headers.accept;
  if (accept && !accept.includes('application/json') && !accept.includes('*/*')) {
    throw {
      statusCode: 406,
      error: 'Not Acceptable',
      message: 'Only application/json is supported'
    };
  }
}
