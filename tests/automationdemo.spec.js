import {test} from "@playwright/test";
//import { homepage } from "../pages/homepage";
import {form} from "../pages/form";
const userData = require('../test_Data/input.json');

test('Filling the form', async ({page})=>{
    
  

    const hp = new homepage(page);
    

    await hp.NavigateToURL('https://testautomationpractice.blogspot.com/');
   
//     const fs = require('fs');

//  const rawData = fs.readFileSync('test_Data/input.json');
//  const userData = JSON.parse(rawData);

  console.log(userData.td.name);

    const fm = new form(page);
    
    await fm.fillformdetails(userData.td.name);

    

})