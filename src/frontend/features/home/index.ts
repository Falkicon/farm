import { Feature } from '../../core/feature-registry/types';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('home-page')
export class HomePage extends LitElement {
    render() {
        return html`
            <div class="container mx-auto p-4">
                <h1 class="text-3xl font-bold mb-4">Welcome Home</h1>
                <p class="text-lg text-gray-700">
                    This is the home page of your application.
                </p>
            </div>
        `;
    }

    // Allow Tailwind classes through
    protected createRenderRoot() {
        return this;
    }
}

export const homeFeature: Feature = {
    name: 'home',
    routes: [
        {
            path: '/',
            action: () => HomePage
        }
    ],
    async initialize() {
        // Any initialization logic for the home feature
    }
};

export default homeFeature;
