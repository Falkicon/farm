import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src',
    testMatch: '**/*.spec.ts',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
    },

    webServer: {
        command: 'vite --config vite.config.test.ts',
        port: 3000,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'components',
            testMatch: '**/*.component.spec.ts',
            use: {
                viewport: { width: 500, height: 500 },
            },
        },
    ],
});
