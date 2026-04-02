import {chromium} from '@playwright/test';
export class util {
     constructor(){

     }
    
      static async  browserBack(browserName){
        let browser;
        if(browserName === 'chromium'){
        browser = await chromium.launch();
        }
        return await browser.newContext();

         
    }
    static async readJsonData(filePath){
        const fs = require('fs');
        const rawData = fs.readFileSync(filePath);
        const jsonData = JSON.parse(rawData);
        return jsonData;
    }
}
