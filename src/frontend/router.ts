import { html, TemplateResult } from 'lit';
import UniversalRouter from 'universal-router';
import type { RouterContext, RouteParams } from 'universal-router';

/**
 * Extended router context with custom properties
 */
interface AppRouterContext extends RouterContext {
    path: string;
}

/**
 * Route action handler type
 */
type RouteAction = (
    context: AppRouterContext,
    params?: RouteParams
) => TemplateResult;

/**
 * Application route configuration
 */
interface AppRoute {
    path: string;
    action: RouteAction;
    children?: AppRoute[];
}

/**
 * Application routes configuration
 */
const routes: AppRoute[] = [
    {
        path: '/',
        action: () => html`<home-page></home-page>`
    },
    {
        path: '/system-status',
        action: () => html`<system-status-page></system-status-page>`
    },
    {
        path: '(.*)',
        action: () => html`<h1>404 - Page Not Found</h1>`
    }
];

/**
 * Application router instance
 */
export const router = new UniversalRouter<TemplateResult, AppRouterContext>(routes); 