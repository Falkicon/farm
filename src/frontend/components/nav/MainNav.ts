import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('main-nav')
export class MainNav extends LitElement {
    static styles = css`
    nav {
      padding: 1rem;
      background: var(--surface-color, #fff);
      border-bottom: 1px solid #eee;
    }
    
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 1rem;
    }
    
    a {
      color: var(--primary-color, #333);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s;
    }
    
    a:hover {
      background-color: var(--hover-color, #f5f5f5);
    }
    
    .system-status {
      margin-left: auto;
    }
  `;

    render() {
        return html`
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li class="system-status">
            <a href="/system-status">
              System Status
            </a>
          </li>
        </ul>
      </nav>
    `;
    }
} 