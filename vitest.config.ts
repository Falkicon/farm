// Import Vitest's configuration utility
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        // Enable global test APIs without importing them
        // This allows using describe, it, expect etc. directly
        globals: true,

        // Use jsdom as the test environment
        // This simulates a browser-like environment for DOM testing
        environment: 'jsdom',

        // Specify setup files that run before each test
        // These can contain global setup logic, custom matchers, etc.
        setupFiles: ['./src/frontend/shared/testing/setup.ts'],

        // Pattern for test files to include
        // Will run all .test.ts files under the src directory
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        // Pattern for test files to exclude
        // Will exclude all files under node_modules, dist, and e2e directories
        exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**'],

        // Coverage configuration
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'test/',
                '**/*.test.ts',
                '**/*.d.ts'
            ]
        },

        // Dependencies configuration
        deps: {
            inline: [/lit/, /@lit/, /@open-wc/]
        },

        // Test timeout configuration
        testTimeout: 10000,
        hookTimeout: 10000
    },
    resolve: {
        alias: {
            '/src': resolve(__dirname, 'src')
        }
    },
    define: {
        'process.env.NODE_ENV': '"test"',
        'process.env.TEST': 'true'
    }
});
