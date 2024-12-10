import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env files
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

// Environment variable schema
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(8000),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),

  // Database
  DATABASE_URL: z.string().url(),
  TEST_DATABASE_URL: z.string().url().optional(),

  // Security
  CORS_ORIGINS: z.string().transform(str => str.split(',')),

  // Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('debug'),
  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Export typed environment configuration
export const config = {
  isDevelopment: env.NODE_ENV === 'development',
  isTest: env.NODE_ENV === 'test',
  isProduction: env.NODE_ENV === 'production',

  app: {
    port: env.PORT,
    frontendUrl: env.FRONTEND_URL,
  },

  database: {
    url: env.NODE_ENV === 'test' && env.TEST_DATABASE_URL
      ? env.TEST_DATABASE_URL
      : env.DATABASE_URL,
  },

  security: {
    corsOrigins: env.CORS_ORIGINS,
  },

  logging: {
    level: env.LOG_LEVEL,
    format: env.LOG_FORMAT,
  },
} as const;
