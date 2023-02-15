import { expect } from '@playwright/test';
import { test } from './libs/playwright.js';
import { loadPage } from './libs/load-page.js';

loadPage();

test.describe('Shortcuts Modal', () => {
  test('Open shortcuts modal', async ({ page }) => {
    await page.locator('[data-testid=help-island]').click();

    const shortcutsIcon = page.locator('[data-testid=shortcuts-icon]');
    expect(await shortcutsIcon.isVisible()).toEqual(true);

    await shortcutsIcon.click();
    await page.waitForTimeout(800);
    const shortcutsModal = page.locator('[data-testid=shortcuts-modal]');
    await expect(shortcutsModal).toContainText('Keyboard Shortcuts');
  });
});
