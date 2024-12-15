import { components } from '../../../types/component-bridge';
import type { FluentButtonType, FabricButtonType } from '../../../types/component-bridge';

// Register Fluent Design System
components.fluent.provideDesignSystem();

// Register Fabric Design System
components.fabric.provideDesignSystem();

// Example usage in your code
export function createFluentButton(): FluentButtonType {
    const button = document.createElement('fluent-button') as unknown as FluentButtonType;
    button.textContent = 'Fluent Button';
    return button;
}

export function createFabricButton(): FabricButtonType {
    const button = document.createElement('fabric-button') as unknown as FabricButtonType;
    button.textContent = 'Fabric Button';
    return button;
}
