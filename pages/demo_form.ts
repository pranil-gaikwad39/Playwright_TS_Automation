import {Page,Locator} from '@playwright/test';
export class demo_form{
 readonly page:Page;
    readonly formbutton : Locator ;
    readonly practiceform : Locator ; 
    readonly firstname : Locator ;
    readonly lastname : Locator ;
    readonly email : Locator ;
    readonly maleradio : Locator ;
    readonly femaleradio : Locator ;
    readonly mob : Locator ;
    readonly dob : Locator ;
    readonly date : Locator ;
    readonly subjects : Locator ;
    readonly sportcheck : Locator ;
    readonly address : Locator ;
    readonly choosefile : Locator ;
    readonly selectstat : Locator ;
    readonly selectity : Locator ;
    readonly submitbtn : Locator ;
    readonly confirmation : Locator ;
    readonly closebtn : Locator ;
    readonly state : Locator ;
    readonly city : Locator ;
  constructor(page: Page){
        this.page = page ;
        this.formbutton = page.getByRole('link', { name: 'Forms' });
        this.practiceform = page.getByRole('link', { name: 'Practice Form' });
        this.firstname = page.getByRole('textbox', { name: 'First Name' }) ;
        this.lastname = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'name@example.com' });
        this.maleradio = page.getByRole('radio', { name: 'Male', exact: true });
        this.femaleradio = page.getByRole('radio', { name: 'Female', exact: true });
        this.mob = page.getByRole('textbox', { name: 'Mobile Number' });
        this.dob = page.locator('#dateOfBirthInput');
        this.date = page.getByRole('gridcell', { name: 'Choose Saturday, April 4th,' });
        this.subjects = page.locator('#subjectsInput');
        this.sportcheck =    page.getByRole('checkbox', { name: 'Sports' });
        this.address =  page.getByRole('textbox', { name: 'Current Address' }) ;
        this.choosefile = page.getByRole('button', { name: 'Choose File' }) ;
        this.state = page.locator('#react-select-6-placeholder');
        this.city = page.getByText('Select City');
        this.selectstat = page.locator('.css-1xc3v61-indicatorContainer');
        this.state = page.getByRole('option', { name: 'Uttar Pradesh' });
        this.selectity = page.locator('.css-1xc3v61-indicatorContainer') ;
        this.city = page.getByRole('option', { name: 'Agra' });
        
        
        this.submitbtn = page.getByRole('button', { name: 'Submit' });
        this.confirmation =page.getByText('Thanks for submitting the form') ;
        this.closebtn = page.getByRole('button', { name: 'Close' });

  }
}