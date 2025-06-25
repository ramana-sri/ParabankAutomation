const { test, expect } = require('@playwright/test')
class LogoutPage {

    constructor(page) {
        this.page=page
        this.clickLogout=page.locator("a[href='logout.htm']") 
        this.logoutheader=page.locator("//h2[normalize-space()='Customer Login']")       
         
    }
     
    async clickLogoutBtn(){               
       await this.clickLogout.click()        
    }

    async verifyLogoutHeader(){
        await expect(this.logoutheader).toHaveText("Customer Login")
    }
    
}
module.exports={LogoutPage}