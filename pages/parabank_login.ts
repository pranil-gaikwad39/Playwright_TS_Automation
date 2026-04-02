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
        this.password = this.page.locator('//input[@name="password"]');
        this.loginbtn = this.page.locator('//input[@value="Log In"]');
        this.registerlink = this.page.locator('//a[text()="Register"]');
        this.fname = this.page.locator('//*[@id="customer.firstName"]');
        this.lname = this.page.locator('//*[@id="customer.lastName"]');
        this.add = this.page.locator('//*[@id="customer.address.street"]');
        this.city = this.page.locator('//*[@id="customer.address.city"]');
        this.state = this.page.locator('//*[contains(@name,"state")]');
        this.zip = this.page.locator('//*[@id="customer.address.zipCode"]');
        this.phone = this.page.locator('//*[@id="customer.phoneNumber"]');
        this.ssn = this.page.locator('//*[@id="customer.ssn"]');
        this.regusername = this.page.locator('//*[@id="customer.username"]');
        this.regpassword = this.page.locator('//*[@id="customer.password"]');
        this.confirmpassword = this.page.locator('//*[@id="repeatedPassword"]');
        this.registerbtn = this.page.locator('//*[@value="Register"]');


 }
}