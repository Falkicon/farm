# Button Component Experiments

This experiment compares the implementation and behavior of button components between Fluent UI Web Components and Fabric Web Components.

## Setup

```typescript
// Register Fluent components
import { ButtonDefinition as FluentButtonDefinition } from '@fluentui/web-components';
FluentButtonDefinition.define(window.customElements);

// Register Fabric components
import { ButtonDefinition as FabricButtonDefinition } from '@fabric-msft/fabric-web';
FabricButtonDefinition.define(window.customElements);

// Set theme
import { setTheme, fabricLightTheme } from "@fabric-msft/theme";
setTheme(fabricLightTheme);
```

## Components Under Test

### Standard Buttons

1. Fluent UI Button
```html
<fluent-button appearance="accent">Primary</fluent-button>
<fluent-button appearance="neutral">Secondary</fluent-button>
<fluent-button appearance="outline">Outline</fluent-button>
<fluent-button appearance="stealth">Stealth</fluent-button>
```

2. Fabric Button
```html
<fabric-button variant="primary">Primary</fabric-button>
<fabric-button variant="secondary">Secondary</fabric-button>
<fabric-button variant="outline">Outline</fabric-button>
<fabric-button variant="subtle">Subtle</fabric-button>
```

### Loading Buttons

1. Fluent UI Loading Button
```html
<fluent-button appearance="accent" ?loading="${loading}">
    ${loading ? 'Loading...' : 'Click to Load'}
</fluent-button>
```

2. Fabric Loading Button
```html
<fabric-button variant="primary" ?loading="${loading}">
    ${loading ? 'Loading...' : 'Click to Load'}
</fabric-button>
```

### Disabled Buttons

1. Fluent UI Disabled Button
```html
<fluent-button appearance="accent" disabled>Disabled</fluent-button>
```

2. Fabric Disabled Button
```html
<fabric-button variant="primary" disabled>Disabled</fabric-button>
```

## Key Differences

1. **Attribute Names**
   - Fluent UI uses `appearance` for variants
   - Fabric uses `variant` for variants
   - Both use standard `disabled` and `loading` attributes

2. **Variant Values**
   - Fluent UI: accent, neutral, outline, stealth
   - Fabric: primary, secondary, outline, subtle

3. **Loading State**
   - Both use boolean `loading` attribute
   - Both maintain button dimensions during loading
   - Both show built-in loading indicators

## Event Handling

```typescript
// Both frameworks use standard DOM events
const button = document.querySelector('fluent-button');
button?.addEventListener('click', async () => {
    const loadingButton = button as HTMLElement & { loading: boolean };
    loadingButton.loading = true;
    await someAsyncOperation();
    loadingButton.loading = false;
});
```

## Accessibility Features

1. **ARIA Attributes**
   - Both automatically set `aria-disabled`
   - Both maintain focus management
   - Both announce loading states

2. **Keyboard Navigation**
   - Both support standard button keyboard interactions
   - Both maintain tab order
   - Both handle space/enter activation

## Test Coverage

1. **Rendering Tests**
   - Component registration
   - Attribute application
   - Content rendering

2. **State Tests**
   - Loading state transitions
   - Disabled state behavior
   - Event handling

3. **Accessibility Tests**
   - ARIA attribute presence
   - Keyboard interaction
   - Focus management

## Migration Considerations

1. **Attribute Mapping**
```typescript
// Fluent UI to Fabric mapping
accent    -> primary
neutral   -> secondary
outline   -> outline
stealth   -> subtle
```

2. **Event Handling**
   - Direct replacement possible
   - No special handling needed
   - Standard DOM events maintained

3. **Loading State**
   - Compatible loading APIs
   - Similar loading indicators
   - Consistent behavior

## Performance Notes

1. **Bundle Size**
   - Fluent UI Button: ~XKB
   - Fabric Button: ~YKB
   - Similar impact on initial load

2. **Runtime Performance**
   - Both optimize rendering
   - Both handle state changes efficiently
   - Both manage memory well

## Next Steps

1. [ ] Measure exact bundle size impact
2. [ ] Test with different loading durations
3. [ ] Document edge cases
4. [ ] Create migration utilities
