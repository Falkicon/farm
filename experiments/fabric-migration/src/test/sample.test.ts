/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { describe, it, expect } from 'vitest';
import { createTestElement, removeTestElement } from './setup';

// No need to redeclare customElements as it's already defined in lib.dom.d.ts
describe('Testing Setup', () => {
    it('should have working DOM environment', () => {
        const div = document.createElement('div');
        div.innerHTML = 'Test';
        document.body.appendChild(div);
        expect(document.body.contains(div)).toBe(true);
        expect(div.textContent).toBe('Test');
    });

    it('should have working custom element support', () => {
        class TestElement extends HTMLElement {
            connectedCallback(): void {
                this.innerHTML = 'Custom Element';
            }
        }
        window.customElements.define('test-element', TestElement);
        const element = document.createElement('test-element');
        document.body.appendChild(element);
        expect(element.innerHTML).toBe('Custom Element');
    });

    it('should have working test utilities', async () => {
        class TestComponent extends HTMLElement {
            connectedCallback(): void {
                this.setAttribute('test', 'value');
            }
        }
        window.customElements.define('test-component', TestComponent);

        const element = await createTestElement('test-component');
        expect(element).toHaveAttribute('test', 'value');
        removeTestElement(element);
        expect(document.body.contains(element)).toBe(false);
    });
});
