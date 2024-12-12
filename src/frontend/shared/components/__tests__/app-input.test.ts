import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import '../app-input';
import { AppInput } from '../app-input';

describe('AppInput', () => {
  it('renders with label', async () => {
    const el = await fixture<AppInput>(html`<app-input label="Test Label"></app-input>`);
    const label = el.shadowRoot?.querySelector('label');

    expect(label?.textContent).to.equal('Test Label');
  });

  it('renders without label when not provided', async () => {
    const el = await fixture<AppInput>(html`<app-input></app-input>`);
    const label = el.shadowRoot?.querySelector('label');

    expect(label).to.be.null;
  });

  it('handles input changes', async () => {
    const el = await fixture<AppInput>(html`<app-input></app-input>`);
    const input = el.shadowRoot?.querySelector('input');

    let changedValue = '';
    el.addEventListener('change', ((e: CustomEvent) => {
      changedValue = e.detail;
    }) as EventListener);

    input?.dispatchEvent(new Event('input'));
    expect(changedValue).to.equal(input?.value);
  });
});
