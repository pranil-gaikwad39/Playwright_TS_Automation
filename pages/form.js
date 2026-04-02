import { expect } from '@playwright/test';
//import { homepage } from './homepage';
//import {userData} from '../test_Data/input.json' assert {type: 'json'};

class form {
     constructor(page) {
       
        this.page = page;
        this.name = this.page.locator('[id="name"]');
        this.email = this.page.locator('[id="email"]');
        this.phone = this.page.locator('[id="phone"]');
        this.address = this.page.locator('#textarea');
        this.gender = this.page.locator('#post-body-1307673142697428135 > div:nth-child(10) > div:nth-child(3) > label');
        this.day = this.page.locator('//label[contains(text(),"Mon")]');
        this.country =  this.page.locator('#country');
        this.color;
        this.option ;
        this.animal;
        this.date;
        this.homepage1;
        this.date3 = this.page.locator('//input[@id="txtDate"]');
        this.button =this.page.locator('//*[@class="start"]');
        this.button1 = this.page.locator('//button[@name="stop"]');
        this.alert = this.page.locator('#alertBtn');
        this.point = this.page.locator('//*[@class="dropbtn"]');
        this.mob = this.page.locator('//a[contains(text(),"Mobiles")]');
        this.copy = this.page.locator('//button[text()="Copy Text"]');
        this.field = this.page.locator('//*[@id="field2"]');
        this.dragsrc = this.page.locator('#draggable');
        this.dragdest = this.page.locator('#droppable');
        this.files = this.page.locator('#singleFileInput');
        this.slider = page.locator('//span[@class="ui-slider-handle ui-corner-all ui-state-default"]');
        this.slider1v = this.page.locator('//span[@class="ui-slider-handle ui-corner-all ui-state-default"]');
        this.dropdown = this.page.locator('//div[@id="dropdown"]//div[@class="option"]');
        this.dd = this.page.locator('//input[@id="comboBox"]');
        this.newtab = this.page.locator('//*[@id="HTML4"]/div[1]/button');
        this.popup = this.page.locator('//*[@id="PopUp"]');



    }

    

    async fillformdetails(name){ {

        await this.name.fill(name);
        await this.email.type('a@b.com');
        await this.phone.fill('1234567890');
        await this.address.fill('Baner');
        await this.day.check();
        await this.gender.check();
        await this.button.click();
        await this.button1.click();
        

        await this.point.hover();
        await this.mob.click();
        
        await this.copy.dblclick();
        let actual = await this.field.innerText();

        await this.dragsrc.dragTo(this.dragdest);
       // await expect(actual).toBe('Hello World!');


        await this.alert.hover()
        await this.page.on('dialog', async=>{
            dialog.accept();
        })

        const newpage = await 
        // await this.alert.click();

       
        
        await this.page.on('dialog', async dialog =>{

            console.log(dialog.message());
            await dialog.accept();
        });
        await this.page.click('#confirmBtn');
        await this.alert.click();


        //await this.page.pause();
        
        this.color = await this.page.locator('[id="colors"]');
        await this.color.selectOption({label :'Yellow'});

        await this.color.selectOption(['Blue','Green']);
        await this.color.selectOption({index:1});
        

        this.option = this.page.locator('//*[@id="colors"]/option');
        for(let i=0; i< await this.option.count(); i++){
            let val = await this.option.nth(i).textContent();
            console.log(val)
            

            
            if(val.includes('Yellow')){
                await this.color.selectOption({label:'Yellow'});
                console.log('Yellow color is selected');
                break;

            }
        }

        this.animal = await this.page.locator('//*[@id="animals"]/option') ;
        

        for(let j= 0 ; j< await this.animal.count() ; j++){
            let n = await this.animal.nth(j).textContent();

            if(n.includes('Cat')){
               await this.animal.nth(j).click();
               break;

            }
        }
        

        this.date1 = await this.page.locator('#datepicker');
        
         
        
        

        this.homepage1 = new homepage(this.page);
        let today = await this.homepage1.getCurrentDate();
       // await this.page.pause();
        await this.date1.click();
        await this.date1.fill(today);
        await this.date1.press('Enter');
        let formattedDate = today.split('/') ;
        console.log(today);
        this.date = await this.page.locator('//*[@id="ui-datepicker-div"]/table/tbody/tr/td/a');

        await this.country.selectOption('India');
        
        await this.date3.click();
        for(const date2 of await this.date.all()){
            let d = await date2.textContent();
            if(d.includes(formattedDate[1])){
                await date2.click();
                break;
            }
        }

       // await this.page.pause();
        
        await this.page.click('//*[@id="singleFileForm"]/button');

        // await this.slider.fill('70');
        // await this.slider.dispatchEvent('change');

        await this.page.pause();
        // const box = await this.slider.boundingBox();
        // let desiredvalue = 0.9 ;
         



        // await this.page.mouse.move(box.x, box.y+ box.height/2);
        // await this.page.mouse.down();
        // await this.page.mouse.move(box.x+box.width*desiredvalue, box.y+box.height/2);
        // await this.page.mouse.up();

        // const box1 = await this.slider1.boundingBox();
        // await this.page.mouse.move(box1.x, box1.y+ box1.height/2);
        // await this.page.mouse.down();
        // await this.page.mouse.move(box1.x+box1.width*desiredvalue, box1.y+box1.height/2);
        // await this.page.mouse.up();

        await this.dd.click();

        for(let d =0 ; d< await this.dropdown.count() ; d++){
            let text = await this.dropdown.nth(d).textContent();
            if(text.includes('Item 5')){
                console.log('Item 5 is selected');
                await this.dropdown.nth(d).click();
                break;
            }
        }

        const switchtowindow = async (page,action) =>{
        const [newPage] = await Promise.all([
            page.context().waitForEvent('page'),
             action()
        ]);

        

        await newPage.waitForLoadState();
        console.log(await newPage.title());

        return newPage ;
       

    }
      
        
       const tab = await switchtowindow(this.page , () => this.newtab.click());
       
       await tab.locator('//a[text()="Online Training"]').click();
       await expect.soft(tab).toHaveTitle('SDET-QA');
       const pages = this.page.context().pages();
        console.log(pages.length);
       const page1 = pages[0];
       await page1.bringToFront();
       await expect(page1).toHaveTitle('Automation Testing Practice');
       await tab.bringToFront();

         tab.close();
        const popup = await switchtowindow(this.page , () => this.popup.click());

        await expect.soft(popup).toHaveTitle('Selenium');
        popup.close();
         
        
       
        
        // const color1 = await this.color.textContent() ;
        //     console.log(color1);
        //      const c = await expect(color1.includes('Red')).toBeTruthy();
  
        //     //await this.page.pause();
        //     if(color1.includes('Yellow')){
        //         await this.color.selectOption({label:'Red'});
        //         console.log('Red color is selected');
        //     }

            
             

        
        
    }
}
}
module.exports = { form };