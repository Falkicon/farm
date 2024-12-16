import '@open-wc/testing-helpers';
import { afterEach } from 'vitest';

// Clean up after each test
afterEach(async () => {
    // Remove any fixtures created during tests
    const fixtureContainer = document.getElementById('fixture');
    if (fixtureContainer) {
        document.body.removeChild(fixtureContainer);
    }
});
