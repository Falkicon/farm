// Import the Playwright launcher which enables running tests in real browser environments
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
    // Define which files should be included in the test run
    // This will match any .test.ts files in the src directory and its subdirectories
    files: 'src/**/*.test.ts',

    // Enable Node.js module resolution
    // This allows importing npm packages and local modules in test files
    nodeResolve: true,

    // Configure which browsers to run tests in
    // Tests will run in parallel across all specified browsers
    browsers: [
        playwrightLauncher({ product: 'chromium' }), // Chrome/Edge
        playwrightLauncher({ product: 'firefox' }),  // Firefox
        playwrightLauncher({ product: 'webkit' })    // Safari
    ],

    // Test framework configuration
    testFramework: {
        config: {
            // Use TDD interface (describe, it, before, after, etc.)
            ui: 'tdd',

            // Set global timeout for tests (2000ms)
            // Tests that take longer than this will fail
            timeout: '2000'
        }
    }
}; 