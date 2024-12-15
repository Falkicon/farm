import { components } from '../../../types/component-bridge';
import type { FluentTextFieldType, FabricTextFieldType } from '../../../types/component-bridge';

const { provideDesignSystem } = components.fluent;

export function createFluentTextField(placeholder: string): FluentTextFieldType {
    provideDesignSystem();
    const input = document.createElement('fluent-text-field') as unknown as FluentTextFieldType;
    input.placeholder = placeholder;
    return input;
}

export function createFabricTextField(placeholder: string): FabricTextFieldType {
    components.fabric.provideDesignSystem();
    const input = document.createElement('fabric-text-field') as unknown as FabricTextFieldType;
    input.placeholder = placeholder;
    return input;
}

// Setup validation handlers
document.addEventListener('DOMContentLoaded', () => {
    // Fluent validation
    const element = document.getElementById('fluent-validation');
    const fluentValidation = element as unknown as FluentTextFieldType;
    if (fluentValidation) {
        fluentValidation.addEventListener('input', (event: Event) => {
            const target = event.target as unknown as FluentTextFieldType;
            const isValid = target.checkValidity();
            // Set validation message using aria-invalid and title for accessibility
            target.setAttribute('aria-invalid', isValid ? 'false' : 'true');
            target.title = isValid ? '' : 'Please enter a valid email address';
        });
    }

    // Fabric validation
    const fabricElement = document.getElementById('fabric-validation');
    const fabricValidation = fabricElement as unknown as FabricTextFieldType;
    if (fabricValidation) {
        fabricValidation.addEventListener('input', (event: Event) => {
            const target = event.target as unknown as FabricTextFieldType;
            const isValid = target.checkValidity();
            // Set validation message using aria-invalid and title for accessibility
            target.setAttribute('aria-invalid', isValid ? 'false' : 'true');
            target.title = isValid ? '' : 'Please enter a valid email address';
        });
    }
});
