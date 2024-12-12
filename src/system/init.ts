/// <reference types="vite/client" />

// Add type declarations for Lit warnings
declare global {
  interface Window {
    litIssuedWarnings: Set<string> | undefined;
  }
  var litIssuedWarnings: Set<string> | undefined;
}

// Initialize Lit configuration only in development mode
if (import.meta.env.DEV) {
  console.info('[System] Running in development mode');

  // Initialize warning sets if they don't exist
  if (!window.litIssuedWarnings) {
    window.litIssuedWarnings = new Set();
  }
  if (!globalThis.litIssuedWarnings) {
    globalThis.litIssuedWarnings = new Set();
  }
} else {
  console.info('[System] Running in production mode');
}

// Export initialization status
export const initialized = true;
