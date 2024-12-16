import { describe, it, expect } from 'vitest';
import { fixture, html, elementUpdated, oneEvent } from '@open-wc/testing';
import '../button';
import { Button } from '../button';

describe('FluentLitButton', () => {
    it('should be defined as a custom element', async () => {
        const el = await fixture<Button>(html`<fluent-lit-button>Click me</fluent-lit-button>`);
        expect(el.tagName.toLowerCase()).toBe('fluent-lit-button');
    });

    it('renders with default properties', async () => {
        const el = await fixture<Button>(html`<fluent-lit-button>Click me</fluent-lit-button>`);
        await elementUpdated(el);

        expect(el.appearance).toBe('primary');
        expect(el.shape).toBe('rounded');
        expect(el.size).toBe('medium');
        expect(el.iconOnly).toBe(false);
        expect(el.disabled).toBeFalsy();
    });

    it('reflects property changes', async () => {
        const el = await fixture<Button>(html`<fluent-lit-button>Click me</fluent-lit-button>`);
        await elementUpdated(el);

        el.appearance = 'outline';
        el.shape = 'circular';
        el.size = 'small';
        await elementUpdated(el);

        expect(el.appearance).toBe('outline');
        expect(el.shape).toBe('circular');
        expect(el.size).toBe('small');
        expect(el.hasAttribute('appearance')).toBe(true);
        expect(el.getAttribute('appearance')).toBe('outline');
    });

    it('handles disabled state', async () => {
        const el = await fixture<Button>(html`<fluent-lit-button disabled>Click me</fluent-lit-button>`);
        await elementUpdated(el);

        expect(el.disabled).toBe(true);
        expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('handles icon-only mode', async () => {
        const el = await fixture<Button>(html`
            <fluent-lit-button iconOnly>
                <span slot="start">★</span>
            </fluent-lit-button>
        `);
        await elementUpdated(el);

        expect(el.iconOnly).toBe(true);
        expect(el.hasAttribute('iconOnly')).toBe(true);
    });

    it('handles click events when not disabled', async () => {
        const el = await fixture<Button>(html`<fluent-lit-button>Click me</fluent-lit-button>`);
        await elementUpdated(el);

        setTimeout(() => el.dispatchEvent(new MouseEvent('click', { bubbles: true })));
        const { detail } = await oneEvent(el, 'click');
        expect(detail).toBeDefined();
    });

    it('prevents click events when disabled', async () => {
        const el = await fixture<Button>(html`<fluent-lit-button disabled>Click me</fluent-lit-button>`);
        await elementUpdated(el);

        let clicked = false;
        el.addEventListener('click', () => clicked = true);

        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await elementUpdated(el);

        expect(clicked).toBe(false);
    });

    it('handles keyboard events', async () => {
        const el = await fixture<Button>(html`<fluent-lit-button>Click me</fluent-lit-button>`);
        await elementUpdated(el);

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' })));
        const enterEvent = await oneEvent(el, 'click');
        expect(enterEvent).toBeDefined();

        setTimeout(() => el.dispatchEvent(new KeyboardEvent('keypress', { key: ' ' })));
        const spaceEvent = await oneEvent(el, 'click');
        expect(spaceEvent).toBeDefined();
    });

    it('renders slots correctly', async () => {
        const el = await fixture<Button>(html`
            <fluent-lit-button>
                <span slot="start">Start</span>
                Middle
                <span slot="end">End</span>
            </fluent-lit-button>
        `);
        await elementUpdated(el);

        const slots = el.shadowRoot!.querySelectorAll('slot');
        expect(slots.length).toBe(3);
        expect(slots[0].name).toBe('start');
        expect(slots[1].name).toBe('');
        expect(slots[2].name).toBe('end');
    });
});
