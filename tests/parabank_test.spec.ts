import {test ,expect } from '../fixtures/fixture';

import {parabank_login} from '../pages/parabank_login';
//import {homepage} from '../pages/homepage';
import { util } from '../helpers/util';
//import {chromium} from '@playwright/test';
import { generateData } from '../helpers/datagen';
const path = require('path');

test('Parabank_Login' , async({page},testInfo)=>{
    const testName = 'Parabank_Login';
    const data  = generateData(testName);
    console.log(typeof generateData);
    const reportSafeData = { ...data, password: '***', ssn: '***' };

  // Attach as JSON — visible in Playwright HTML report under the test
  await testInfo.attach('test-data', {
    body:        Buffer.from(JSON.stringify(reportSafeData, null, 2)),
    contentType: 'application/json',
  });

    // const browser = await chromium.launch();
    // const context = await browser.newContext();
    // const filepath = await path.join(__dirname, '../test_Data/parabank_td.json');
    // const userData = await util.readJsonData(filepath);
    // console.log(userData.browsername);
    // const context = await util.browserBack("chromium");
    // const page = await context.newPage();
    // const hp = new homepage(page);
     const pl = new parabank_login(page);
  
    

    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await pl.registerlink.click();
    await pl.fname.fill(data.firstname as string);
    await pl.lname.fill(data.lastname as string);
    await pl.add.fill(data.address as string);
    await pl.city.fill(data.city as string);
    await pl.state.fill(data.state as string);
    await pl.zip.fill(data.zip as string);
    await pl.phone.fill(data.phone as string);
    await pl.ssn.fill(data.ssn as string);
    await pl.username.fill(data.username as string);
    await pl.password.fill(data.password as string);
    await pl.confirmpassword.fill(data.password as string);
    await pl.registerbtn.click();


   


});
// import { test, expect } from '@playwright/test';

// test('test', async ({ page }, testInfo) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.locator('[data-test="username"]').click();
//   await page.locator('[data-test="username"]').click();
//   await page.locator('[data-test="username"]').fill('standard_user');
//   await page.locator('[data-test="password"]').click();
//   await page.locator('[data-test="password"]').fill('secret_sauce');
//   await testInfo.attach('screenshot',{
//     body: await page.locator('[data-test="login-button"]').screenshot({ path: 'screenshot.png' }),
//     contentType:'image/png'
//   })
//   await page.locator('[data-test="login-button"]').click();
//   //page.locator('[data-test="login-button"]').screenshot({ path: 'screenshot.png' });

   
// });
