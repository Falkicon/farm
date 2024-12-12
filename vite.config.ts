import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@frontend': resolve(__dirname, 'src/frontend'),
      '@backend': resolve(__dirname, 'src/backend')
    }
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
        manualChunks: {
          lit: ['lit', 'lit/decorators.js'],
        }
      },
      external: ['@backend/*']
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  optimizeDeps: {
    exclude: ['@backend/*'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  ssr: {
    noExternal: true
  },
  esbuild: {
    lineLimit: 80,
    format: 'esm',
    target: 'esnext',
    charset: 'utf8',
    legalComments: 'none',
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
    // Only enable Lit dev mode in development
    ...(mode === 'development'
      ? {
          'globalThis.litIssuedWarnings': 'new Set()',
          'window.litIssuedWarnings': 'new Set()'
        }
      : {
          'globalThis.litIssuedWarnings': 'undefined',
          'window.litIssuedWarnings': 'undefined'
        }
    )
  }
}));
