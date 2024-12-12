import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../app-card';
import { AppCard } from '../app-card';

describe('AppCard', () => {
    it('renders with slot content', async () => {
        const el = await fixture<AppCard>(html`
            <app-card>
                <h1>Test Content</h1>
            </app-card>
        `);

        expect(el.shadowRoot?.querySelector('.card')).to.exist;
        expect(el.innerHTML.trim()).to.equal('<h1>Test Content</h1>');
    });

    it('has correct styles', async () => {
        const el = await fixture<AppCard>(html`<app-card></app-card>`);
        const card = el.shadowRoot?.querySelector('.card') as HTMLElement;

        // Check inline styles directly
        const styles = card.getAttribute('style');
        expect(styles).to.include('background-color: rgb(255, 255, 255)');
        expect(styles).to.include('border-radius: 0.5rem');
        expect(styles).to.include('padding: 1.5rem');
        expect(styles).to.include('margin-bottom: 1.5rem');
    });
});
