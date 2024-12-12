import { PrismaClient, Prisma } from '@prisma/client';
import { config } from './environment';

/**
 * Prisma logger configuration
 * Defines which log levels to emit and where
 *
 * @group Database
 * @category Configuration
 */
const logConfig: Prisma.LogDefinition[] = [
  {
    level: 'error',
    emit: 'stdout',
  },
  {
    level: 'warn',
    emit: 'stdout',
  },
];

/**
 * Prisma client configuration options
 * Includes database connection and logging settings
 *
 * @group Database
 * @category Configuration
 */
const prismaClientOptions: Prisma.PrismaClientOptions = {
  datasources: {
    db: {
      url: config.database.url,
    },
  },
  log: logConfig,
};

// Add SSL configuration for production
if (config.isProduction && prismaClientOptions.datasources?.db) {
  prismaClientOptions.datasources.db = {
    url: config.database.url,
    ssl: {
      rejectUnauthorized: false,
    },
  } as Prisma.Datasources['db'];
}

/**
 * Configured Prisma client instance
 * Provides type-safe database access with proper configuration
 *
 * @group Database
 * @category Services
 *
 * @example
 * ```ts
 * // Query users with type safety
 * const users = await prisma.user.findMany({
 *   where: { role: 'admin' },
 *   select: { id: true, name: true }
 * });
 *
 * // Create a new record
 * const user = await prisma.user.create({
 *   data: {
 *     email: 'user@example.com',
 *     name: 'New User'
 *   }
 * });
 * ```
 *
 * @remarks
 * Features:
 * - Configured with proper logging levels
 * - SSL enabled in production
 * - Automatic connection management
 * - Graceful shutdown handling
 */
export const prisma = new PrismaClient(prismaClientOptions);

/**
 * Graceful shutdown handler
 * Ensures database connections are properly closed
 *
 * @group Database
 * @category Lifecycle
 */
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
