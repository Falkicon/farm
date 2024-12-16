import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export type ButtonFormTarget = '_self' | '_blank' | '_parent' | '_top';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Base button class that provides core button functionality
 * @element fluent-lit-base-button
 */
export class BaseButton extends LitElement {
    static formAssociated = true;

    static override shadowRootOptions: {
        mode: 'open' | 'closed';
        delegatesFocus: boolean;
    } = {
        mode: 'open',
        delegatesFocus: true
    } as const;

    @property({ type: Boolean, reflect: true }) override autofocus = false;
    @property({ type: Boolean, reflect: true }) disabled?: boolean;
    @property({ type: Boolean }) disabledFocusable = false;
    @property({ type: String }) formAction?: string;
    @property({ type: String }) formEnctype?: string;
    @property({ type: String }) formMethod?: string;
    @property({ type: Boolean }) formNoValidate?: boolean;
    @property({ type: String }) formTarget?: ButtonFormTarget;
    @property({ type: String }) name?: string;
    @property({ type: String }) type: ButtonType = 'button';
    @property({ type: String }) value?: string;
    @property({ type: Number }) override tabIndex = 0;

    private _form: globalThis.HTMLFormElement | null = null;
    private _labels: globalThis.Node[] = [];

    constructor() {
        super();
        this.addEventListener('click', this.clickHandler.bind(this), true);
        this.addEventListener('keypress', this.keypressHandler);
    }

    get form(): globalThis.HTMLFormElement | null {
        return this._form;
    }

    get labels(): ReadonlyArray<globalThis.Node> {
        return this._labels;
    }

    override click(): void {
        if (this.disabled && !this.disabledFocusable) {
            return;
        }
        super.click();
    }

    protected clickHandler(e: Event): void {
        if (this.disabled && !this.disabledFocusable) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        if (this.type === 'submit' && this.form) {
            this.form.submit();
        } else if (this.type === 'reset' && this.form) {
            this.form.reset();
        }
    }

    protected keypressHandler(e: KeyboardEvent): void {
        if (e.key === 'Enter' || e.key === ' ') {
            if (this.disabled && !this.disabledFocusable) {
                e.preventDefault();
                return;
            }
            this.press();
            e.preventDefault();
        }
    }

    protected press(): void {
        if (!this.disabled || this.disabledFocusable) {
            this.dispatchEvent(new Event('click', { bubbles: true, composed: true }));
        }
    }

    protected formDisabledCallback(disabled: boolean): void {
        this.disabled = disabled;
    }

    protected typeChanged(_prev: ButtonType, next: ButtonType): void {
        if (this.type !== next) {
            this.type = next;
        }
    }

    protected override render() {
        return html`
            <slot></slot>
        `;
    }

    protected override firstUpdated(): void {
        if (this.autofocus) {
            this.focus();
        }
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('click', this.clickHandler);
        this.removeEventListener('keypress', this.keypressHandler);
    }
}
