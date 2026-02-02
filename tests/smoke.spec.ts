import { test, expect } from '@playwright/test';

test('should load the list of pokemon on page load', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const firstpokemon = page.locator('text=bulbasaur'); 
  await expect(firstpokemon).toBeVisible({ timeout: 20000 });

  const searchInput = page.locator('input[type="text"]').first();
  await searchInput.fill('pika');

  const firstPokemon = page.locator('text=pikachu').first();
  await expect(firstPokemon).toBeVisible({ timeout: 20000 });
});
