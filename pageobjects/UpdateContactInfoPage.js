const { expect } = require('@playwright/test')
class UpdateContactInfoPage {

    constructor(page) {
        this.page=page
        this.updatecontactinfo=page.locator("a[href='updateprofile.htm']")
        this.updatecontactinfoheader=page.locator("//h1[normalize-space()='Update Profile']")       
         
    }
     
    async clickUpdateContactInfo() {               
       await this.updatecontactinfo.click()        
    }

    async verifyUpdateContactInfoHeader(){
        await expect(this.updatecontactinfoheader).toHaveText("Update Profile")
    }
    
}
module.exports={UpdateContactInfoPage}