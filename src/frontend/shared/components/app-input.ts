import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Input field component with label and change event handling
 *
 * @remarks
 * Provides a styled input field with optional label and placeholder.
 * Uses Tailwind CSS classes for consistent styling and focus states.
 *
 * @example
 * ```html
 * <app-input
 *   label="Username"
 *   placeholder="Enter username"
 *   @change=${(e) => console.log(e.detail)}
 * ></app-input>
 * ```
 *
 * @csspart input-wrapper - The container for input and label
 * @csspart input - The input element
 * @csspart label - The label element
 *
 * @fires {CustomEvent} change - Fired when input value changes, detail contains the new value
 *
 * @category Form Controls
 */
@customElement('app-input')
export class AppInput extends LitElement {
    /**
     * Label text for the input
     * @type {string}
     * @default ''
     */
    @property({ type: String }) label = '';

    /**
     * Placeholder text for the input
     * @type {string}
     * @default ''
     */
    @property({ type: String }) placeholder = '';

    /**
     * Current value of the input
     * @type {string}
     * @default ''
     */
    @property({ type: String }) value = '';

    static override styles = css`
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

    /**
     * Renders the input component
     * @returns The input template with optional label
     */
    protected override render() {
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

    /**
     * Handles input changes and dispatches change event
     * @param e - The input event
     * @fires {CustomEvent} change - Contains the new input value
     * @private
     */
    private _handleInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.value = input.value;
        this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
    }
}
