import { components } from '../../../types/component-bridge';
import type { FluentButtonType } from '../../../types/component-bridge';

const { provideDesignSystem } = components.fluent;

export function createStandardButton(): FluentButtonType {
    provideDesignSystem();
    const button = document.createElement('fluent-button') as unknown as FluentButtonType;
    button.appearance = 'neutral';
    button.textContent = 'Standard Button';
    return button;
}

export function createAccentButton(): FluentButtonType {
    provideDesignSystem();
    const button = document.createElement('fluent-button') as unknown as FluentButtonType;
    button.appearance = 'accent';
    button.textContent = 'Accent Button';
    return button;
}
