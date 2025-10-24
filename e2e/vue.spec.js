import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Task Manager');
  await expect(page.getByLabel('titleHello')).toHaveText('Welcome to the Task Manager API!');
  // https://playwright.dev/docs/input
})

test('navigate to add task page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ajouter une tache' }).click();
  await expect(page).toHaveURL('/addTasks');
})

test('add a new task', async ({ page }) => {
  await page.goto('/');
  const initialTaskCount = await page.locator('.taskItem').count();
  await page.goto('/addTasks');
  await page.getByLabel('inputDescription').fill('Description de la task la que je vien de crée lolll');
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await expect(page).toHaveURL('/');
  const finalTaskCount = await page.locator('.taskItem').count();
  expect(finalTaskCount).toBe(initialTaskCount + 1);
})

test('complete a task', async ({ page }) => {
  await page.goto('/');
  const firstTask = page.locator('.taskItem').first();
  const stateLocator = firstTask.locator('.forStateValue');
  const beforeState = stateLocator;

  const firstTaskCompleteButton = firstTask.getByRole('button', { name: 'Completer' });
  await firstTaskCompleteButton.click();

  const afterState = stateLocator;
  await expect(stateLocator).toHaveText("terminé", { timeout: 3000 });
  
  expect(await beforeState.textContent()).toBe(await afterState.textContent());
})

test('delete a task', async ({ page }) => {
  await page.goto('/');
  const initialTaskCount = await page.locator('.taskItem').count();
  const firstTaskDeleteButton = page.locator('.taskItem').first().getByRole('button', { name: 'Supprimer' });
  await firstTaskDeleteButton.click();
  const finalTaskCount = await page.locator('.taskItem').count();
  expect(finalTaskCount).toBe(initialTaskCount - 1);
});
