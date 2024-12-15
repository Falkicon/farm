/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import type { CustomElementConstructor, CustomElementRegistry } from '../types/global';

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers);

// Mock window.customElements
class MockCustomElementRegistry implements CustomElementRegistry {
    private definitions = new Map<string, CustomElementConstructor>();

    define(name: string, constructor: CustomElementConstructor): void {
        if (this.definitions.has(name)) {
            throw new Error(`A custom element with name '${name}' has already been defined`);
        }
        this.definitions.set(name, constructor);
    }

    get(name: string): CustomElementConstructor | undefined {
        return this.definitions.get(name);
    }

    whenDefined(name: string): Promise<CustomElementConstructor> {
        const constructor = this.definitions.get(name);
        if (constructor) {
            return Promise.resolve(constructor);
        }
        return new Promise((resolve) => {
            const checkInterval = window.setInterval(() => {
                const constructor = this.definitions.get(name);
                if (constructor) {
                    window.clearInterval(checkInterval);
                    resolve(constructor);
                }
            }, 100);
        });
    }

    getName(constructor: CustomElementConstructor): string | null {
        for (const [name, ctor] of this.definitions.entries()) {
            if (ctor === constructor) {
                return name;
            }
        }
        return null;
    }

    upgrade(): void {
        // No-op in test environment
    }
}

// Mock window.FormData with complete interface
class MockFormData implements FormData {
    private data = new Map<string, string>();

    constructor(_form?: globalThis.HTMLFormElement | undefined, _submitter?: globalThis.HTMLElement | null) {
        // Handle form data initialization if needed
    }

    append(name: string, value: string | Blob, filename?: string): void {
        this.data.set(name, typeof value === 'string' ? value : filename || '');
    }

    delete(name: string): void {
        this.data.delete(name);
    }

    get(name: string): string | File | null {
        return this.data.get(name) || null;
    }

    getAll(name: string): Array<string | File> {
        const value = this.data.get(name);
        return value ? [value] : [];
    }

    has(name: string): boolean {
        return this.data.has(name);
    }

    set(name: string, value: string | Blob, filename?: string): void {
        this.data.set(name, typeof value === 'string' ? value : filename || '');
    }

    forEach(callbackfn: (value: string | File, key: string, parent: FormData) => void): void {
        this.data.forEach((value, key) => callbackfn(value, key, this));
    }

    *entries(): IterableIterator<[string, string | File]> {
        yield* this.data.entries();
    }

    *keys(): IterableIterator<string> {
        yield* this.data.keys();
    }

    *values(): IterableIterator<string | File> {
        yield* this.data.values();
    }

    [Symbol.iterator](): IterableIterator<[string, string | File]> {
        return this.entries();
    }
}

// Setup test environment
const mockCustomElements = new MockCustomElementRegistry();

// Setup global mocks using type assertions
Object.defineProperty(window, 'customElements', {
    value: mockCustomElements,
    writable: true,
    configurable: true
});

Object.defineProperty(window, 'FormData', {
    value: MockFormData,
    writable: true,
    configurable: true
});

Object.defineProperty(window, 'CustomStateSet', {
    value: Set,
    writable: true,
    configurable: true
});

// Add testing utilities
export const createTestElement = async (tagName: string): Promise<Element> => {
    const element = document.createElement(tagName);
    document.body.appendChild(element);
    await new Promise(resolve => setTimeout(resolve, 0));
    return element;
};

export const removeTestElement = (element: Element | null): void => {
    if (element?.parentNode) {
        element.parentNode.removeChild(element);
    }
};

// Add custom matchers
expect.extend({
    toHaveProperty(received: unknown, property: string) {
        const pass = typeof received === 'object' &&
                    received !== null &&
                    Object.prototype.hasOwnProperty.call(received, property);
        return {
            pass,
            message: (): string =>
                pass
                    ? `Expected element not to have property "${property}"`
                    : `Expected element to have property "${property}"`
        };
    },
    toHaveAttribute(received: Element | null, attr: string, value?: string) {
        if (!received) {
            return {
                pass: false,
                message: (): string => 'Expected element to exist'
            };
        }

        const hasAttr = received.hasAttribute(attr);
        const attrValue = received.getAttribute(attr);
        const pass = value === undefined ? hasAttr : hasAttr && attrValue === value;

        return {
            pass,
            message: (): string =>
                pass
                    ? `Expected element not to have attribute "${attr}"${value ? ` with value "${value}"` : ''}`
                    : `Expected element to have attribute "${attr}"${value ? ` with value "${value}"` : ''}`
        };
    }
});
