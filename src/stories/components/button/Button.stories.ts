import type { Meta, StoryObj } from '@storybook/web-components';
import { ButtonDefinition } from '@fluentui/web-components';

// Register the component
if (!customElements.get('fluent-button')) {
  ButtonDefinition.define(customElements);
}

const meta = {
  title: 'Components/Button',
  component: 'fluent-button',
  parameters: {
    docs: {
      description: {
        component: 'The Button component allows users to trigger an action or event.'
      }
    }
  },
  render: (args) => {
    const button = document.createElement('fluent-button');
    Object.assign(button, args);
    button.textContent = args.textContent || 'Click me';
    return button;
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['primary', 'outline', 'subtle', 'transparent']
    },
    shape: {
      control: 'select',
      options: ['circular', 'rounded', 'square']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: 'boolean'
    },
    textContent: {
      control: 'text'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    appearance: 'primary',
    shape: 'rounded',
    size: 'medium',
    textContent: 'Click me'
  }
};

export const Outline: Story = {
  args: {
    appearance: 'outline',
    shape: 'rounded',
    size: 'medium',
    textContent: 'Click me'
  }
};

export const Subtle: Story = {
  args: {
    appearance: 'subtle',
    shape: 'rounded',
    size: 'medium',
    textContent: 'Click me'
  }
};

export const Disabled: Story = {
  args: {
    appearance: 'primary',
    shape: 'rounded',
    size: 'medium',
    disabled: true,
    textContent: 'Disabled Button'
  }
};

export const Small: Story = {
  args: {
    appearance: 'primary',
    shape: 'rounded',
    size: 'small',
    textContent: 'Small Button'
  }
};

export const Large: Story = {
  args: {
    appearance: 'primary',
    shape: 'rounded',
    size: 'large',
    textContent: 'Large Button'
  }
};

export const Circular: Story = {
  args: {
    appearance: 'primary',
    shape: 'circular',
    size: 'medium',
    textContent: '🔄'
  }
};
