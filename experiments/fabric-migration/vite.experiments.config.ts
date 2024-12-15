import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  base: '/experiments/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@experiments': resolve(__dirname, './src/experiments'),
      '@utils': resolve(__dirname, './src/utils'),
      '@test': resolve(__dirname, './src/test')
    }
  },
  build: {
    sourcemap: true,
    target: 'esnext',
    outDir: 'dist/experiments',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/experiments/index.html'),
        components: resolve(__dirname, 'src/experiments/components/index.html'),
        integration: resolve(__dirname, 'src/experiments/integration/index.html'),
        themes: resolve(__dirname, 'src/experiments/themes/index.html'),
        performance: resolve(__dirname, 'src/experiments/performance/index.html'),
        accessibility: resolve(__dirname, 'src/experiments/accessibility/index.html')
      },
      output: {
        manualChunks: {
          'fabric-web': ['@fabric-msft/fabric-web'],
          'fluent-web': ['@fluentui/web-components'],
          'fast-element': ['@microsoft/fast-element'],
          'shared': ['./src/utils/**/*.ts']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    minify: true,
    reportCompressedSize: true
  },
  server: {
    port: 3001,
    open: true,
    host: true
  },
  preview: {
    port: 3001,
    open: true,
    host: true
  }
});
