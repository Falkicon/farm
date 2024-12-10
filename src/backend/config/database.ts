// This file is temporarily disabled until database features are needed
/*
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prismaClientOptions = {
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    },
    log: ['error', 'warn'],
    connectionTimeout: 20000,
};

if (process.env.NODE_ENV !== 'development') {
    prismaClientOptions.datasources.db = {
        url: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
}

export const prisma = new PrismaClient(prismaClientOptions);

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
*/ 