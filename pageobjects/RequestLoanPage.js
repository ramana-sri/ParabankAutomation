const { expect } = require('@playwright/test')
class RequestLoanPage {

    constructor(page) {
        this.page=page
        this.requestloan=page.locator("a[href='requestloan.htm']")
        this.requestloanheader=page.locator("//h1[normalize-space()='Apply for a Loan']")       
         
    }
     
    async clickRequestLoan() {               
       await this.requestloan.click()        
    }

    async verifyRequestLoanHeader(){
        await expect(this.requestloanheader).toHaveText("Apply for a Loan")
    }
    
}
module.exports={RequestLoanPage}