import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Main navigation component for the application
 *
 * @remarks
 * Provides the primary navigation menu with links to major sections of the application.
 * Uses CSS custom properties for theming and consistent styling.
 *
 * @example
 * ```html
 * <main-nav></main-nav>
 * ```
 *
 * @csspart nav - The navigation container
 * @csspart ul - The navigation list
 *
 * @cssprop --surface-color - Background color of the navigation
 * @cssprop --border-color - Color of the bottom border
 * @cssprop --text-color - Color of the navigation links
 * @cssprop --hover-color - Background color of links on hover
 * @cssprop --primary-color - Color for active links
 *
 * @category Navigation
 */
@customElement('main-nav')
export class MainNav extends LitElement {
    static override styles = css`
    nav {
      padding: 1rem;
      background: var(--surface-color, #fff);
      border-bottom: 1px solid var(--border-color, #020610);
      background-color: #080f1f;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 1rem;
    }

    a {
      color: var(--text-color, white);
      text-decoration: none;
      padding: 0.5rem;
      transition: background-color 0.2s;
    }

    a:hover {
      background-color: var(--hover-color, #171e31);
      border-radius: 4px;
    }

    a.active {
      color: var(--primary-color, #0066cc);
      font-weight: 500;
    }
  `;

    /**
     * Renders the navigation component
     * @returns The navigation template with home and system links
     */
    protected override render() {
        return html`
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/system">System</a></li>
        </ul>
      </nav>
    `;
    }
}
