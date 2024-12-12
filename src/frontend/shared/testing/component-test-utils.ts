import { test as base, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

declare global {
  interface Window {
    componentMounted: boolean;
    mountError: Error | null;
  }
}

export type TestOptions = {
  page: Page;
};

export interface ComponentTestUtils {
  test: typeof test;
  expect: typeof expect;
  checkA11y: (page: Page) => Promise<void>;
  mountComponent: (page: Page, tag: string, props?: Record<string, unknown>) => Promise<Locator>;
}

export const test = base.extend<TestOptions>({
  page: async ({ page }, use) => {
    await page.setContent(`
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        @import url('/src/frontend/styles/tailwind.css');
                    </style>
                </head>
                <body>
                    <div id="root"></div>
                </body>
            </html>
        `);
    await use(page);
  },
});

export const componentTest: ComponentTestUtils = {
  test,
  expect,
  async checkA11y(page: Page) {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  },
  async mountComponent(page: Page, tag: string, props: Record<string, unknown> = {}) {
    const propsString = Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    try {
      await page.addScriptTag({
        content: `
                    window.mountError = null;
                    window.componentMounted = false;
                `,
      });

      await page.evaluate(`
                import('/src/frontend/shared/components/${tag}.ts')
                    .then(() => {
                        document.getElementById('root').innerHTML = \`<${tag} ${propsString}></${tag}>\`;
                        window.componentMounted = true;
                    })
                    .catch(error => {
                        window.mountError = error.message;
                        console.error('Failed to mount component:', error);
                    });
            `);

      const mounted = await page.evaluate(() => window.componentMounted);
      if (!mounted) {
        const error = await page.evaluate(() => window.mountError);
        throw new Error(`Failed to mount component ${tag}: ${error}`);
      }

      const component = page.locator(tag);
      await component.waitFor({ state: 'attached' });
      return component;
    } catch (error) {
      throw new Error(`Failed to mount component ${tag}: ${error}`);
    }
  },
};
