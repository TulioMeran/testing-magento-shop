import { test, expect } from '@playwright/test';

test('Make a shop in magento page', async ({ page }) => {
  await test.step('Get into the page', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');
  })

  await test.step('Select the item to shop', async () => {
    await page.getByRole('menuitem', { name: /Women/ }).click();
    await page.getByRole('link', { name: 'Jackets' }).click();
    await page.locator('li').filter({ hasText: 'Olivia 1/4 Zip Light Jacket' }).getByLabel('L', { exact: true }).click();
    await page.locator('li').filter({ hasText: 'Olivia 1/4 Zip Light Jacket' }).getByLabel('Blue').click();
    await page.locator('li').filter({ hasText: 'Olivia 1/4 Zip Light Jacket' }).locator('button').click();
  })

  await test.step('Proceed with shop', async () => {
    await page.getByRole('link', { name: /My Cart 1 1 items/ }).click();
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
  })

  await test.step('Fill all personal information', async () => {
    await page.getByRole('textbox', { name: /Email Address/ }).fill('rtulio007@gmail.com');
    await page.getByLabel('First Name').fill('Rafael');
    await page.getByLabel('Last Name').fill('Meran');
    await page.getByLabel('Company').fill('NA');
    await page.getByLabel('Street Address: Line 1').fill('asdasd');
    await page.getByLabel('Street Address: Line 3').fill('asdasd');
    await page.getByLabel('City').fill('santo domingo');
    await page.locator('select[name="region_id"]').selectOption('43');
    await page.getByLabel('Zip/Postal Code').fill('11041');
    await page.getByLabel('Phone Number').fill('18294462986');
  })

  await test.step("Finish shopping", async () => {
    await page.getByRole('cell', { name: 'Table Rate Best Way' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Place Order' }).click();
  })

  expect(page.getByText("Thank you for your purchase")).toBeTruthy();
});