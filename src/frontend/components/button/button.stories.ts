import { html } from 'lit';
import type { Meta, StoryFn } from '@storybook/web-components';
import './button';
import type { ButtonAppearance, ButtonShape, ButtonSize } from './button';

interface ButtonStoryArgs {
    appearance: ButtonAppearance;
    shape: ButtonShape;
    size: ButtonSize;
    disabled: boolean;
    iconOnly: boolean;
}

export default {
    title: 'Components/FluentLitButton',
    component: 'fluent-lit-button',
    argTypes: {
        appearance: {
            control: 'select',
            options: ['primary', 'outline', 'subtle', 'transparent'],
        },
        shape: {
            control: 'select',
            options: ['circular', 'rounded', 'square'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        disabled: { control: 'boolean' },
        iconOnly: { control: 'boolean' },
    },
} as Meta<ButtonStoryArgs>;

const Template: StoryFn<ButtonStoryArgs> = ({ appearance, shape, size, disabled, iconOnly }) => html`
    <fluent-lit-button
        appearance=${appearance}
        shape=${shape}
        size=${size}
        ?disabled=${disabled}
        ?iconOnly=${iconOnly}
    >
        ${iconOnly ? '★' : 'Button Text'}
    </fluent-lit-button>
`;

export const Primary = Template.bind({});
Primary.args = {
    appearance: 'primary',
    shape: 'rounded',
    size: 'medium',
    disabled: false,
    iconOnly: false,
};

export const Outline = Template.bind({});
Outline.args = {
    ...Primary.args,
    appearance: 'outline',
};

export const Subtle = Template.bind({});
Subtle.args = {
    ...Primary.args,
    appearance: 'subtle',
};

export const Transparent = Template.bind({});
Transparent.args = {
    ...Primary.args,
    appearance: 'transparent',
};

export const IconButton = Template.bind({});
IconButton.args = {
    ...Primary.args,
    iconOnly: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Primary.args,
    disabled: true,
};

export const Small = Template.bind({});
Small.args = {
    ...Primary.args,
    size: 'small',
};

export const Large = Template.bind({});
Large.args = {
    ...Primary.args,
    size: 'large',
};

export const CircularIcon = Template.bind({});
CircularIcon.args = {
    ...Primary.args,
    shape: 'circular',
    iconOnly: true,
};
