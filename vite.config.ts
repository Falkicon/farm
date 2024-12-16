/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/frontend',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  }
});
