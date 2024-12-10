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
                        timestamp: { type: 'string' }
                    }
                }
            }
        }
    }, async (_request, _reply) => {
        const response = {
            status: 'ok',
            version,
            timestamp: new Date().toISOString()
        };

        server.log.info('[HEALTH] Check OK');
        return response;
    });

    server.log.info('[ROUTE] Registered: /api/health');
}
