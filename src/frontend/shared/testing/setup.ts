import { expect, test } from '@playwright/test';

// Add custom matchers if needed
expect.extend({
    // Add custom matchers here
});

// Export test hooks for global usage
export const hooks = {
    beforeAll: test.beforeAll,
    afterAll: test.afterAll,
    beforeEach: test.beforeEach,
    afterEach: test.afterEach
};

// Make hooks available globally
Object.assign(global, hooks);