import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseComponent } from '../base/BaseComponent';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';

@customElement('app-button')
export class AppButton extends BaseComponent {
    @property({ type: String }) variant: ButtonVariant = 'primary';
    @property({ type: String }) size: ButtonSize = 'medium';
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) loading = false;
    @property({ type: String, reflect: true }) ariaLabel: string | null = null;

    static styles = css`
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

    render() {
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

    private handleClick(e: Event) {
        if (this.disabled || this.loading) return;
        this.dispatchCustomEvent('click', e);
    }
}
