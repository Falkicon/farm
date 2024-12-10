import { PrismaClient, Prisma } from '@prisma/client';
import { config } from './environment';

// Define logger configuration
const logConfig: Prisma.LogDefinition[] = [
    {
        level: 'error',
        emit: 'stdout',
    },
    {
        level: 'warn',
        emit: 'stdout',
    }
];

const prismaClientOptions: Prisma.PrismaClientOptions = {
    datasources: {
        db: {
            url: config.database.url
        }
    },
    log: logConfig
};

// Add SSL configuration for production
if (config.isProduction && prismaClientOptions.datasources?.db) {
    prismaClientOptions.datasources.db = {
        url: config.database.url,
        ssl: {
            rejectUnauthorized: false
        }
    } as Prisma.Datasources['db'];
}

export const prisma = new PrismaClient(prismaClientOptions);

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
