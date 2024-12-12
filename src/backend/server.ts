import fastify, { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import { healthRoutes } from './routes/health';
import { registerAuthRoutes } from './routes/auth';
import { registerUserRoutes } from './routes/users';
import { registerFileRoutes } from './routes/files';
import { metricsRoutes } from './routes/metrics';
import { errorHandler } from './middleware/error-handler';
import { requestValidator } from './middleware/request-validator';
import { rateLimiter } from './middleware/rate-limiter';
import { authenticate } from './middleware/authenticate';
import { Server, IncomingMessage, ServerResponse } from 'http';

const server = fastify<Server, IncomingMessage, ServerResponse>({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
        messageFormat: '{msg}',
        errorLikeObjectKeys: ['err', 'error'],
        levelFirst: true,
      },
    },
  },
  disableRequestLogging: false,
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

// Register plugins
server.register(fastifyCors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

server.register(fastifyHelmet, {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
});

server.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100,
    fieldSize: 100,
    fields: 10,
    fileSize: 1000000,
    files: 1,
    headerPairs: 2000,
  },
});

// Register global middleware
server.addHook('preHandler', rateLimiter);
server.addHook('preHandler', requestValidator);

// Add request logging
server.addHook('onRequest', async (request) => {
  request.log.info(
    {
      url: request.url,
      method: request.method,
      id: request.id,
    },
    'Incoming request'
  );
});

server.addHook('onResponse', async (request, reply) => {
  request.log.info(
    {
      url: request.url,
      method: request.method,
      statusCode: reply.statusCode,
      elapsed: reply.elapsedTime,
    },
    'Request completed'
  );
});

// Register error handler
server.setErrorHandler(errorHandler);

// Register public routes
server.register(
  async function publicRoutes(fastify: FastifyInstance) {
    // Register health check route
    healthRoutes(fastify);
  },
  { prefix: '' }
); // Empty prefix for root-level routes

// Register API routes
server.register(
  async function apiRoutes(fastify: FastifyInstance) {
    // Register metrics routes (unprotected)
    await metricsRoutes(fastify);

    // Protected routes
    fastify.register(async function protectedRoutes(fastify: FastifyInstance) {
      // Add authentication to all routes in this context
      fastify.addHook('preHandler', authenticate);

      // Register protected route handlers
      await registerAuthRoutes(fastify);
      await registerUserRoutes(fastify);
      await registerFileRoutes(fastify);
    });
  },
  { prefix: '/api' }
);

export default server;
