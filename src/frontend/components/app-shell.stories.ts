import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './app-shell';
import './nav/MainNav';

const meta: Meta = {
  title: 'Shell/AppShell',
  tags: ['autodocs'],
  render: () => html` <app-shell></app-shell> `,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main application shell component that handles routing and layout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithCustomContent: Story = {
  render: () => html`
    <app-shell>
      <div style="padding: 20px;">
        <h1>Custom Content</h1>
        <p>This is a custom content example for the app shell.</p>
      </div>
    </app-shell>
  `,
};
