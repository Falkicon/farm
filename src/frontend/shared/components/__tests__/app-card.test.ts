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
        const card = el.shadowRoot?.querySelector('.card');

        expect(getComputedStyle(card!).backgroundColor).to.equal('rgb(255, 255, 255)');
        expect(getComputedStyle(card!).borderRadius).to.not.equal('0px');
    });
});
