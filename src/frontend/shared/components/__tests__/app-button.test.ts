import { describe, it, afterEach } from 'vitest';
import { fixture, html, fixtureCleanup, elementUpdated, expect } from '@open-wc/testing';
import { axe } from 'jest-axe';
import '../app-button';
import { AppButton } from '../app-button';

describe('AppButton', () => {
    afterEach(() => {
        fixtureCleanup();
    });

    it('meets accessibility guidelines', async () => {
        const el = await fixture<AppButton>(html`<app-button>Click me</app-button>`);
        const results = await axe(el);
        expect(results).to.satisfy(toHaveNoViolations);
    });

    it('renders with default variant', async () => {
        const el = await fixture<AppButton>(html`<app-button>Click me</app-button>`);
        const button = el.shadowRoot?.querySelector('button');

        expect(button?.className).to.include('primary');
        expect(el.variant).to.equal('primary');
    });

    it('renders with secondary variant', async () => {
        const el = await fixture<AppButton>(html`<app-button variant="secondary">Click me</app-button>`);
        const button = el.shadowRoot?.querySelector('button');

        expect(button?.className).to.include('secondary');
        expect(el.variant).to.equal('secondary');
    });

    it('renders slot content', async () => {
        const el = await fixture<AppButton>(html`<app-button>Test Content</app-button>`);
        const shadowRoot = el.shadowRoot!;
        const button = shadowRoot.querySelector('button');

        expect(button).to.exist;
        expect(button?.innerHTML).to.include('<slot></slot>');
        expect(el.textContent?.trim()).to.equal('Test Content');
    });

    it('handles click events', async () => {
        let clicked = false;
        const el = await fixture<AppButton>(
            html`<app-button @click=${() => clicked = true}>Click me</app-button>`
        );

        el.click();
        await elementUpdated(el);
        expect(clicked).to.be.true;
    });

    it('maintains focus state styling', async () => {
        const el = await fixture<AppButton>(html`<app-button>Focus Test</app-button>`);
        const button = el.shadowRoot!.querySelector('button')!;

        button.focus();
        await elementUpdated(el);
        const styles = getComputedStyle(button);
        expect(styles.outline).not.to.equal('none');
    });
}); 