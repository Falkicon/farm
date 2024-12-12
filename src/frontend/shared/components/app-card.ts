import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Card container component for content organization
 *
 * @remarks
 * Provides a styled card container with consistent padding, background,
 * and shadow effects.
 *
 * @example
 * ```html
 * <app-card>
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </app-card>
 * ```
 *
 * @csspart card - The card container element
 * @slot default - Card content
 *
 * @category Components
 */
@customElement('app-card')
export class AppCard extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  /**
   * Renders the card component
   * @returns The card template with content slot
   */
  protected override render() {
    return html`
      <div
        class="card"
        part="card"
        style="
                    background-color: rgb(255, 255, 255);
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                "
      >
        <slot></slot>
      </div>
    `;
  }
}
