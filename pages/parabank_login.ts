import {Page,Locator} from '@playwright/test';
export class parabank_login{

  page:Page;
   username:Locator;
   password:Locator;
   loginbtn:Locator;
   registerlink:Locator;
   fname:Locator;
   lname:Locator;
   add:Locator;
   city:Locator;
   state:Locator;
   zip:Locator;
   phone:Locator;
   ssn:Locator;
   regusername:Locator;
   regpassword:Locator;
   confirmpassword:Locator;
   registerbtn:Locator;

constructor(page: Page){
        this.page = page;
        this.username = page.locator('//input[@name="username"]');
        this.password = page.locator('//input[@name="password"]');
        this.loginbtn = page.locator('//input[@value="Log In"]');
        this.registerlink = page.locator('//a[text()="Register"]');
        this.fname = page.locator('//*[@id="customer.firstName"]');
        this.lname = page.locator('//*[@id="customer.lastName"]');
        this.add = page.locator('//*[@id="customer.address.street"]');
        this.city = page.locator('//*[@id="customer.address.city"]');
        this.state = page.locator('//*[contains(@name,"state")]');
        this.zip = page.locator('//*[@id="customer.address.zipCode"]');
        this.phone = page.locator('//*[@id="customer.phoneNumber"]');
        this.ssn = page.locator('//*[@id="customer.ssn"]');
        this.regusername = page.locator('//*[@id="customer.username"]');
        this.regpassword = page.locator('//*[@id="customer.password"]');
        this.confirmpassword = page.locator('//*[@id="repeatedPassword"]');
        this.registerbtn = page.locator('//*[@value="Register"]');


 }
}