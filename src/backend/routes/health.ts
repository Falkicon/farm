import { FastifyInstance } from 'fastify';
import { version } from '../../../package.json';

export function registerHealthRoute(server: FastifyInstance) {
    server.get('/api/health', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                        version: { type: 'string' },
                        timestamp: { type: 'string' },
                        database: {
                            type: 'object',
                            properties: {
                                connected: { type: 'boolean' },
                                latency: { type: 'number' },
                                configured: { type: 'boolean' }
                            }
                        },
                        connections: {
                            type: 'object',
                            properties: {
                                active: { type: 'number' }
                            }
                        },
                        memory: {
                            type: 'object',
                            properties: {
                                heapUsed: { type: 'number' },
                                heapTotal: { type: 'number' },
                                external: { type: 'number' }
                            }
                        },
                        environment: { type: 'string' },
                        nodeVersion: { type: 'string' }
                    }
                }
            }
        }
    }, async (_request, _reply) => {
        // Database status - currently no database is configured
        const dbStatus = {
            connected: false,
            latency: null,
            configured: false
        };

        // Get memory usage
        const memory = process.memoryUsage();

        const response = {
            status: 'ok',
            version,
            timestamp: new Date().toISOString(),
            database: dbStatus,
            connections: {
                active: server.server.connections
            },
            memory: {
                heapUsed: memory.heapUsed,
                heapTotal: memory.heapTotal,
                external: memory.external
            },
            environment: process.env.NODE_ENV || 'development',
            nodeVersion: process.version
        };

        server.log.info('[HEALTH] Check OK');
        return response;
    });

    server.log.info('[ROUTE] Registered: /api/health');
}
