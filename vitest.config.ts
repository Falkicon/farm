// Import Vitest's configuration utility
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        // Enable global test APIs
        globals: true,

        // Use happy-dom for browser environment
        environment: 'happy-dom',

        // Setup files
        setupFiles: ['src/frontend/testing/setup/test-setup.ts'],

        // Test patterns - explicitly target unit tests
        include: [
            'src/frontend/**/*.spec.ts'
        ],
        exclude: [
            'node_modules/**',
            'dist/**',
            'e2e/**',
            '.storybook/**',
            'coverage/**',
            'src/tests/e2e/**'  // Explicitly exclude E2E tests
        ],

        // Coverage configuration
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/frontend/components/**/*.ts'],
            exclude: ['**/*.spec.ts', '**/testing/**']
        },

        // Dependencies configuration
        deps: {
            inline: [/@microsoft\/fast-element/, /@fabric-msft/, /@fluentui/]
        },

        // Test timeout
        testTimeout: 10000,
        hookTimeout: 10000
    },

    resolve: {
        alias: {
            '@frontend': resolve(__dirname, 'src/frontend'),
            '@shared': resolve(__dirname, 'src/shared'),
            '@tests': resolve(__dirname, 'src/frontend/shared/testing')
        }
    }
});
