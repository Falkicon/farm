/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
        'src/test/**/*',
        'src/**/*.d.ts'
      ]
    },
    deps: {
      inline: [
        '@fabric-msft/fabric-web',
        '@fabric-msft/theme',
        '@fluentui/web-components',
        '@microsoft/fast-element'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@experiments': resolve(__dirname, './src/experiments'),
      '@utils': resolve(__dirname, './src/utils'),
      '@test': resolve(__dirname, './src/test')
    }
  }
});
