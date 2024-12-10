import { defineConfig } from 'vite';

// Vite configuration using the defineConfig helper for better TypeScript support
export default defineConfig({
  // Project root directory
  // '.' means the current directory where vite.config.ts is located
  root: '.',

  // Build configuration
  build: {
    // Output directory for production build
    // Will create the production build in dist/frontend
    outDir: 'dist/frontend',
  },

  // Development server configuration
  server: {
    // Dev server will run on port 3000
    // Matches the configuration in custom_instructions
    port: 3000,
  },

  // Path resolution configuration
  resolve: {
    alias: {
      // Creates an alias for the src directory
      // Allows imports like: import Component from '@/components/Component'
      // instead of relative paths like: import Component from '../../../components/Component'
      '@': '/src'
    }
  }
}); 