import {expect, test} from '@playwright/test';

test('example.com page title contains Example Domain', async ({page}) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
