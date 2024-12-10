import { FastifyInstance } from 'fastify';
// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient | null = null;

// try {
//     prisma = new PrismaClient();
// } catch (e) {
//     console.warn('Prisma client not initialized - database checks will be disabled');
// }

export default async function healthRoutes(fastify: FastifyInstance) {
    fastify.get('/api/health', async () => {
        // let databaseStatus = 'disconnected';

        // if (prisma) {
        //     try {
        //         await prisma.$queryRaw`SELECT 1`;
        //         databaseStatus = 'connected';
        //     } catch (e) {
        //         console.error('Database health check failed:', e);
        //     }
        // }

        return {
            status: 'ok',
            // database: databaseStatus,
            version: process.env.npm_package_version || '0.0.1',
            timestamp: new Date().toISOString()
        };
    });
} 