import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Home page component for the application's landing page
 *
 * @remarks
 * This component provides the main entry point for users and displays
 * key features of the application in a responsive grid layout.
 *
 * @example
 * ```html
 * <home-page></home-page>
 * ```
 *
 * @csspart hero - The hero section container
 * @csspart features - The features grid container
 * @csspart feature-card - Individual feature card
 *
 * @slot - Default slot for additional content
 *
 * @category Pages
 */
@customElement('home-page')
export class HomePage extends LitElement {
  /**
   * CSS styles for the component
   * @remarks
   * Uses system-wide CSS custom properties for consistent theming
   */
  static override styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg-primary);
      color: var(--color-text-primary);
      padding: var(--system-spacing-4);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--system-spacing-4);
    }

    .hero {
      text-align: center;
      padding: calc(var(--system-spacing-4) * 2);
      background: rgba(30, 41, 59, 0.6);
      border-radius: var(--system-radius-lg);
      margin-bottom: calc(var(--system-spacing-4) * 2);
      border: 1px solid rgba(255, 255, 255, 0.03);
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--color-text-primary);
      opacity: 0.9;
    }

    .subtitle {
      font-size: 1.25rem;
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
      opacity: 0.8;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: calc(var(--system-spacing-4) * 2);
      position: relative;
    }

    .features::before,
    .features::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(
        to bottom,
        transparent,
        rgba(255, 255, 255, 0.05) 20%,
        rgba(255, 255, 255, 0.05) 80%,
        transparent
      );
    }

    .feature-card {
      background: rgba(30, 41, 59, 0.6);
      padding: calc(var(--system-spacing-4) * 1.5);
      border-radius: var(--system-radius-lg);
      border: 1px solid rgba(255, 255, 255, 0.03);
      transition: background-color 0.2s;
    }

    .feature-card:hover {
      background: rgba(30, 41, 59, 0.7);
    }

    .feature-title {
      font-size: var(--system-text-lg);
      font-weight: 500;
      color: var(--color-accent);
      margin-bottom: 1rem;
      opacity: 0.9;
    }

    .feature-description {
      color: var(--color-text-secondary);
      line-height: 1.6;
      opacity: 0.8;
    }

    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--color-accent);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: var(--system-radius-lg);
      font-weight: 500;
      text-decoration: none;
      transition: background-color 0.2s;
      margin-top: 2rem;
    }

    .cta-button:hover {
      background: var(--color-accent-dark);
    }

    @media (max-width: 1200px) {
      .features {
        grid-template-columns: 1fr;
        gap: var(--system-spacing-4);
      }

      .features::before,
      .features::after {
        display: none;
      }

      .container {
        padding: var(--system-spacing-3);
      }

      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.125rem;
      }
    }
  `;

  /**
   * Renders the component's template
   * @returns The component's template
   */
  protected override render() {
    return html`
      <div class="container">
        <section class="hero">
          <h1>Welcome to Your Application</h1>
          <p class="subtitle">A modern web application built with Lit and TypeScript</p>
          <a href="/system" class="cta-button">
            View System Status
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </section>

        <div class="features">
          <div class="feature-card">
            <h3 class="feature-title">Fast & Efficient</h3>
            <p class="feature-description">
              Built with modern web technologies for optimal performance and speed
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Type-Safe</h3>
            <p class="feature-description">
              Fully typed with TypeScript for better development experience
            </p>
          </div>

          <div class="feature-card">
            <h3 class="feature-title">Component-Based</h3>
            <p class="feature-description">Modular architecture using Web Components and Lit</p>
          </div>
        </div>
      </div>
    `;
  }
}
