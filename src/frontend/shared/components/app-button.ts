import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '../base/BaseComponent';

/**
 * Button variant types
 * @typedef {'primary' | 'secondary'} ButtonVariant
 */
export type ButtonVariant = 'primary' | 'secondary';

/**
 * Button size options
 * @typedef {'small' | 'medium' | 'large'} ButtonSize
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Custom button component with multiple variants and sizes
 *
 * @remarks
 * Provides a styled button component that extends BaseComponent with
 * support for different variants, sizes, loading states, and accessibility.
 *
 * @example
 * ```html
 * <app-button variant="primary" size="medium">
 *   Click Me
 * </app-button>
 * ```
 *
 * @csspart button - The button element
 * @slot default - Button content
 * @fires {CustomEvent} click - Fired when the button is clicked and not disabled
 *
 * @cssprop --button-primary-bg - Primary button background color
 * @cssprop --button-primary-hover - Primary button hover background color
 *
 * @category Components
 */
@customElement('app-button')
export class AppButton extends BaseComponent {
    /**
     * The visual variant of the button
     * @type {ButtonVariant}
     * @default 'primary'
     */
    @property({ type: String }) variant: ButtonVariant = 'primary';

    /**
     * The size of the button
     * @type {ButtonSize}
     * @default 'medium'
     */
    @property({ type: String }) size: ButtonSize = 'medium';

    /**
     * Whether the button is disabled
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) disabled = false;

    /**
     * Whether the button is in a loading state
     * @type {boolean}
     * @default false
     */
    @property({ type: Boolean }) loading = false;

    /**
     * Accessible label for the button
     * @type {string | null}
     * @default null
     */
    @property({ type: String, reflect: true }) override ariaLabel: string | null = null;

    static override styles = css`
        :host {
            display: inline-block;
            --button-primary-bg: var(--color-primary, #3b82f6);
            --button-primary-hover: var(--color-primary-dark, #2563eb);
        }
        button {
            @apply px-4 py-2 rounded-md font-medium transition-colors;
            position: relative;
            cursor: pointer;
        }
        button:focus-visible {
            @apply outline-none ring-2 ring-offset-2;
            ring-color: var(--button-primary-bg);
        }
        button.primary {
            @apply bg-blue-500 text-white hover:bg-blue-600;
            background-color: var(--button-primary-bg);
        }
        button.primary:hover {
            background-color: var(--button-primary-hover);
        }
        button.secondary {
            @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
        }
        button:disabled {
            @apply opacity-50 cursor-not-allowed;
        }
        button.small {
            @apply px-2 py-1 text-sm;
        }
        button.large {
            @apply px-6 py-3 text-lg;
        }
        .loading {
            position: relative;
            pointer-events: none;
        }
        .loading::after {
            content: '';
            position: absolute;
        }
    `;

    /**
     * Renders the button component
     * @returns The button template with current state applied
     */
    protected override render() {
        const classes = {
            primary: this.variant === 'primary',
            secondary: this.variant === 'secondary',
            [this.size]: true,
            loading: this.loading
        };

        return html`
            <button
                class=${classMap(classes)}
                ?disabled=${this.disabled || this.loading}
                aria-label=${this.ariaLabel || ''}
                aria-disabled=${this.disabled}
                @click=${this.handleClick}
            >
                <slot></slot>
            </button>
        `;
    }

    /**
     * Handles the button click event
     * @param e - The click event
     * @fires {CustomEvent} click - When button is clicked and not disabled
     * @private
     */
    private handleClick(e: Event) {
        if (this.disabled || this.loading) return;
        this.dispatchCustomEvent('click', e);
    }
}
