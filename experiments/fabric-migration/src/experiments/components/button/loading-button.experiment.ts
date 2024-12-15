import { components } from '../../../types/component-bridge';
import type { FabricButtonType } from '../../../types/component-bridge';

const { provideDesignSystem } = components.fabric;

export function createLoadingButton(): FabricButtonType {
    provideDesignSystem();
    const button = document.createElement('fabric-button') as unknown as FabricButtonType;
    button.appearance = 'primary';
    button.loading = true;
    return button;
}

export function createSubmitButton(): FabricButtonType {
    provideDesignSystem();
    const button = document.createElement('fabric-button') as unknown as FabricButtonType;
    button.appearance = 'primary';
    button.type = 'submit';
    button.textContent = 'Submit';
    return button;
}
