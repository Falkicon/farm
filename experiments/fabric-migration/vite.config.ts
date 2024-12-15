import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@experiments': resolve(__dirname, './src/experiments'),
      '@utils': resolve(__dirname, './src/utils'),
      '@docs': resolve(__dirname, './docs')
    }
  },
  build: {
    sourcemap: true,
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        experiments: resolve(__dirname, 'src/experiments/index.html')
      },
      output: {
        manualChunks: {
          'fabric-web': ['@fabric-msft/fabric-web'],
          'fluent-web': ['@fluentui/web-components'],
          'fast-element': ['@microsoft/fast-element']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    hmr: {
      overlay: true
    }
  },
  optimizeDeps: {
    include: [
      '@fabric-msft/fabric-web',
      '@fabric-msft/theme',
      '@fluentui/web-components',
      '@microsoft/fast-element'
    ]
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
});
