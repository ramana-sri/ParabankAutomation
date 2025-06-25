const { expect } = require('@playwright/test')
class AccountsOverviewPage {

    constructor(page) {
        this.page=page
        this.accountsoverview=page.locator("a[href='overview.htm']")
        this.accountsoverviewheader=page.locator("//h1[normalize-space()='Accounts Overview']") 
        this.displayedacctbalance=page.locator('table#accountTable tbody tr:nth-child(1) td:nth-child(2)')      
        this.currentacctbalance=page.locator('table#accountTable tbody tr:nth-child(2) td:nth-child(2)')
    }
     
    async clickAccountsOverview() {               
       await this.accountsoverview.click()        
    }

    async verifyAccountsOverviewHeader(){
        await expect(this.accountsoverviewheader).toHaveText("Accounts Overview")
    }

    async displayedAcctBalance(){
        return await this.displayedacctbalance.innerText()
        
    }
    async currentAcctBalance(){
       return await this.currentacctbalance.innerText()
    }
    
}
module.exports={AccountsOverviewPage}