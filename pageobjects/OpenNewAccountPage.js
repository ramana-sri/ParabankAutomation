const { expect } = require('@playwright/test')
class OpenNewAccountPage {

    constructor(page) {
        this.page=page
        this.opennewaccount=page.locator("a[href='openaccount.htm']")
        this.opennewaccountheader=page.locator("//h1[normalize-space()='Open New Account']") 
        this.opennewaccounttext=page.locator("//*[@id='openAccountForm']/form/p[2]/b")    
        this.fromaccountid=page.locator("#fromAccountId option")
        this.opennewaccountbtn=page.locator("input[value='Open New Account']")
        this.accountopened =page.locator("//h1[text()='Account Opened!']")
        this.newaccountnumbertext=page.locator("//b[normalize-space()='Your new account number:']")
        this.newaccountid=page.locator("//a[@id='newAccountId']");
        
         
    }
     
    async clickOpenNewAccount() {               
       await this.opennewaccount.click()        
    }

    async verifyNewAccountHeader(){
        await expect(this.opennewaccountheader).toHaveText("Open New Account")
    }
    async verifyOpenNewAccountText() {
        return await this.opennewaccounttext.textContent()
    }
    async verifyFromAccountID(){
        return await this.fromaccountid.textContent()
    }
    async clickOpenNewAccountBtn(){
        await this.opennewaccountbtn.click()
    }
    async openNewAccountText(){
       return await this.accountopened.textContent()
       
    }
    async verifyNewAccountNumberText(){        
        await expect(this.accountopened).toHaveText("Account Opened!")
    }

    async verifyNewAccountNumberTextForComparison(){
        await expect(this.newaccountnumbertext).toHaveText("Your new account number:")
    }
    async getNewAccountID (){
        const element = this.newaccountid
        await element.waitFor({ state: 'visible', timeout: 5000 });
        return this.newaccountid.innerText()
    }
}
module.exports={OpenNewAccountPage}