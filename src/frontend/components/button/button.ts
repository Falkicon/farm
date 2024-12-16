import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseButton } from './base-button';

export type ButtonAppearance = 'primary' | 'outline' | 'subtle' | 'transparent';
export type ButtonShape = 'circular' | 'rounded' | 'square';
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * A fluent design button component built with Lit
 *
 * @element fluent-lit-button
 *
 * @slot - Default slot for button content
 * @slot start - Content before the button label
 * @slot end - Content after the button label
 *
 * @csspart button - The button element
 *
 * @fires {Event} click - Fired when the button is clicked
 */
@customElement('fluent-lit-button')
export class Button extends BaseButton {
    @property({ type: String, reflect: true }) appearance: ButtonAppearance = 'primary';
    @property({ type: Boolean, reflect: true }) iconOnly = false;
    @property({ type: String, reflect: true }) shape: ButtonShape = 'rounded';
    @property({ type: String, reflect: true }) size: ButtonSize = 'medium';

    static override styles = css`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            cursor: pointer;
            border: none;
            border-radius: var(--border-radius, 4px);
            padding: var(--padding, 0.5rem 1rem);
            font-size: var(--font-size, 1rem);
            font-weight: 500;
            transition: all 0.2s ease-in-out;
            background: none;
            outline: none;
        }

        :host([disabled]) {
            cursor: not-allowed;
            opacity: 0.6;
        }

        /* Appearances */
        :host([appearance="primary"]) {
            background: var(--primary-color, #0078d4);
            color: white;
        }

        :host([appearance="outline"]) {
            border: 1px solid var(--primary-color, #0078d4);
            color: var(--primary-color, #0078d4);
        }

        :host([appearance="subtle"]) {
            background: var(--subtle-background, #f3f3f3);
            color: var(--text-color, #323130);
        }

        :host([appearance="transparent"]) {
            color: var(--text-color, #323130);
        }

        /* Shapes */
        :host([shape="circular"]) {
            border-radius: 50%;
        }

        :host([shape="square"]) {
            border-radius: 0;
        }

        /* Sizes */
        :host([size="small"]) {
            padding: 0.25rem 0.75rem;
            font-size: 0.875rem;
        }

        :host([size="large"]) {
            padding: 0.75rem 1.5rem;
            font-size: 1.125rem;
        }

        /* Icon Only */
        :host([iconOnly]) {
            padding: var(--icon-padding, 0.5rem);
            aspect-ratio: 1;
        }

        :host([iconOnly][size="small"]) {
            padding: 0.25rem;
        }

        :host([iconOnly][size="large"]) {
            padding: 0.75rem;
        }

        /* Hover States */
        :host(:hover:not([disabled])) {
            filter: brightness(0.9);
        }

        :host(:active:not([disabled])) {
            filter: brightness(0.8);
        }

        /* Focus States */
        :host(:focus-visible) {
            box-shadow: 0 0 0 2px var(--focus-color, #0078d4);
        }
    `;

    protected override render() {
        return html`
            <slot name="start"></slot>
            <slot></slot>
            <slot name="end"></slot>
        `;
    }

    protected appearanceChanged(prev: ButtonAppearance | undefined, next: ButtonAppearance): void {
        if (prev) {
            this.classList.remove(`appearance-${prev}`);
        }
        if (next) {
            this.classList.add(`appearance-${next}`);
        }
    }

    protected shapeChanged(prev: ButtonShape | undefined, next: ButtonShape): void {
        if (prev) {
            this.classList.remove(`shape-${prev}`);
        }
        if (next) {
            this.classList.add(`shape-${next}`);
        }
    }

    protected sizeChanged(prev: ButtonSize | undefined, next: ButtonSize): void {
        if (prev) {
            this.classList.remove(`size-${prev}`);
        }
        if (next) {
            this.classList.add(`size-${next}`);
        }
    }
}
