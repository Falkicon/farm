# Slider Component

The Slider component provides an input for selecting a value from a range.

## Class: Slider

Extends `FASTElement`

### Properties

- `direction: Direction` - Text direction
- `disabled: boolean` - Whether the slider is disabled
- `max: string` - Maximum value
- `min: string` - Minimum value
- `mode: SliderMode` - Mode of operation
- `orientation?: Orientation` - Orientation of the slider
- `step: string` - Step increment value
- `value: string` - Current value
- `valueAsNumber: number` - Current value as number
- `valueTextFormatter: (value: string) => string` - Function to format value text

### Methods

- `checkValidity(): boolean` - Checks if the slider is valid
- `decrement()` - Decrements the value
- `increment()` - Increments the value
- `reportValidity(): boolean` - Reports validity state
- `setCustomValidity(message: string)` - Sets custom validation message

### Form Association

- `static formAssociated: boolean` - Indicates form association capability
- `form: HTMLFormElement | null` - Associated form element
- `labels: ReadonlyArray<Node>` - Associated label elements
- `validationMessage: string` - Current validation message
- `validity: ValidityState` - Validation state
- `willValidate: boolean` - Whether the element will be validated

## Types

### SliderMode

```typescript
type SliderMode = "single-value"
```

### SliderOrientation

```typescript
type SliderOrientation = "horizontal" | "vertical"
```

### SliderSize

```typescript
type SliderSize = "small" | "medium"
```

## Usage Example

```html
<fluent-slider
  min="0"
  max="100"
  step="1"
  value="50"
  orientation="horizontal"
>
</fluent-slider>
```
