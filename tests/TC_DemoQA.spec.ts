import { test, expect } from '../fixtures/fixture';
import {generateData} from '../helpers/datagen';
import { demo_form }  from '../pages/demo_form';
test('test_demoqa', async ({page},testInfo)=>{
   try{
   const data = generateData(testInfo.title) as Record<string,string> ; 
   const df = new demo_form(page);

   await page.goto('https://demoqa.com//');
   await df.formbutton.click();
   await df.practiceform.click();
   await df.firstname.fill(data.firstname);
   await df.lastname.fill(data.lastname);
   await df.email.fill(data.email);
   await df.maleradio.check();
   await df.mob.fill(data.mob);
   await df.dob.click();
   await df.date.click();
   await df.subjects.fill(data.subjects);
   await page.keyboard.press('Enter');
   await df.sportcheck.check();
   await df.address.fill(data.address);
   await df.choosefile.setInputFiles("test_Data\\upload.txt");

   await df.selectstat.first().click();
  await df.state.click();
  await df.selectity.click();
  await df.city.click();

   await df.submitbtn.click();
   await expect(df.confirmation).toBeVisible();
   await df.closebtn.click();

   }catch (error) {
                console.error(`An error occurred during test execution`, error);
                throw error; // Re-throw the error to ensure the test fails
            }

});
