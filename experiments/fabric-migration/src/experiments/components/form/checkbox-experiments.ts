import { components } from '../../../types/component-bridge';
import type { FluentCheckboxType } from '../../../types/component-bridge';

// Initialize Fluent Design System
components.fluent.provideDesignSystem();

// Create Fluent checkbox
export function createFluentCheckbox(): FluentCheckboxType {
    const checkbox = document.createElement('fluent-checkbox');
    return checkbox as unknown as FluentCheckboxType;
}

// Setup validation handlers
document.addEventListener('DOMContentLoaded', () => {
    // Fluent validation
    const fluentValidation = document.getElementById('fluent-validation');
    if (fluentValidation) {
        const typedValidation = fluentValidation as unknown as FluentCheckboxType;
        typedValidation.addEventListener('change', (event: Event) => {
            const target = event.target as unknown as FluentCheckboxType;
            const isValid = target.checkValidity();
            // Set validation message using aria-invalid and title for accessibility
            target.setAttribute('aria-invalid', isValid ? 'false' : 'true');
            target.title = isValid ? '' : 'Please check this box';
        });
    }

    // Indeterminate state handlers
    const fluentIndeterminate = document.querySelector('fluent-checkbox[indeterminate]');
    if (fluentIndeterminate) {
        const typedIndeterminate = fluentIndeterminate as unknown as FluentCheckboxType;
        typedIndeterminate.addEventListener('change', (event: Event) => {
            const target = event.target as unknown as FluentCheckboxType;
            if (target.indeterminate) {
                target.indeterminate = false;
                target.checked = true;
            }
        });
    }
});
