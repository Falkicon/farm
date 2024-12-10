import { componentTest } from '../../testing/component-test-utils';
const { test, expect, checkA11y, mountComponent } = componentTest;

test.describe('AppButton', () => {
    test('meets accessibility guidelines', async ({ page }) => {
        await mountComponent(page, 'app-button', { children: 'Click me' });
        await checkA11y(page);
    });

    test('renders with default variant', async ({ page }) => {
        const button = await mountComponent(page, 'app-button', { children: 'Click me' });
        await expect(button).toHaveClass(/primary/);
    });

    test('renders with secondary variant', async ({ page }) => {
        const button = await mountComponent(page, 'app-button', {
            variant: 'secondary',
            children: 'Click me'
        });
        await expect(button).toHaveClass(/secondary/);
    });

    test('handles click events', async ({ page }) => {
        const button = await mountComponent(page, 'app-button', { children: 'Click me' });

        const clicked = await button.evaluate((element: HTMLElement) => {
            return new Promise<boolean>(resolve => {
                element.addEventListener('click', () => resolve(true), { once: true });
                element.click();
            });
        });

        expect(clicked).toBeTruthy();
    });

    test('maintains focus state', async ({ page }) => {
        const button = await mountComponent(page, 'app-button', { children: 'Focus Test' });
        await button.focus();

        const hasFocus = await button.evaluate((element: HTMLElement) => {
            return document.activeElement === element;
        });

        expect(hasFocus).toBeTruthy();
    });
}); 