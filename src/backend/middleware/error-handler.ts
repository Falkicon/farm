import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

interface CustomError extends FastifyError {
  statusCode?: number;
  validation?: any[];
}

export const errorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  request.log.error(error);

  const customError = error as CustomError;

  // Handle validation errors
  if (customError.validation) {
    await reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation error',
      details: customError.validation
    });
    return;
  }

  // Handle known errors
  if (customError.statusCode) {
    await reply.status(customError.statusCode).send({
      statusCode: customError.statusCode,
      error: error.name,
      message: error.message
    });
    return;
  }

  // Handle unknown errors
  await reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
}
