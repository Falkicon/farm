import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { styles } from '../../../styles/shared-styles.ts';

@customElement('home-page')
export class HomePage extends LitElement {
    static styles = [
        styles, // This should contain your Tailwind styles
        css`
            :host {
                display: block;
            }
        `
    ];

    render() {
        return html`
            <div class="container mx-auto p-4">
                <h1 class="text-2xl font-bold mb-4">Welcome Home</h1>
                <p>This is the home page of your application.</p>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'home-page': HomePage;
    }
}
