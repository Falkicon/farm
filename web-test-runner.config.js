/**
 * @fileoverview Web Test Runner configuration for running browser-based tests
 * This configuration sets up the test environment using Playwright to run tests in real browsers
 */

// Import the Playwright launcher which enables running tests in real browser environments
import { playwrightLauncher } from '@web/test-runner-playwright';
import { esbuildPlugin } from '@web/dev-server-esbuild';

/**
 * @type {import('@web/test-runner').TestRunnerConfig}
 */
export default {
    /**
     * File patterns to include in test runs
     * Matches any .test.ts files in the src directory and its subdirectories
     * @type {string}
     */
    files: 'src/**/*.test.ts',

    /**
     * Enable Node.js module resolution
     * Allows importing npm packages and local modules in test files
     * @type {boolean}
     */
    nodeResolve: true,

    /**
     * Browser configurations for running tests
     * Tests will run in parallel across all specified browsers
     * @type {import('@web/test-runner').BrowserLauncher[]}
     */
    browsers: [
        // Chrome/Edge (Chromium-based browsers)
        playwrightLauncher({ product: 'chromium' }),
        // Firefox
        playwrightLauncher({ product: 'firefox' }),
        // Safari (WebKit-based browsers)
        playwrightLauncher({ product: 'webkit' })
    ],

    /**
     * Test framework configuration options
     * @type {object}
     */
    testFramework: {
        /**
         * Configuration options passed to the test framework
         * @type {object}
         */
        config: {
            /**
             * Test interface style
             * 'tdd' provides describe, it, before, after, etc.
             * @type {string}
             */
            ui: 'tdd',

            /**
             * Global timeout for individual tests in milliseconds
             * Tests that take longer than this will fail
             * @type {string}
             */
            timeout: '2000',

            rootHooks: {
                beforeEach: ['import "@open-wc/testing"']
            }
        }
    },

    plugins: [
        esbuildPlugin({ ts: true })
    ],

    testRunnerHtml: testFramework => `
        <html>
            <head>
                <script type="module">
                    // Import test helpers
                    import "@open-wc/testing";
                </script>
            </head>
            <body>
                <script type="module" src="${testFramework}"></script>
            </body>
        </html>
    `
};
