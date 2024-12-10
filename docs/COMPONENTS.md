# Component Documentation

## Shared Components

### AppButton

A fully accessible, customizable button component with primary and secondary variants.

#### Usage

```typescript
import { AppButton } from '@shared/components';

// Primary button
<app-button>Click me</app-button>

// Secondary button
<app-button variant="secondary">Cancel</app-button>

// Disabled state
<app-button disabled>Unavailable</app-button>
```

#### Properties

| Name      | Type                    | Default   | Description                    |
|-----------|-------------------------|-----------|--------------------------------|
| variant   | 'primary' \| 'secondary'| 'primary' | Button style variant          |
| size      | 'small' \| 'medium' \| 'large' | 'medium' | Button size           |
| disabled  | boolean                | false     | Disables button interactions   |
| loading   | boolean                | false     | Shows loading state           |
| ariaLabel | string                 | null      | Accessibility label           |

### AppCard

A container component for grouping related content.

#### Usage

```typescript
import { AppCard } from '@shared/components';

<app-card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</app-card>
```

### AppInput

A form input component with built-in label and validation support.

#### Usage

```typescript
import { AppInput } from '@shared/components';

<app-input
  label="Username"
  placeholder="Enter username"
  @change=${(e) => console.log(e.detail)}
></app-input>
```

#### Properties

| Name        | Type    | Default | Description                    |
|-------------|---------|---------|--------------------------------|
| label       | string  | ''      | Input label text              |
| placeholder | string  | ''      | Input placeholder text        |
| value       | string  | ''      | Input value                   |

## Core Components

### ErrorBoundary

A component that catches and handles errors in its child components.

#### Usage

```typescript
import { ErrorBoundary } from '@frontend/core/error';

<error-boundary>
  <my-component></my-component>
</error-boundary>
```

#### Properties

| Name            | Type    | Default | Description                |
|-----------------|---------|---------|----------------------------|
| fallbackMessage | string  | 'Something went wrong' | Error message |
| showDetails     | boolean | false   | Show error stack trace     |

## Feature Components

### HomePage

The main landing page component.

#### Usage

```typescript
import { HomePage } from '@frontend/features/home';

<home-page></home-page>
```

## Best Practices

1. **Accessibility**
    - Include ARIA labels
    - Support keyboard navigation
    - Test with screen readers

2. **Performance**
    - Use lazy loading when appropriate
    - Monitor render performance
    - Optimize re-renders

3. **Testing**
    - Write unit tests
    - Include accessibility tests
    - Test error states

4. **Documentation**
    - Document all properties
    - Include usage examples
    - Note any dependencies
  