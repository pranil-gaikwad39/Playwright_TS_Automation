//import { test, expect, chromium } from '@playwright/test';
import { test, expect  } from '../fixtures/fixture';


test('test_sauce', async ({ page }) => { 
const testName = 'TC_001';
  const data = generateData(testName);
//   const browser = await chromium.launch(
//     {
//   headless: false ,
//   slowMo : 500

// }
// );
// const context = await browser.newContext({
//   recordVideo: {
//     dir: '/videos/',
//     size:{
//       width:900,
//       height:800
//     }
//   }
// });
//const page = await context.newPage();
await page.goto('https://www.saucedemo.com/');
  
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');

 // await page.pause();   
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await expect(page.locator('[data-test="login-button"]')).toBeEnabled();
  await page.locator('[data-test="login-button"]').click();
  // await expect.soft(page.locator('[data-test="login-button"]')).toBeDisabled();
  await expect(page.locator('[data-test="password"]')).toBeHidden();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toHaveText('Products');
  await expect.soft(page.locator('(//div[@data-test="inventory-item-name"])[1]')).toHaveText('Sauce Labs Backpack');
   await expect.soft(page.locator('//img[@alt="Sauce Labs Backpack"]')).toHaveClass(/.*inventory_item_img/);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
 
  await page.getByRole('button', { name: 'Open Menu' }).click();
  //await page.locator('[data-test="logout-sidebar-link"]').click();
 // await context.close();


});