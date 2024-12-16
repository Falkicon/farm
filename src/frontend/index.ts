// Import global styles
import './styles/global.css';

// Initialize FAST Element configuration
import { initializeFastConfig } from './config/fast-element.config';

// Import and export components
export * from './components';

// Initialize the design system
initializeFastConfig();

// Log successful initialization
console.log('FAST Element components initialized');
