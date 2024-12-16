import { test, expect } from '@playwright/test';

test.describe('FluentLitButton Component E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dev server first
    await page.goto('http://localhost:3000');

    // Create a test page with the fluent-lit-button component
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <script type="module">
            // Import from the dev server
            import { Button } from '/src/frontend/components/button/button.ts';

            // Define the component if not already defined
            if (!customElements.get('fluent-lit-button')) {
              customElements.define('fluent-lit-button', Button);
            }
          </script>
          <style>
            fluent-lit-button {
              margin: 10px;
            }
          </style>
        </head>
        <body>
          <div id="test-container">
            <fluent-lit-button appearance="primary">Click Me</fluent-lit-button>
            <fluent-lit-button appearance="outline">Secondary Button</fluent-lit-button>
          </div>
        </body>
      </html>
    `);

    // Wait for component to be defined
    await page.waitForSelector('fluent-lit-button');
  });

  test('buttons are visible and have correct text', async ({ page }) => {
    // Check primary button
    const primaryButton = page.locator('fluent-lit-button[appearance="primary"]');
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveText('Click Me');

    // Check secondary button
    const secondaryButton = page.locator('fluent-lit-button[appearance="outline"]');
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton).toHaveText('Secondary Button');
  });

  test('buttons are clickable and trigger events', async ({ page }) => {
    // Setup click event listener
    await page.evaluate(() => {
      document.querySelector('fluent-lit-button')?.addEventListener('click', () => {
        document.body.setAttribute('data-clicked', 'true');
      });
    });

    // Click the button
    await page.locator('fluent-lit-button[appearance="primary"]').click();

    // Verify click was registered
    await expect(page.locator('body[data-clicked="true"]')).toBeVisible();
  });

  test('buttons show correct visual states', async ({ page }) => {
    // Test hover state
    const button = page.locator('fluent-lit-button[appearance="primary"]');
    await button.hover();

    // Take a screenshot for visual comparison
    await expect(button).toHaveScreenshot('fluent-button-hover.png');

    // Test focus state
    await button.focus();
    await expect(button).toHaveScreenshot('fluent-button-focus.png');

    // Test disabled state
    await page.evaluate(() => {
      const button = document.querySelector('fluent-lit-button');
      if (button) {
        button.setAttribute('disabled', '');
      }
    });
    await expect(button).toHaveScreenshot('fluent-button-disabled.png');
  });

  test('buttons are accessible', async ({ page }) => {
    // Check ARIA attributes
    const button = page.locator('fluent-lit-button[appearance="primary"]');
    await expect(button).toHaveAttribute('aria-disabled', 'false');

    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(focusedElement).toBe('fluent-lit-button');
  });

  test('buttons support different sizes', async ({ page }) => {
    // Test small size
    await page.evaluate(() => {
      const button = document.querySelector('fluent-lit-button');
      if (button) {
        button.setAttribute('size', 'small');
      }
    });
    await expect(page.locator('fluent-lit-button[size="small"]')).toBeVisible();

    // Test large size
    await page.evaluate(() => {
      const button = document.querySelector('fluent-lit-button');
      if (button) {
        button.setAttribute('size', 'large');
      }
    });
    await expect(page.locator('fluent-lit-button[size="large"]')).toBeVisible();
  });

  test('buttons support different shapes', async ({ page }) => {
    // Test circular shape
    await page.evaluate(() => {
      const button = document.querySelector('fluent-lit-button');
      if (button) {
        button.setAttribute('shape', 'circular');
      }
    });
    await expect(page.locator('fluent-lit-button[shape="circular"]')).toBeVisible();

    // Test square shape
    await page.evaluate(() => {
      const button = document.querySelector('fluent-lit-button');
      if (button) {
        button.setAttribute('shape', 'square');
      }
    });
    await expect(page.locator('fluent-lit-button[shape="square"]')).toBeVisible();
  });

  test('buttons support icon-only mode', async ({ page }) => {
    await page.evaluate(() => {
      const button = document.querySelector('fluent-lit-button');
      if (button) {
        button.setAttribute('iconOnly', '');
        button.innerHTML = '★';
      }
    });
    await expect(page.locator('fluent-lit-button[iconOnly]')).toBeVisible();
  });
});
