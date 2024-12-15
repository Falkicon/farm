/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Import DOM types for ESLint
type Node = globalThis.Node;
type HTMLCollection = globalThis.HTMLCollection;
type HTMLElementEventMap = globalThis.HTMLElementEventMap;
type AddEventListenerOptions = globalThis.AddEventListenerOptions;
type EventListenerOptions = globalThis.EventListenerOptions;
type HTMLCollectionOf<T extends Element> = globalThis.HTMLCollectionOf<T>;
type HTMLOptionElement = globalThis.HTMLOptionElement;
type HTMLFormElement = globalThis.HTMLFormElement;

import {
    ButtonDefinition,
    FieldDefinition,
    SliderDefinition,
    LinkDefinition,
    CheckboxDefinition
} from '@fluentui/web-components';

import {
    LoadingButtonDefinition
} from '@fabric-msft/fabric-web';

import {
    setTheme as setFabricTheme,
    fabricLightTheme
} from '@fabric-msft/theme';

// Export components in the old structure for backward compatibility
export const components = {
    fluent: {
        button: ButtonDefinition,
        textField: FieldDefinition,
        select: SliderDefinition,
        option: LinkDefinition,
        checkbox: CheckboxDefinition,
        provideDesignSystem: () => {
            ButtonDefinition.define(window.customElements);
            FieldDefinition.define(window.customElements);
            SliderDefinition.define(window.customElements);
            LinkDefinition.define(window.customElements);
            CheckboxDefinition.define(window.customElements);
        }
    },
    fabric: {
        button: LoadingButtonDefinition,
        provideDesignSystem: () => {
            LoadingButtonDefinition.define(window.customElements);
        }
    }
};

// Export theme setup
export {
    setFabricTheme,
    fabricLightTheme
};

// Export component values for registration
export {
    ButtonDefinition as FluentButton,
    FieldDefinition as FluentTextField,
    SliderDefinition as FluentSelect,
    LinkDefinition as FluentOption,
    CheckboxDefinition as FluentCheckbox,
    LoadingButtonDefinition as FabricButton
};

// Base interface for all components
export interface BaseElement extends HTMLElement {
    // Node properties
    appendChild<T extends Node>(node: T): T;
    children: HTMLCollection;
    textContent: string | null;

    // Element properties
    getAttribute(name: string): string | null;
    setAttribute(name: string, value: string): void;

    // Event handling
    addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
        options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
        options?: boolean | EventListenerOptions
    ): void;

    // Common methods
    click(): void;
    focus(): void;
    blur(): void;
}

// Export component types
export interface FluentButtonType extends BaseElement {
    appearance: string;
    disabled: boolean;
    type: 'button' | 'submit' | 'reset';
    variant: string;
    loading: boolean;
    checkValidity(): boolean;
}

export interface FluentTextFieldType extends BaseElement {
    value: string;
    placeholder: string;
    disabled: boolean;
    title: string;
    required: boolean;
    readOnly: boolean;
    type: string;
    checkValidity(): boolean;
    reportValidity(): boolean;
}

export interface FluentSelectType extends BaseElement {
    value: string;
    disabled: boolean;
    title: string;
    required: boolean;
    multiple: boolean;
    selectedOptions: HTMLCollectionOf<HTMLOptionElement>;
    checkValidity(): boolean;
    reportValidity(): boolean;
}

export interface FluentOptionType extends BaseElement {
    value: string;
    selected: boolean;
    disabled: boolean;
    defaultSelected: boolean;
    index: number;
}

export interface FluentCheckboxType extends BaseElement {
    checked: boolean;
    disabled: boolean;
    indeterminate: boolean;
    title: string;
    required: boolean;
    defaultChecked: boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
}

export interface FabricButtonType extends BaseElement {
    appearance: string;
    loading: boolean;
    disabled: boolean;
    type: 'button' | 'submit' | 'reset';
    form: HTMLFormElement | null;
    formAction: string;
    formEnctype: string;
    formMethod: string;
    formNoValidate: boolean;
    formTarget: string;
    name: string;
    value: string;
    variant: string;
    checkValidity(): boolean;
}

// Re-export Fluent types as Fabric types for backward compatibility
export type FabricTextFieldType = FluentTextFieldType;
export type FabricSelectType = FluentSelectType;
export type FabricOptionType = FluentOptionType;
export type FabricCheckboxType = FluentCheckboxType;

