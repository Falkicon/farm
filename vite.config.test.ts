import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src')
    }
  },
  build: {
    sourcemap: true,
    target: 'esnext'
  },
  plugins: [],
  optimizeDeps: {
    include: ['lit', 'lit/decorators.js']
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  }
});
