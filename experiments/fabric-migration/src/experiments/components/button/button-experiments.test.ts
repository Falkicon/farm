import { expect, test, describe } from 'vitest';
import { components } from '../../../types/component-bridge';
import type { FluentButtonType, FabricButtonType } from '../../../types/component-bridge';

const { provideDesignSystem } = components.fluent;

describe('Button Component Experiments', () => {
    test('should create a Fluent button with appearance', () => {
        provideDesignSystem();
        const button = document.createElement('fluent-button') as unknown as FluentButtonType;
        button.appearance = 'accent';
        button.textContent = 'Click me';

        expect(button).toBeDefined();
        expect(button.appearance).toBe('accent');
        expect(button.textContent).toBe('Click me');
    });

    test('should handle Fluent button disabled state', () => {
        provideDesignSystem();
        const button = document.createElement('fluent-button') as unknown as FluentButtonType;
        button.disabled = true;

        expect(button.disabled).toBe(true);
    });

    test('should create a Fabric button with appearance', () => {
        components.fabric.provideDesignSystem();
        const button = document.createElement('fabric-button') as unknown as FabricButtonType;
        button.appearance = 'primary';
        button.textContent = 'Submit';

        expect(button).toBeDefined();
        expect(button.appearance).toBe('primary');
        expect(button.textContent).toBe('Submit');
    });

    test('should handle Fabric button loading state', () => {
        components.fabric.provideDesignSystem();
        const button = document.createElement('fabric-button') as unknown as FabricButtonType;
        button.loading = true;

        expect(button.loading).toBe(true);
    });
});
