declare global {
  // Add global test hooks
  const beforeAll: (fn: () => void | Promise<void>) => void;
  const afterAll: (fn: () => void | Promise<void>) => void;
  const beforeEach: (fn: () => void | Promise<void>) => void;
  const afterEach: (fn: () => void | Promise<void>) => void;

  // Add custom window properties if needed
  interface Window {
    _clicked?: boolean;
  }
}

export {};
