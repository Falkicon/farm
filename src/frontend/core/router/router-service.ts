import UniversalRouter from 'universal-router';
import { FeatureRegistry } from '../feature-registry/feature-registry.js';

export class RouterService {
  private router: UniversalRouter;
  private static instance: RouterService;

  private constructor() {
    const registry = FeatureRegistry.getInstance();
    this.router = new UniversalRouter(registry.getAllRoutes());
  }

  static getInstance(): RouterService {
    if (!RouterService.instance) {
      RouterService.instance = new RouterService();
    }
    return RouterService.instance;
  }

  async navigate(path: string): Promise<void> {
    try {
      const component = await this.router.resolve(path);
      const appElement = document.getElementById('app');
      if (!appElement) {
        console.error('Root element #app not found');
        return;
      }

      // Clear existing content
      appElement.innerHTML = '';

      // Create and append new component
      if (typeof component === 'string') {
        appElement.innerHTML = component;
      } else if (component) {
        const elem = new component();
        appElement.appendChild(elem);
      } else {
        console.error('No component returned from router');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }
}
