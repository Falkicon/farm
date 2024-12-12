import { html } from 'lit';
import type { Route } from 'universal-router';
import UniversalRouter from 'universal-router';

// Import components directly to ensure single registration
import './components/index';

const routes: Route[] = [
  {
    path: '/',
    action: () => html`<home-page></home-page>`,
  },
  {
    path: '/system',
    action: async () => {
      // Only lazy load the system page since it's not part of the main bundle
      await import('../system/pages/SystemStatusPage');
      return html`<system-status-page></system-status-page>`;
    },
  },
  {
    path: '(.*)',
    action: () => html`<h1>404 - Page Not Found</h1>`,
  },
];

export const router = new UniversalRouter(routes);
