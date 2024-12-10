import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-card')
export class AppCard extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        .card {
            @apply bg-white rounded-lg shadow-md p-6 mb-6;
        }
    `;

    render() {
        return html`
            <div class="card">
                <slot></slot>
            </div>
        `;
    }
}
