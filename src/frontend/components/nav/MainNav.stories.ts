import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './MainNav';

const meta: Meta = {
  title: 'Navigation/MainNav',
  tags: ['autodocs'],
  render: () => html` <main-nav></main-nav> `,
  parameters: {
    docs: {
      description: {
        component:
          'Main navigation component that provides the primary navigation menu with links to major sections.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const CustomTheme: Story = {
  render: () => html`
    <div
      style="
      --surface-color: #1a1a1a;
      --border-color: #333;
      --text-color: #fff;
      --hover-color: #2a2a2a;
      --primary-color: #00aaff;
    "
    >
      <main-nav></main-nav>
    </div>
  `,
};

export const LightTheme: Story = {
  render: () => html`
    <div
      style="
      --surface-color: #ffffff;
      --border-color: #e0e0e0;
      --text-color: #333333;
      --hover-color: #f5f5f5;
      --primary-color: #0066cc;
    "
    >
      <main-nav></main-nav>
    </div>
  `,
};
