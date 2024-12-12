import { expect, test } from '@playwright/test';
import { beforeAll, afterAll } from 'vitest';
import crossSpawn from 'cross-spawn';
import { waitForPort } from './utils.js';

let backendProcess: ReturnType<typeof crossSpawn>;

beforeAll(async () => {
  // Start backend server for tests
  const npmPath = process.platform === 'win32' ? 'npm.cmd' : 'npm';

  backendProcess = crossSpawn(npmPath, ['run', 'dev:backend'], {
    stdio: 'pipe',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      PORT: '8000' // Explicitly set port for tests
    },
    cwd: process.cwd()
  });

  // Log backend output for debugging
  backendProcess.stdout?.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });

  backendProcess.stderr?.on('data', (data) => {
    console.error(`Backend Error: ${data}`);
  });

  // Wait for backend to be ready
  try {
    await waitForPort(8000, 30000); // Wait up to 30 seconds
    console.log('Backend server started successfully');
  } catch (error) {
    console.error('Failed to start backend server:', error);
    throw error;
  }
}, 35000);

afterAll(() => {
  // Cleanup backend process
  if (backendProcess) {
    backendProcess.kill();
    console.log('Backend server stopped');
  }
});

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
