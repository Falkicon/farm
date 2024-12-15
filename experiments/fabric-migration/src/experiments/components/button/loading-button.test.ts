import { describe, it, expect, beforeEach } from 'vitest';
import { components } from '../../../types/component-bridge';
import type { FabricButtonType } from '../../../types/component-bridge';

describe('Loading Button Component', () => {
    beforeEach(() => {
        components.fabric.provideDesignSystem();
        components.fabric.button.define(window.customElements);
    });

    it('should create a loading button with default state', () => {
        const button = document.createElement('fabric-loading-button') as unknown as FabricButtonType;
        expect(button.loading).toBe(false);
        expect(button.disabled).toBe(false);
    });

    it('should update loading state', () => {
        const button = document.createElement('fabric-loading-button') as unknown as FabricButtonType;
        button.loading = true;
        expect(button.loading).toBe(true);
    });

    it('should handle disabled state', () => {
        const button = document.createElement('fabric-loading-button') as unknown as FabricButtonType;
        button.disabled = true;
        expect(button.disabled).toBe(true);
    });

    it('should trigger click event when not loading', () => {
        const button = document.createElement('fabric-loading-button') as unknown as FabricButtonType;
        let clicked = false;
        button.addEventListener('click', () => {
            clicked = true;
        });
        button.click();
        expect(clicked).toBe(true);
    });

    it('should not trigger click event when loading', () => {
        const button = document.createElement('fabric-loading-button') as unknown as FabricButtonType;
        button.loading = true;
        let clicked = false;
        button.addEventListener('click', () => {
            clicked = true;
        });
        button.click();
        expect(clicked).toBe(false);
    });
});
