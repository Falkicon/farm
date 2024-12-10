import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { registerHealthRoute } from './routes/health';

const server = fastify({
  logger: true
});

server.register(cors, {
  origin: true,
  credentials: true
});
server.register(helmet);

// Register routes
registerHealthRoute(server);

export default server;
