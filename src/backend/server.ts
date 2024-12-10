import fastify from 'fastify';
import cors from '@fastify/cors';
import healthRoutes from './routes/health';

const server = fastify({
  logger: true
});

// Configure CORS for development
await server.register(cors, {
  origin: process.env.NODE_ENV === 'production'
    ? false  // Disable CORS in production since we'll be serving from same origin
    : ['http://localhost:3000', 'http://localhost:3001']  // Allow both possible dev ports
});

// Register routes
await server.register(healthRoutes);

// Start server
try {
  await server.listen({ port: 8000, host: '0.0.0.0' });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
