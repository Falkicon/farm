import { defineConfig, loadEnv } from 'vite';

// Vite configuration using the defineConfig helper for better TypeScript support
export default defineConfig(({ mode }) => {
  // Load env files based on mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Project root directory
    root: '.',

    // Build configuration
    build: {
      outDir: 'dist/frontend',
    },

    // Development server configuration
    server: {
      port: parseInt(env.VITE_DEV_SERVER_PORT || '3000'),
      host: env.VITE_DEV_SERVER_HOST || 'localhost',
    },

    // Path resolution configuration
    resolve: {
      alias: {
        '@': '/src'
      }
    },

    // Environment variable configuration
    envPrefix: 'VITE_', // Only expose VITE_ prefixed env variables to client
  };
});
