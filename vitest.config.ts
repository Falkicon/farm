// Import Vitest's configuration utility
import { defineConfig } from 'vitest/config';

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
        include: ['src/**/*.test.ts'],
    },
}); 