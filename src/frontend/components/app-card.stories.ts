import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import '../shared/components/app-card';

const meta: Meta = {
  title: 'Components/AppCard',
  tags: ['autodocs'],
  render: (args) => html`
    <app-card .title=${args.title} .description=${args.description}></app-card>
  `,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    title: 'Example Card',
    description: 'This is a sample card component',
  },
};
