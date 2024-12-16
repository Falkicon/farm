/**
 * @module HomePage
 * @description A web component that serves as the home page of the FARM Stack application.
 * Demonstrates usage of Fabric and Fluent Web Components.
 */

import {
  FASTElement,
  customElement,
  html,
  css,
} from '@microsoft/fast-element';

const template = html<HomePage>`
  <div class="container">
    <h1>Fluent/Fabric Component Demo</h1>

    <fabric-card class="card">
      <h2>Component Examples</h2>

      <div class="form">
        <fluent-field label-position="above">
          <label slot="label">Favorite Framework</label>
          <fluent-radio-group
            slot="input"
            name="favorite-framework"
          >

          <fluent-field label-position="after">
              <label slot="label">Fluent</label>
              <fluent-radio
                slot="input"
                name="favorite-framework"
                value="angular"
              ></fluent-radio>
            </fluent-field>

            <fluent-field label-position="after">
              <label slot="label">Fabric</label>
              <fluent-radio
                slot="input"
                name="favorite-framework"
                value="webcomponents"
              ></fluent-radio>
            </fluent-field>
          </fluent-radio-group>
        </fluent-field>

        <p id="selected-framework" class="selection-text">Selected framework: None</p>
      </div>

      <div class="button-container">
        <fabric-loading-button appearance="primary">
          Loading Button
        </fabric-loading-button>
      </div>
    </fabric-card>
  </div>
`;

const styles = css`
  :host {
    display: block;
    padding: 1rem;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  .card {
    padding: 8px;
    display: block;
  }

  .form {
    margin: 0;
  }

  .button-container {
    margin-top: 0;
  }

  .selection-text {
    margin-top: 0;
    font-style: italic;
  }

  h1 {
    color: var(--neutral-foreground-rest);
    margin-bottom: 0;
  }

  h2 {
    color: var(--neutral-foreground-rest);
    margin-top: 0;
  }

  p {
    color: var(--neutral-foreground-rest);
    margin-bottom: 0;
  }

  fluent-field {
    margin: 0;
  }
`;

/**
 * HomePage web component demonstrating Fabric Card and Fluent Button integration.
 */
@customElement({
  name: 'home-page',
  template,
  styles
})
export class HomePage extends FASTElement {
  override connectedCallback(): void {
    super.connectedCallback();
    this.setupRadioListeners();
  }

  private setupRadioListeners(): void {
    const radios = this.shadowRoot?.querySelectorAll('fluent-radio');
    const display = this.shadowRoot?.getElementById('selected-framework');

    radios?.forEach(radio => {
      radio.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        if (display) {
          display.textContent = `Selected framework: ${target.value}`;
        }
      });
    });
  }
}
