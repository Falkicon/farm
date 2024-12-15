# Installing and Using Fluent UI & Fabric Web Components

This guide will walk you through setting up and using Microsoft's Fluent UI and Fabric Web Components in your web application.

## Overview

The Fabric UX System represents a leap forward in design consistency and extensibility for Microsoft Fabric. Developed by the Fabric UX Team, this system is a collection of design guidance, common patterns, and reusable components created to empower designers and developers to build consistent, accessible, and engaging workload experiences across Fabric surfaces.

## Project Structure

A basic Fluent UI & Fabric Web Components project requires these files:
- `package.json` - Defines project dependencies
- `tsconfig.json` - TypeScript configuration
- `index.html` - Entry point HTML file
- `index.ts` - Main TypeScript file
- `style.css` - Stylesheet for custom styles (optional)

## Prerequisites

- Node.js and npm installed
- A TypeScript project setup (recommended)
- Vite or similar modern bundler (recommended)

## Installation

You can install the dependencies using either npm or yarn:

Using npm:
```bash
npm install @fabric-msft/fabric-web@2.0.0-beta.4 \
            @fabric-msft/theme@1.0.0-beta \
            @fluentui/web-components@3.0.0-beta.74 \
            @microsoft/fast-element@2.0.0-beta.26
```

Using yarn:
```bash
yarn add -D @fabric-msft/fabric-web@2.0.0-beta.4 \
           @fabric-msft/theme@1.0.0-beta \
           @fluentui/web-components@3.0.0-beta.74 \
           @microsoft/fast-element@2.0.0-beta.26
```

> **Note**: These are beta versions. Check for the latest stable versions when setting up your project.

## Important Setup Steps

### 1. Component Registration Order

Components must be registered before use and before theme setup:

```typescript
// Import components
import { LoadingButtonDefinition } from '@fabric-msft/fabric-web';
import { ButtonDefinition } from '@fluentui/web-components';

// Register components
LoadingButtonDefinition.define(window.customElements);
ButtonDefinition.define(window.customElements);

// Import and set theme AFTER registration
import { setTheme, fabricLightTheme } from "@fabric-msft/theme";
setTheme(fabricLightTheme);
```

### 2. TypeScript Configuration

Create or update your `tsconfig.json` with these settings:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "useDefineForClassFields": false,
    "experimentalDecorators": true
  }
}
```

### 3. Type System Setup

#### Required Type References
Add these type references at the top of your TypeScript files:
```typescript
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="webworker" />
/// <reference lib="es2022" />
```

#### Base Component Interface
All components must extend the base component interface:
```typescript
interface BaseComponent extends HTMLElement {
    disabled?: boolean;
    form?: HTMLFormElement | null;
    checkValidity(): boolean;
    attachInternals(): DOMElementInternals;
}
```

#### Component Event Target
Components need both event handling and DOM manipulation capabilities:
```typescript
interface ComponentEventTarget extends EventTarget {
    // Event handling
    addEventListener<K extends keyof ComponentEventMap>(
        type: K,
        listener: ComponentEventHandler<K>,
        options?: boolean | AddEventListenerOptions
    ): void;

    // DOM manipulation
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    removeAttribute(name: string): void;
    hasAttribute(name: string): boolean;
    toggleAttribute(name: string, force?: boolean): boolean;

    // Essential properties
    id: string;
    className: string;
    classList: DOMTokenList;
    tagName: string;
    textContent: string | null;
    innerHTML: string;
    outerHTML: string;
}
```

#### Type Casting Patterns
Use proper type casting when creating components:
```typescript
// Component creation
const button = document.createElement('fluent-button') as unknown as FluentButtonType;

// Event handling
element.addEventListener('click', (event: Event) => {
    const target = event.target as unknown as FluentButtonType;
});

// Form integration
form.appendChild(component as unknown as Node);
```

#### Type System Best Practices

1. **Component Inheritance**
   - Always extend BaseComponent for new component interfaces
   - Include all required DOM methods and properties
   - Properly handle event types and handlers

2. **Type Casting**
   - Use `as unknown as Type` for DOM element creation
   - Cast through `unknown` when converting between types
   - Maintain proper type safety in event handlers

3. **DOM Integration**
   - Include proper DOM type references
   - Ensure components have access to required DOM methods
   - Handle form integration with proper type casting

4. **Event Handling**
   - Define proper event handler types
   - Maintain correct `this` context
   - Use strongly typed event targets

5. **Type Validation**
   - Test component type definitions
   - Verify DOM method availability
   - Validate event handling types

#### Common Type Issues and Solutions

1. **Missing DOM Methods**
   ```typescript
   // Wrong
   interface Button extends EventTarget { ... }

   // Correct
   interface Button extends BaseComponent { ... }
   ```

2. **Event Handler Types**
   ```typescript
   // Wrong
   element.addEventListener('click', (e) => {});

   // Correct
   element.addEventListener('click', function(this: HTMLElement, e: MouseEvent) {});
   ```

3. **Component Registration**
   ```typescript
   // Wrong
   const button = document.createElement('fluent-button');

   // Correct
   const button = document.createElement('fluent-button') as unknown as FluentButtonType;
   ```

4. **Form Integration**
   ```typescript
   // Wrong
   form.appendChild(component);

   // Correct
   form.appendChild(component as unknown as Node);
   ```

## Styling Components

### Using Shadow DOM Parts

Components use shadow DOM for style encapsulation. Style them using ::part():

```css
fluent-text-area::part(control) {
    min-height: 100px;
    width: 100%;
}

fluent-slider::part(track) {
    width: 100%;
}

fluent-field::part(root) {
    margin-bottom: 16px;
    display: block;
}
```

### Component Attributes

Components support various attributes for customization:

```html
<!-- Size variants -->
<fluent-button size="large">Button</fluent-button>

<!-- Appearance variants -->
<fluent-button appearance="accent">Accent Button</fluent-button>
<fabric-loading-button appearance="primary">Submit</fabric-loading-button>

<!-- State attributes -->
<fluent-text-area required></fluent-text-area>
<fluent-slider disabled></fluent-slider>
```

## Using Slots

Components use slots for content projection:

```html
<fluent-field label-position="above">
    <label slot="label">Field Label</label>
    <fluent-text-area slot="input"></fluent-text-area>
</fluent-field>
```

## Event Handling

Handle component events with proper type assertions:

```typescript
const button = document.querySelector('fabric-loading-button');
button?.addEventListener('click', () => {
    const loadingButton = button as HTMLElement & { loading: boolean };
    loadingButton.loading = true;
    // Handle click
    setTimeout(() => {
        loadingButton.loading = false;
    }, 1000);
});
```

## Best Practices

1. **Component Registration**:
   - Always register components before using them
   - Register components before setting the theme
   - Group registrations by library (Fabric vs Fluent)

2. **Styling**:
   - Use shadow DOM parts for styling
   - Avoid direct element styling when possible
   - Use component attributes for variants

3. **TypeScript**:
   - Define interfaces for custom elements
   - Use proper type assertions
   - Handle null checks appropriately

4. **Performance**:
   - Register only the components you need
   - Use lazy loading for complex components
   - Minimize direct DOM manipulation

## Common Issues and Solutions

1. **Components Not Rendering**:
   - Verify component registration order
   - Check theme setup
   - Ensure proper slot usage

2. **Styling Not Applied**:
   - Use ::part() selectors
   - Check component documentation for available parts
   - Verify style scope and specificity

3. **Type Errors**:
   - Add proper DOM type references
   - Define custom element interfaces
   - Use correct type assertions

## VS Code Setup

For the best development experience in VS Code, add these settings:

```json
{
  "html.customData": [
    "./node_modules/@fabric-msft/fabric-web/dist/fabric-web.html.json"
  ],
  "css.customData": [
    "./node_modules/@fabric-msft/fabric-web/dist/fabric-web.css.json"
  ]
}
```

## Notes

- This documentation uses beta versions of the components. Check for the latest stable versions when setting up your project.
- Components from both `@fabric-msft/fabric-web` and `@fluentui/web-components` can be used together.
- Always refer to the official Microsoft documentation for the most up-to-date information.
- Test components thoroughly in your target browsers.
- Consider accessibility requirements when implementing components.

## Type System Best Practices

1. **Type Casting**:
   - Always use `as unknown as Type` for component type casting
   - Split complex type casting into multiple steps
   - Use intermediate variables for clarity

2. **Component Types**:
   - Create proper interfaces extending `BaseElement`
   - Use consistent naming with `Type` suffix
   - Keep component interfaces aligned with DOM properties

3. **Event Handling**:
   - Type event handlers properly
   - Use intermediate variables for event targets
   - Handle event target type casting safely

4. **Design System**:
   - Initialize design system before component registration
   - Use wrapper functions for initialization
   - Follow consistent registration patterns

5. **Type Imports**:
   - Import DOM types directly from TypeScript
   - Use type imports with `import type`
   - Keep imports organized by category

## Common Type System Issues

1. **Missing DOM Properties**:
   - Add proper DOM type references
   - Extend from `BaseElement`
   - Import required DOM types

2. **Type Casting Errors**:
   - Use double casting with `unknown`
   - Create intermediate variables
   - Use proper type suffixes

3. **Component Registration**:
   - Verify component names match exports
   - Register components in correct order
   - Use proper design system initialization

## Component Registration

There are two recommended approaches for component registration:

### 1. Direct Registration
```typescript
import { LoadingButtonDefinition } from '@fabric-msft/fabric-web';
import { ButtonDefinition } from '@fluentui/web-components';

// Register individual components
LoadingButtonDefinition.define(window.customElements);
ButtonDefinition.define(window.customElements);
```

### 2. Design System Registration (Recommended)
```typescript
import { components } from './types/component-bridge';

// Register Fluent components
components.fluent.provideDesignSystem();

// Register Fabric components
components.fabric.provideDesignSystem();
```

The Design System approach is recommended as it:
- Ensures correct registration order
- Handles dependencies automatically
- Provides consistent initialization
- Supports proper type inference

## Component Bridge Pattern

The project uses a component bridge pattern to unify Fluent and Fabric components:

```typescript
// component-bridge.ts
export const components = {
    fluent: {
        button: ButtonDefinition,
        provideDesignSystem: () => {
            ButtonDefinition.define(window.customElements);
            // Other component definitions...
        }
    },
    fabric: {
        button: LoadingButtonDefinition,
        provideDesignSystem: () => {
            LoadingButtonDefinition.define(window.customElements);
            // Other component definitions...
        }
    }
};
```

## Test Utilities

The project includes test utilities for component testing:

```typescript
// setup.ts
beforeEach(() => {
    // Reset custom elements registry
    window.customElements = new MockCustomElementRegistry();

    // Initialize design system
    components.fluent.provideDesignSystem();
    components.fabric.provideDesignSystem();
});

// Component test example
test('button renders correctly', () => {
    const button = document.createElement('fluent-button') as FluentButtonType;
    expect(button).toBeDefined();
});
```

## Type System Implementation

### Global Type Declarations

Create a `global.d.ts` file to define component interfaces:

```typescript
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="webworker" />
/// <reference lib="es2022" />

interface BaseComponent extends HTMLElement {
    disabled?: boolean;
    form?: HTMLFormElement | null;
    checkValidity(): boolean;
    attachInternals(): DOMElementInternals;
}

interface ComponentEventTarget extends EventTarget {
    // Event handling
    addEventListener<K extends keyof ComponentEventMap>(
        type: K,
        listener: ComponentEventHandler<K>,
        options?: boolean | AddEventListenerOptions
    ): void;

    // DOM manipulation
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    removeAttribute(name: string): void;
    hasAttribute(name: string): boolean;
    toggleAttribute(name: string, force?: boolean): boolean;

    // Essential properties
    id: string;
    className: string;
    classList: DOMTokenList;
    tagName: string;
    textContent: string | null;
    innerHTML: string;
    outerHTML: string;
}

// Component type definitions
declare namespace Components {
    interface Button extends BaseComponent {
        appearance?: 'accent' | 'lightweight' | 'neutral' | 'outline' | 'stealth';
        disabled?: boolean;
        form?: string;
        formaction?: string;
        formenctype?: string;
        formmethod?: string;
        formnovalidate?: boolean;
        formtarget?: string;
        type?: 'button' | 'submit' | 'reset';
        value?: string;
    }

    interface LoadingButton extends Button {
        loading?: boolean;
    }
}
```

### Type Casting Best Practices

1. **Component Creation**
```typescript
// Correct way to create and type cast components
const button = document.createElement('fluent-button') as unknown as FluentButtonType;
const loadingButton = document.createElement('fabric-loading-button') as unknown as FabricLoadingButtonType;
```

2. **Event Handling**
```typescript
// Proper event handler typing
element.addEventListener('click', function(this: HTMLElement, e: MouseEvent) {
    const target = e.target as unknown as FluentButtonType;
    // Handle event
});
```

3. **Form Integration**
```typescript
// Safe form component integration
const form = document.createElement('form');
const input = document.createElement('fluent-text-field') as unknown as FluentTextFieldType;
form.appendChild(input as unknown as Node);
```

### Type Testing

Create type tests to verify component interfaces:

```typescript
// type-tests.ts
import { components } from './types/component-bridge';

describe('Component Types', () => {
    beforeEach(() => {
        components.fluent.provideDesignSystem();
        components.fabric.provideDesignSystem();
    });

    test('Button types are correct', () => {
        const button = document.createElement('fluent-button') as FluentButtonType;
        expect(button.disabled).toBeDefined();
        expect(button.appearance).toBeDefined();
    });
});
```

### DOM Type Usage
```typescript
// Step 1: Add triple-slash references
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

// Step 2: Add type aliases for ESLint compatibility
type Node = globalThis.Node;
type HTMLCollection = globalThis.HTMLCollection;
type HTMLElementEventMap = globalThis.HTMLElementEventMap;

// Step 3: Use types directly in your code
interface MyComponent extends HTMLElement {
    children: HTMLCollection;
    // ... other properties and methods
}
```

> **Note**: When using DOM types with ESLint, prefer using type aliases from `globalThis` instead of direct imports from lib.dom.d.ts.
