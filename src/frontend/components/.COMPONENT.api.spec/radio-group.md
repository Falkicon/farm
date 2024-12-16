# Radio Group Component

The RadioGroup component provides a container for a set of related radio buttons.

## Class: RadioGroup

Extends `FASTElement`

### Properties

- `checkedIndex: number` - Index of the checked radio button
- `disabled: boolean` - Whether the group is disabled
- `name: string` - Name of the radio group
- `orientation?: RadioGroupOrientation` - Orientation of the radio buttons
- `radios: Radio[]` - Collection of radio buttons
- `required: boolean` - Whether selection is required
- `value: string | null` - Current selected value

### Methods

- `checkRadio(index?: number)` - Checks the radio at given index
- `checkValidity(): boolean` - Checks if the group is valid
- `focus()` - Focuses the group
- `reportValidity(): boolean` - Reports validity state
- `setFormValue(value: File | string | FormData | null, state?: File | string | FormData | null)`
- `setValidity(flags?: Partial<ValidityState>, message?: string, anchor?: HTMLElement)`

### Event Handlers

- `changeHandler(e: Event): boolean | void`
- `clickHandler(e: MouseEvent): boolean | void`
- `disabledRadioHandler(e: CustomEvent)`
- `focusinHandler(e: FocusEvent): boolean | void`
- `focusoutHandler(e: FocusEvent): boolean | void`
- `keydownHandler(e: KeyboardEvent): boolean | void`
- `slotchangeHandler(e: Event)`

## Types

### RadioGroupOrientation

```typescript
type RadioGroupOrientation = "horizontal" | "vertical"
```

## Styles & Template

- `RadioGroupStyles: ElementStyles` - Styles for the radio group
- `RadioGroupTemplate: ElementViewTemplate<RadioGroup>` - Template for rendering the radio group

## Definition

```typescript
export const RadioGroupDefinition: FASTElementDefinition<typeof RadioGroup>
```

## Usage Example

```html
<fluent-radio-group
  name="options"
  orientation="vertical"
  required
>
  <fluent-radio value="option1">Option 1</fluent-radio>
  <fluent-radio value="option2">Option 2</fluent-radio>
  <fluent-radio value="option3">Option 3</fluent-radio>
</fluent-radio-group>
```
