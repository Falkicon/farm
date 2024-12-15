/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { ButtonDefinition } from '@fluentui/web-components';
import { LoadingButtonDefinition } from '@fabric-msft/fabric-web';
import type {
    FluentComponents,
    FabricComponents,
    ComponentEventHandler,
    ComponentEventMap,
    ComponentEventTarget,
    FASTElementDefinition,
    BaseComponent
} from '../types/global';

// Utility function for type casting
function createComponent<T extends BaseComponent>(
    tagName: string,
    definition: FASTElementDefinition<T> | null
): T & ComponentEventTarget {
    const element = document.createElement(tagName) as unknown as T & ComponentEventTarget;
    if (definition?.prototype) {
        Object.setPrototypeOf(element, definition.prototype);
    }
    return element;
}

// Utility function for event handler attachment
function attachEventHandler<K extends keyof ComponentEventMap>(
    element: ComponentEventTarget,
    eventName: K,
    handler: ComponentEventHandler<K>
): void {
    element.addEventListener(eventName, handler);
}

// Type test function to verify component types
function testComponentTypes(): void {
    // Register components
    ButtonDefinition.define(window.customElements);
    LoadingButtonDefinition.define(window.customElements);

    // Button type tests
    const fluentButton = createComponent<FluentComponents['Button']>(
        'fluent-button',
        ButtonDefinition as unknown as FASTElementDefinition<FluentComponents['Button']>
    );
    fluentButton.appearance = 'accent';
    fluentButton.disabled = false;

    attachEventHandler(fluentButton, 'click', function(this: HTMLElement, _ev: MouseEvent): void {
        console.log(this.getAttribute('appearance'));
    });

    const fabricButton = createComponent<FabricComponents['LoadingButton']>(
        'fabric-loading-button',
        LoadingButtonDefinition as unknown as FASTElementDefinition<FabricComponents['LoadingButton']>
    );
    fabricButton.variant = 'primary';
    fabricButton.disabled = false;
    fabricButton.loading = false;

    attachEventHandler(fabricButton, 'click', function(this: HTMLElement, _ev: MouseEvent): void {
        console.log(this.getAttribute('variant'));
    });

    // TextField type tests
    const fluentTextField = createComponent<FluentComponents['TextField']>(
        'fluent-text-field',
        null
    );
    fluentTextField.value = 'test';
    fluentTextField.setAttribute('placeholder', 'Enter text');
    fluentTextField.disabled = false;

    attachEventHandler(fluentTextField, 'input', function(this: HTMLElement, _ev: Event): void {
        const target = this as unknown as FluentComponents['TextField'];
        console.log(target.value);
    });

    // Select type tests
    const fluentSelect = createComponent<FluentComponents['Select']>(
        'fluent-select',
        null
    );
    fluentSelect.value = 'test';
    fluentSelect.disabled = false;

    attachEventHandler(fluentSelect, 'change', function(this: HTMLElement, _ev: Event): void {
        const target = this as unknown as FluentComponents['Select'];
        console.log(target.value);
    });

    // Option type tests
    const fluentOption = createComponent<FluentComponents['Option']>(
        'fluent-option',
        null
    );
    fluentOption.value = 'test';
    fluentOption.selected = true;

    // Checkbox type tests
    const fluentCheckbox = createComponent<FluentComponents['Checkbox']>(
        'fluent-checkbox',
        null
    );
    fluentCheckbox.checked = true;
    fluentCheckbox.disabled = false;

    attachEventHandler(fluentCheckbox, 'change', function(this: HTMLElement, _ev: Event): void {
        const target = this as unknown as FluentComponents['Checkbox'];
        console.log(target.checked);
    });
}

// Form integration tests
function testFormIntegration(): void {
    const form = document.createElement('form');

    const fluentButton = createComponent<FluentComponents['Button']>(
        'fluent-button',
        ButtonDefinition as unknown as FASTElementDefinition<FluentComponents['Button']>
    );
    form.appendChild(fluentButton as unknown as Node);

    const fluentTextField = createComponent<FluentComponents['TextField']>(
        'fluent-text-field',
        null
    );
    form.appendChild(fluentTextField as unknown as Node);

    const fluentSelect = createComponent<FluentComponents['Select']>(
        'fluent-select',
        null
    );
    form.appendChild(fluentSelect as unknown as Node);
}

// Export test functions
export {
    testComponentTypes,
    testFormIntegration,
    createComponent,
    attachEventHandler
};
