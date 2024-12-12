import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

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
