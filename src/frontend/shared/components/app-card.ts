import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Card container component for content organization
 *
 * @remarks
 * Provides a styled card container with consistent padding, background,
 * and shadow effects. Uses Tailwind CSS classes for styling.
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
        .card {
            @apply bg-white rounded-lg shadow-md p-6 mb-6;
        }
    `;

    /**
     * Renders the card component
     * @returns The card template with content slot
     */
    protected override render() {
        return html`
            <div class="card">
                <slot></slot>
            </div>
        `;
    }
}
