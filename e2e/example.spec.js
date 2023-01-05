import { test, expect } from '@playwright/test';

test('Site title', async ({ page }) => {
  await page.goto('http://localhost:4101/');
  expect(await page.innerText('header a')).toBe('Movies');
});

test('Site navigation', async ({ page }) => {
  await page.goto('http://localhost:4101/');

  const expectedNavOptions = ['Home', 'Popular', 'Latest', 'Top Rated', 'Search'];

  for (const actualNavOption of await page.locator('nav').getByRole('listitem').all()) {
    const option = (await actualNavOption.innerText());
    expect(expectedNavOptions.includes(option)).toBe(true);
  }
});
