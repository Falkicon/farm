import { describe, it, expect, beforeEach } from 'vitest';
import { components } from '../../../types/component-bridge';
import type { FluentCheckboxType } from '../../../types/component-bridge';

describe('Checkbox Component Tests', () => {
    beforeEach(() => {
        // Initialize design system
        components.fluent.provideDesignSystem();
    });

    describe('Fluent Checkbox', () => {
        it('should create a fluent checkbox with default state', () => {
            const checkbox = document.createElement('fluent-checkbox');
            const typedCheckbox = checkbox as unknown as FluentCheckboxType;
            expect(typedCheckbox.checked).toBe(false);
            expect(typedCheckbox.disabled).toBe(false);
        });

        it('should update checked state', () => {
            const checkbox = document.createElement('fluent-checkbox');
            const typedCheckbox = checkbox as unknown as FluentCheckboxType;
            typedCheckbox.checked = true;
            expect(typedCheckbox.checked).toBe(true);
        });

        it('should handle disabled state', () => {
            const checkbox = document.createElement('fluent-checkbox');
            const typedCheckbox = checkbox as unknown as FluentCheckboxType;
            typedCheckbox.disabled = true;
            expect(typedCheckbox.disabled).toBe(true);
        });

        it('should trigger change event', () => {
            const checkbox = document.createElement('fluent-checkbox');
            const typedCheckbox = checkbox as unknown as FluentCheckboxType;
            let changed = false;
            typedCheckbox.addEventListener('change', () => {
                changed = true;
            });
            typedCheckbox.click();
            expect(changed).toBe(true);
        });
    });
});
