import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env files
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

/**
 * Environment variable schema for validation
 * Defines and validates all required environment variables
 *
 * @group Environment
 * @category Schema
 *
 * @remarks
 * Required variables:
 * - DATABASE_URL: Database connection string
 *
 * Optional variables with defaults:
 * - NODE_ENV: development, test, or production (default: development)
 * - PORT: Server port number (default: 8000)
 * - FRONTEND_URL: Frontend application URL (default: http://localhost:3000)
 * - LOG_LEVEL: debug, info, warn, error (default: debug)
 * - LOG_FORMAT: json or pretty (default: json)
 */
const envSchema = z.object({
  // Application
  /** Application environment (development, test, production) */
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  /** Backend server port */
  PORT: z.coerce.number().default(8000),
  /** Frontend application URL for CORS */
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),

  // Database
  /** Primary database connection URL */
  DATABASE_URL: z.string().url(),
  /** Test database connection URL (optional) */
  TEST_DATABASE_URL: z.string().url().optional(),

  // Security
  /** Allowed CORS origins (comma-separated) */
  CORS_ORIGINS: z.string().transform(str => str.split(',')),

  // Logging
  /** Application log level */
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('debug'),
  /** Log output format */
  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

/**
 * Typed environment configuration
 * Provides validated and transformed environment variables
 *
 * @group Environment
 * @category Configuration
 *
 * @example
 * ```ts
 * // Check environment
 * if (config.isDevelopment) {
 *   console.log('Running in development mode');
 * }
 *
 * // Access configuration
 * const serverPort = config.app.port;
 * const dbUrl = config.database.url;
 * const corsOrigins = config.security.corsOrigins;
 * ```
 *
 * @remarks
 * Features:
 * - Type-safe configuration access
 * - Environment-specific values
 * - Validated using Zod schema
 * - Immutable configuration object
 */
export const config = {
  /** Whether running in development mode */
  isDevelopment: env.NODE_ENV === 'development',
  /** Whether running in test mode */
  isTest: env.NODE_ENV === 'test',
  /** Whether running in production mode */
  isProduction: env.NODE_ENV === 'production',

  /** Application configuration */
  app: {
    /** Server port number */
    port: env.PORT,
    /** Frontend application URL */
    frontendUrl: env.FRONTEND_URL,
  },

  /** Database configuration */
  database: {
    /** Active database URL (uses TEST_DATABASE_URL in test environment if available) */
    url: env.NODE_ENV === 'test' && env.TEST_DATABASE_URL
      ? env.TEST_DATABASE_URL
      : env.DATABASE_URL,
  },

  /** Security configuration */
  security: {
    /** Allowed CORS origins */
    corsOrigins: env.CORS_ORIGINS,
  },

  /** Logging configuration */
  logging: {
    /** Log level (debug, info, warn, error) */
    level: env.LOG_LEVEL,
    /** Log format (json, pretty) */
    format: env.LOG_FORMAT,
  },
} as const;
