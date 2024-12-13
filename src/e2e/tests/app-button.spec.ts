import { test, expect } from '@playwright/test';

test.describe('AppButton Component E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dev server first
    await page.goto('http://localhost:3000');

    // Create a test page with the app-button component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            // Import from the dev server
            import { AppButton } from '/src/frontend/shared/components/app-button.ts';

            // Define the component if not already defined
            if (!customElements.get('app-button')) {
              customElements.define('app-button', AppButton);
            }
          </script>
          <style>
            app-button {
              margin: 10px;
            }
          </style>
        </head>
        <body>
          <div id="test-container">
            <app-button>Click Me</app-button>
            <app-button variant="secondary">Secondary Button</app-button>
          </div>
        </body>
      </html>
    `);

    // Wait for component to be defined
    await page.waitForSelector('app-button');
  });

  test('buttons are visible and have correct text', async ({ page }) => {
    // Check primary button
    const primaryButton = page.locator('app-button:not([variant])');
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveText('Click Me');

    // Check secondary button
    const secondaryButton = page.locator('app-button[variant="secondary"]');
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton).toHaveText('Secondary Button');
  });

  test('buttons are clickable and trigger events', async ({ page }) => {
    // Setup click event listener
    await page.evaluate(() => {
      document.querySelector('app-button')?.addEventListener('click', () => {
        document.body.setAttribute('data-clicked', 'true');
      });
    });

    // Click the button
    await page.locator('app-button:not([variant])').click();

    // Verify click was registered
    await expect(page.locator('body[data-clicked="true"]')).toBeVisible();
  });

  test('buttons show correct visual states', async ({ page }) => {
    // Test hover state
    const button = page.locator('app-button:not([variant])');
    await button.hover();

    // Take a screenshot for visual comparison
    await expect(button).toHaveScreenshot('button-hover.png');

    // Test focus state
    await button.focus();
    await expect(button).toHaveScreenshot('button-focus.png');

    // Test disabled state
    await page.evaluate(() => {
      const button = document.querySelector('app-button');
      if (button) {
        button.setAttribute('disabled', '');
      }
    });
    await expect(button).toHaveScreenshot('button-disabled.png');
  });

  test('buttons are accessible', async ({ page }) => {
    // Check ARIA attributes
    const button = page.locator('app-button:not([variant]) button');
    await expect(button).toHaveAttribute('role', 'button');

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(focusedElement).toBe('button');
  });
});
