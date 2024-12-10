import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { registerHealthRoute } from './routes/health';
import { config } from './config/environment';

// Create Fastify instance with pretty logging
const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname,reqId',
                messageFormat: '{msg}',
                colorize: true,
                singleLine: true,
                level: config.logging.level
            }
        }
    }
});

// Register plugins
server.register(cors, {
    origin: config.security.corsOrigins,
    credentials: true
});
server.register(helmet);

// Register routes
registerHealthRoute(server);

// Log registered routes in a cleaner format
const routeTree = server.printRoutes()
    .replace(/[├─│]/g, '|')
    .replace(/[└]/g, '+')
    .split('\n')
    .map(line => '  ' + line.trim())
    .join('\n');

console.log('\n[API] Available Routes:');
console.log(routeTree);

// Start server
const start = async () => {
    try {
        await server.listen({
            port: config.app.port,
            host: '0.0.0.0'
        });

        // Wait a moment for frontend to start
        setTimeout(() => {
            const divider = '='.repeat(60);
            console.log('\n' + divider);
            console.log('[DEVELOPMENT SERVERS]');
            console.log(divider);
            console.log('\n[FRONTEND]');
            console.log(`  App:      ${config.app.frontendUrl}`);
            console.log('\n[BACKEND]');
            console.log(`  API:      http://localhost:${config.app.port}/api`);
            console.log(`  Health:   http://localhost:${config.app.port}/api/health`);
            console.log(`  Docs:     http://localhost:8080 (when running 'npm run docs')`);
            console.log('\n' + divider);
            console.log('[STATUS] All services running. Press Ctrl+C to stop');
            console.log(divider + '\n');
        }, 1000); // Wait 1s for frontend to initialize

    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
