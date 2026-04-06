import {test ,expect } from '../fixtures/fixture';
import {parabank_login} from '../pages/parabank_login';
import { generateData } from '../helpers/datagen';


test('Parabank_Login' , async({page},testInfo)=>{
  
  try{
  const testName = 'Parabank_Login';
    const data  = generateData(testName) as Record<string, string>;
    console.log(data);
    const reportSafeData = { ...data, password: '***', ssn: '***' };

  // Attach as JSON — visible in Playwright HTML report under the test
  await testInfo.attach('test-data', {
    body: Buffer.from(JSON.stringify(reportSafeData, null, 2)),
    contentType: 'application/json',
  });

   
    const pl = new parabank_login(page);
  
 await test.step('Navigate to Parabank',async()=>{
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  });

  await test.step('Open regirstration form', async()=>{
     await pl.registerlink.click();
  });  
   
  await test.step('Fill registration form',async()=>{
    await pl.fname.fill(data.firstname);
    await pl.lname.fill(data.lastname);
    await pl.add.fill(data.address as string);
    await pl.city.fill(data.city as string);
    await pl.state.fill(data.state as string);
    await pl.zip.fill(data.zip as string);
    await pl.phone.fill(data.phone as string);
    await pl.ssn.fill(data.ssn as string);
    await pl.username.fill(data.username);
    await pl.password.fill(data.password);
    await pl.confirmpassword.fill(data.password);
  });

  await test.step('Submit registration form',async()=>{
    await pl.registerbtn.click();
  });

}
catch (error) {
                console.error(`An error occurred during test execution`, error);
                throw error; // Re-throw the error to ensure the test fails
            }
            finally{
                console.log(`Test execution completed for ${testInfo.title}`);
               
            }
            });

