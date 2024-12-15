import { expect, test, describe } from 'vitest';
import { components } from '../../../types/component-bridge';
import type { FluentSelectType, FluentOptionType, FabricSelectType, FabricOptionType } from '../../../types/component-bridge';

const { provideDesignSystem } = components.fluent;

describe('Select Component Experiments', () => {
    test('should create a Fluent select with options', () => {
        provideDesignSystem();
        const select = document.createElement('fluent-select') as unknown as FluentSelectType;
        const option1 = document.createElement('fluent-option') as unknown as FluentOptionType;
        const option2 = document.createElement('fluent-option') as unknown as FluentOptionType;

        option1.value = '1';
        option1.textContent = 'Option 1';
        option2.value = '2';
        option2.textContent = 'Option 2';

        select.appendChild(option1);
        select.appendChild(option2);

        expect(select).toBeDefined();
        expect(select.children.length).toBe(2);
    });

    test('should handle Fluent select value changes', () => {
        provideDesignSystem();
        const select = document.createElement('fluent-select') as unknown as FluentSelectType;
        const option = document.createElement('fluent-option') as unknown as FluentOptionType;

        option.value = 'test';
        select.appendChild(option);
        select.value = 'test';

        expect(select.value).toBe('test');
    });

    test('should create a Fabric select with options', () => {
        components.fabric.provideDesignSystem();
        const select = document.createElement('fabric-select') as unknown as FabricSelectType;
        const option1 = document.createElement('fabric-option') as unknown as FabricOptionType;
        const option2 = document.createElement('fabric-option') as unknown as FabricOptionType;

        option1.value = '1';
        option1.textContent = 'Option 1';
        option2.value = '2';
        option2.textContent = 'Option 2';

        select.appendChild(option1);
        select.appendChild(option2);

        expect(select).toBeDefined();
        expect(select.children.length).toBe(2);
    });
});
