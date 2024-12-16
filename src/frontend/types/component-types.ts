/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Base component interface
export interface BaseComponent extends HTMLElement {
    disabled?: boolean;
    appearance?: string;
}

// Fabric button interface
export interface FabricLoadingButton extends BaseComponent {
    loading: boolean;
    loadingText?: string;
    type?: 'button' | 'submit' | 'reset';
}

// Fluent checkbox interface
export interface FluentCheckbox extends BaseComponent {
    checked: boolean;
    indeterminate: boolean;
    value?: string;
    required?: boolean;
    readonly?: boolean;
}
