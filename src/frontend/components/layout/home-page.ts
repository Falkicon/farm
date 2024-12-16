/**
 * @file Home page component that serves as the main landing page for the Farm application.
 * @module HomePage
 */

import {
    FASTElement,
    customElement,
    html,
    css,
} from '@microsoft/fast-element';

/**
 * Template for the home page component.
 * Defines the structure of the landing page with sections for Fabric and Fluent components.
 */
const template = html<HomePage>`
    <div class="container">
        <header>
            <h1>Welcome to Farm</h1>
            <p>A modern web application built with FAST Element, Fabric, and Fluent</p>
        </header>
        <main>
            <section class="components">
                <div class="component-section">
                    <h2>Fabric Components</h2>
                    <div class="component-showcase" id="fabric-components">
                        <!-- Fabric components will be added here -->
                    </div>
                </div>
                <div class="component-section">
                    <h2>Fluent Components</h2>
                    <div class="component-showcase" id="fluent-components">
                        <!-- Fluent components will be added here -->
                    </div>
                </div>
            </section>
        </main>
    </div>
`;

/**
 * Styles for the home page component.
 * Defines the visual appearance including layout, colors, and responsive design.
 */
const styles = css`
    :host {
        display: block;
        color: var(--text-color, #000000);
        background-color: var(--background-color, #FFFFFF);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    header {
        text-align: center;
        margin-bottom: 2rem;
    }

    h1 {
        font-size: 2.5rem;
        color: var(--accent-color, #0078D4);
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 1.5rem;
        color: var(--accent-color, #0078D4);
        margin-bottom: 1rem;
    }

    .components {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem;
    }

    .component-section {
        background: var(--background-color-secondary, #F5F5F5);
        padding: 2rem;
        border-radius: 8px;
    }

    .component-showcase {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    @media (min-width: 768px) {
        .components {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

/**
 * The HomePage component class.
 * Represents the main landing page of the Farm application.
 *
 * @remarks
 * This component showcases Fabric and Fluent components in a responsive grid layout.
 * It uses CSS custom properties for theming and responsive design for different screen sizes.
 *
 * @example
 * ```html
 * <home-page></home-page>
 * ```
 */
@customElement({
    name: 'home-page',
    template,
    styles
})
export class HomePage extends FASTElement {
    // Component logic will be added here as needed
}
