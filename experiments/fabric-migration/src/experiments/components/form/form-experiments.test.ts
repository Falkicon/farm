import { expect, test, describe } from 'vitest';
import { components } from '../../../types/component-bridge';
import type { FluentTextFieldType, FabricTextFieldType } from '../../../types/component-bridge';

const { provideDesignSystem } = components.fluent;

describe('Form Component Experiments', () => {
    test('should create a Fluent text input with placeholder', () => {
        provideDesignSystem();
        const input = document.createElement('fluent-text-field') as unknown as FluentTextFieldType;
        input.placeholder = 'Enter text';

        expect(input).toBeDefined();
        expect(input.placeholder).toBe('Enter text');
    });

    test('should handle Fluent text input value changes', () => {
        provideDesignSystem();
        const input = document.createElement('fluent-text-field') as unknown as FluentTextFieldType;
        input.value = 'Test Value';

        expect(input.value).toBe('Test Value');
    });

    test('should handle Fluent text input disabled state', () => {
        provideDesignSystem();
        const input = document.createElement('fluent-text-field') as unknown as FluentTextFieldType;
        input.disabled = true;

        expect(input.disabled).toBe(true);
    });

    test('should create a Fabric text input with placeholder', () => {
        components.fabric.provideDesignSystem();
        const input = document.createElement('fabric-text-field') as unknown as FabricTextFieldType;
        input.placeholder = 'Enter text';

        expect(input).toBeDefined();
        expect(input.placeholder).toBe('Enter text');
    });
});
