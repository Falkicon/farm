import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';
import { LitElement } from 'lit';
import { AppButton } from '../components/app-button';

declare global {
  interface Window {
    process: {
      env: {
        NODE_ENV: string;
        [key: string]: string | undefined;
      };
    };
    BaseComponent: typeof BaseComponent;
  }
}

// Configure testing-library
configure({
  testIdAttribute: 'data-testid',
});

// Mock BaseComponent for testing
class BaseComponent extends LitElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  protected dispatchCustomEvent(name: string, detail: unknown) {
    this.dispatchEvent(
      new CustomEvent(name, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }
}

// Make BaseComponent available globally
window.BaseComponent = BaseComponent as typeof window.BaseComponent;

// Configure Lit for testing
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = 'test';

// Define custom elements if they haven't been defined yet
if (!(window.customElements && window.customElements.get('app-button'))) {
  window.customElements.define('app-button', AppButton);
}
