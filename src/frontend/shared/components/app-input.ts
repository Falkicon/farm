import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('app-input')
export class AppInput extends LitElement {
    @property({ type: String }) label = '';
    @property({ type: String }) placeholder = '';
    @property({ type: String }) value = '';

    static styles = css`
        :host {
            display: block;
        }
        .input-wrapper {
            @apply flex flex-col gap-2;
        }
        input {
            @apply px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
        }
        label {
            @apply text-sm font-medium text-gray-700;
        }
    `;

    render() {
        return html`
            <div class="input-wrapper">
                ${this.label ? html`<label>${this.label}</label>` : ''}
                <input
                    type="text"
                    .value=${this.value}
                    placeholder=${this.placeholder}
                    @input=${(e: Event) => this._handleInput(e)}
                />
            </div>
        `;
    }

    private _handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
        this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
    }
}
