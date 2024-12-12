import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('error-boundary')
export class ErrorBoundary extends LitElement {
  @property({ type: Object }) error: Error | null = null;
  @property({ type: String }) fallbackMessage = 'Something went wrong';
  @property({ type: Boolean }) showDetails = false;

  static override styles = css`
    .error-boundary {
      @apply p-4 border border-red-300 rounded-md bg-red-50;
    }
    .error-message {
      @apply text-red-700 font-medium;
    }
    .error-details {
      @apply mt-2 text-sm text-red-600 font-mono whitespace-pre-wrap;
    }
    .retry-button {
      @apply mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700;
    }
  `;

  handleError(error: Error): void {
    this.error = error;
    // Log to error tracking service
    console.error('Error caught by boundary:', error);
    // Could integrate with external error tracking service
    this.dispatchEvent(
      new CustomEvent('error-caught', {
        detail: { error },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    if (this.error) {
      return html`
        <div class="error-boundary" role="alert">
          <h2 class="error-message">${this.fallbackMessage}</h2>
          ${this.showDetails ? html` <pre class="error-details">${this.error.stack}</pre> ` : ''}
          <button class="retry-button" @click=${this.retry} aria-label="Retry operation">
            Retry
          </button>
        </div>
      `;
    }
    return html`<slot></slot>`;
  }

  private retry() {
    this.error = null;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('retry'));
  }
}
