const { expect } = require('@playwright/test')
class FindTransactionsPage {

    constructor(page) {
        this.page=page
        this.findtransactions=page.locator("a[href='findtrans.htm']")
        this.findtransactionsheader=page.locator("//h1[normalize-space()='Find Transactions']")       
         
    }
     
    async clickFindTransactions() {               
       await  this.findtransactions.click()        
    }

    async verifyFindTransactionsHeader(){
        await expect( this.findtransactionsheader).toHaveText("Find Transactions")
    }
    
}
module.exports={FindTransactionsPage}