import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    // Test files location and pattern
    testDir: './src',
    testMatch: '**/*.spec.ts',

    // Parallel execution settings
    fullyParallel: true, // Run tests in parallel
    forbidOnly: !!process.env.CI, // Fail if test.only is left in code in CI
    workers: process.env.CI ? 1 : undefined, // Use single worker in CI

    // Test reporting
    reporter: 'html', // Generate HTML test reports

    // Global test configuration
    use: {
        baseURL: 'http://localhost:3000', // Base URL for all tests
        trace: 'on-first-retry', // Capture trace on first retry of failed test
    },

    // Test projects configuration
    projects: [
        {
            name: 'chromium', // Chrome browser tests
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'components', // Component-specific tests
            testMatch: '**/*.component.spec.ts',
            use: {
                viewport: { width: 500, height: 500 }, // Fixed viewport for component tests
            },
        },
    ],

    // Development server configuration
    webServer: {
        command: 'npm run dev', // Command to start dev server
        port: 3000, // Port to wait for
        reuseExistingServer: !process.env.CI, // Reuse server in dev, not in CI
    },
}); 