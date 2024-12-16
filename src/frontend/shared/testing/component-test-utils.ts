import { test as base, expect } from '@playwright/test';
import type { Page, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

declare global {
  interface Window {
    mountComponent: (tag: string, props?: Record<string, unknown>) => Promise<HTMLElement>;
    fixture: (template: string) => Promise<HTMLElement>;
  }
}

export type TestOptions = {
  page: Page;
};

export interface ComponentTestUtils {
  test: typeof base;
  expect: typeof expect;
  checkA11y: (page: Page) => Promise<void>;
  mountComponent: (page: Page, tag: string, props?: Record<string, unknown>) => Promise<Locator>;
}

export const test = base.extend<TestOptions>({
  page: async ({ page }, use) => {
    // Set up the page content first
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            import { LitElement, html } from 'lit';
            import { customElement, property } from 'lit/decorators.js';

            // Create a mock BaseComponent for testing
            class BaseComponent extends LitElement {
              protected dispatchCustomEvent(name, detail) {
                this.dispatchEvent(
                  new CustomEvent(name, {
                    detail,
                    bubbles: true,
                    composed: true,
                  })
                );
              }
            }

            // Add fixture helper
            window.fixture = async (template) => {
              const wrapper = document.createElement('div');
              wrapper.innerHTML = template;
              document.body.appendChild(wrapper);
              const element = wrapper.firstElementChild;
              if (!element) throw new Error('Template must contain an element');
              return element as HTMLElement;
            };
          </script>
        </head>
        <body></body>
      </html>
    `);

    // Add the mountComponent function to the page context
    await page.addScriptTag({
      content: `
        window.mountComponent = async (tag, props = {}) => {
          const element = document.createElement(tag);
          Object.entries(props)
            .filter(([key]) => key !== 'children')
            .forEach(([key, value]) => element.setAttribute(key, String(value)));

          if (props.children) {
            element.textContent = props.children;
          }

          document.body.appendChild(element);
          if ('updateComplete' in element) {
            await element.updateComplete;
          }
          return element;
        };
      `
    });

    await use(page);
  },
});

export const componentTest: ComponentTestUtils = {
  test,
  expect,
  checkA11y: async (page: Page) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  },
  mountComponent: async (page: Page, tag: string, props?: Record<string, unknown>) => {
    try {
      await page.evaluate(
        ({ tag, props }) => window.mountComponent(tag, props),
        { tag, props }
      );
      const component = page.locator(tag);
      await component.waitFor({ state: 'attached' });
      return component;
    } catch (error) {
      throw new Error(`Failed to mount component ${tag}: ${error}`);
    }
  },
};
