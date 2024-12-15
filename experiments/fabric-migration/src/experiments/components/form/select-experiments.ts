import { components } from '../../../types/component-bridge';
import type { FluentSelectType, FluentOptionType, FabricSelectType, FabricOptionType } from '../../../types/component-bridge';

const { provideDesignSystem } = components.fluent;

export function createFluentSelect(): FluentSelectType {
    provideDesignSystem();
    const select = document.createElement('fluent-select') as unknown as FluentSelectType;
    return select;
}

export function createFluentOption(value: string, text: string): FluentOptionType {
    const option = document.createElement('fluent-option') as unknown as FluentOptionType;
    option.value = value;
    option.textContent = text;
    return option;
}

export function createFabricSelect(): FabricSelectType {
    components.fabric.provideDesignSystem();
    const select = document.createElement('fabric-select') as unknown as FabricSelectType;
    return select;
}

export function createFabricOption(value: string, text: string): FabricOptionType {
    const option = document.createElement('fabric-option') as unknown as FabricOptionType;
    option.value = value;
    option.textContent = text;
    return option;
}

// Setup validation handlers
document.addEventListener('DOMContentLoaded', () => {
    // Fluent validation
    const element = document.getElementById('fluent-validation');
    const fluentValidation = element as unknown as FluentSelectType;
    if (fluentValidation) {
        fluentValidation.addEventListener('change', (event: Event) => {
            const target = event.target as unknown as FluentSelectType;
            const isValid = target.checkValidity();
            // Set validation message using aria-invalid and title for accessibility
            target.setAttribute('aria-invalid', isValid ? 'false' : 'true');
            target.title = isValid ? '' : 'Please select an option';
        });
    }

    // Fabric validation
    const fabricElement = document.getElementById('fabric-validation');
    const fabricValidation = fabricElement as unknown as FabricSelectType;
    if (fabricValidation) {
        fabricValidation.addEventListener('change', (event: Event) => {
            const target = event.target as unknown as FabricSelectType;
            const isValid = target.checkValidity();
            // Set validation message using aria-invalid and title for accessibility
            target.setAttribute('aria-invalid', isValid ? 'false' : 'true');
            target.title = isValid ? '' : 'Please select an option';
        });
    }

    // Multiple select handlers
    const multiElement = document.querySelector('fluent-select[multiple]');
    const fluentMultiSelect = multiElement as unknown as FluentSelectType;
    if (fluentMultiSelect) {
        fluentMultiSelect.addEventListener('change', (event: Event) => {
            const target = event.target as unknown as FluentSelectType;
            const selectedOptions = Array.from(target.selectedOptions)
                .map(option => (option as unknown as FluentOptionType).value)
                .join(', ');
            console.log('Fluent selected values:', selectedOptions);
        });
    }

    const fabricMultiElement = document.querySelector('fabric-select[multiple]');
    const fabricMultiSelect = fabricMultiElement as unknown as FabricSelectType;
    if (fabricMultiSelect) {
        fabricMultiSelect.addEventListener('change', (event: Event) => {
            const target = event.target as unknown as FabricSelectType;
            const selectedOptions = Array.from(target.selectedOptions)
                .map(option => (option as unknown as FabricOptionType).value)
                .join(', ');
            console.log('Fabric selected values:', selectedOptions);
        });
    }
});
