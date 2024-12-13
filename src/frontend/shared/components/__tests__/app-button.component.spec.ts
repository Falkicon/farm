import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, elementUpdated } from '@open-wc/testing-helpers';
import { AppButton } from '../app-button';

describe('AppButton', () => {
  let el: AppButton;

  beforeEach(async () => {
    el = await fixture<AppButton>(html`<app-button>Click me</app-button>`);
    await elementUpdated(el);
  });

  it('meets accessibility guidelines', async () => {
    expect(el.shadowRoot).toBeTruthy();
    const button = el.shadowRoot!.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('renders with default variant', async () => {
    const button = el.shadowRoot!.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.classList.contains('primary')).toBe(true);
  });

  it('renders with secondary variant', async () => {
    el = await fixture<AppButton>(
      html`<app-button variant="secondary">Click me</app-button>`
    );
    await elementUpdated(el);
    const button = el.shadowRoot!.querySelector('button');
    expect(button).toBeTruthy();
    expect(button!.classList.contains('secondary')).toBe(true);
  });

  it('handles click events', async () => {
    const button = el.shadowRoot!.querySelector('button');
    expect(button).toBeTruthy();

    let clicked = false;
    el.addEventListener('click', () => {
      clicked = true;
    });

    button!.click();
    await elementUpdated(el);
    expect(clicked).toBe(true);
  });

  it('maintains focus state', async () => {
    const button = el.shadowRoot!.querySelector('button');
    expect(button).toBeTruthy();

    button!.focus();
    await elementUpdated(el);

    // In shadow DOM, the activeElement is the host element (app-button)
    expect(document.activeElement).toBe(el);
    // The actual focused element is in the shadow root
    expect(el.shadowRoot!.activeElement).toBe(button);
  });
});
