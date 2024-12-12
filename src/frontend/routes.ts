import { RouterContext, RouteContext, RouteParams } from 'universal-router';
import { homeFeature } from './features/home';

export interface Feature {
  name: string;
  routes: Route[];
  initialize: () => Promise<void>;
}

interface Route {
  path: string;
  children?: Route[];
  action?: (
    context: RouteContext<unknown, RouterContext>,
    params: RouteParams
  ) => Promise<string | typeof HTMLElement> | string | typeof HTMLElement;
}

export const routes: Route[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        action: (context: RouteContext<unknown, RouterContext>, params: RouteParams) =>
          homeFeature.routes[0].action?.(context, params) || '',
      },
    ],
  },
];
