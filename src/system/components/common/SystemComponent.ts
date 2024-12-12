import { LitElement, TemplateResult } from 'lit';

/**
 * Base component class for system-level UI components.
 * Uses Light DOM for style inheritance and provides basic structure validation.
 */
export abstract class SystemComponent extends LitElement {
  protected debug = false;

  constructor() {
    super();
    this.classList.add('system-component');
  }

  // Use Light DOM for style inheritance
  protected override createRenderRoot() {
    return this;
  }

  // Validate structure after first render
  protected override firstUpdated(): void {
    if (this.debug) {
      this.validateStructure();
    }
  }

  // Abstract method for content rendering
  protected abstract renderContent(): TemplateResult;

  // Validate component structure
  protected validateStructure(): void {
    console.log('Validating component structure...');
  }

  protected override render(): TemplateResult {
    return this.renderContent();
  }
}
