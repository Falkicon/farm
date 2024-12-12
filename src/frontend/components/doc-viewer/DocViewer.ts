import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('doc-viewer')
export class DocViewer extends LitElement {
  @property()
  content = '';

  static override styles = css`
    :host {
      display: block;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .doc-content {
      line-height: 1.6;
      font-size: 1.1rem;
    }
  `;

  protected override render() {
    return html` <div class="doc-content">${this.content}</div> `;
  }
}
