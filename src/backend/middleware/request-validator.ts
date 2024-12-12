import { FastifyRequest, FastifyReply } from 'fastify';

export async function requestValidator(request: FastifyRequest, reply: FastifyReply) {
  // Skip validation for health check endpoint
  if (request.url === '/health') {
    return;
  }

  // Validate Content-Type for POST/PUT/PATCH requests
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentType = request.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return reply.status(415).send({
        statusCode: 415,
        error: 'Unsupported Media Type',
        message: 'Content-Type must be application/json'
      });
    }
  }

  // Validate Accept header
  const accept = request.headers.accept;
  if (accept && !accept.includes('application/json') && !accept.includes('*/*')) {
    return reply.status(406).send({
      statusCode: 406,
      error: 'Not Acceptable',
      message: 'Only application/json is supported'
    });
  }
}
