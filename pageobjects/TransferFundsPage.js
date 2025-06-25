const { expect } = require('@playwright/test')
class TransferFundsPage {

    constructor(page) {
        this.page=page
        this.transferfunds=page.locator("a[href='transfer.htm']")
        this.transferfundsheader=page.locator("//a[normalize-space()='Transfer Funds']")  
        this.transferapp=page.locator("#transferApp");     
        this.fromacctid=page.locator('select#fromAccountId')
        this.toacctid=page.locator('select#toAccountId')
        this.amount=page.locator("input#amount")
        this.transferbtn=page.locator("input[value='Transfer']")
        this.showResult =page.locator("div[id='showResult'] h1")
        this.resultamount=page.locator("#amountResult")
        this.fromacctidresult=page.locator("#fromAccountIdResult")
        this.toacctidresult=page.locator("#toAccountIdResult")
        this.showresulttext=page.locator("//div[@id='showResult']/p[1]")
         
    }
     
    async clickTransferFunds() {               
       await this.transferfunds.click()        
    }

    async verifyTransferFundsHeader(){
        await expect(this.transferfundsheader).toHaveText("Transfer Funds")
    }

    async verifytransferpageload(){    
    await this.transferapp.waitFor({ state: 'visible', timeout: 3000 });
    }

    async selectFromAcctId(newacctnumber){        
        await this.fromacctid.selectOption(newacctnumber);
    }

    async selectToAcctId(displayedacctnumber){
       await this.toacctid.selectOption(displayedacctnumber);
    }
    async enteramount(amount){
        await this.amount.fill(amount)
    }
    async clickTransferBtn(){
        await this.transferbtn.waitFor({ state: 'visible', timeout: 3000 });
        await this.transferbtn.click()
    }
    async verifyTransferCompletion(){
        await this.showResult.waitFor({ state: 'visible', timeout: 3000 });
        await expect(this.showResult).toHaveText("Transfer Complete!")
        
    }
    async verifyTransferAmountText(){
           await this.resultamount.waitFor({ state: 'visible', timeout: 2000 });
           await this.fromacctidresult.waitFor({ state: 'visible', timeout: 2000 });
           await this.toacctidresult.waitFor({ state: 'visible', timeout: 2000 });
           return await this.showresulttext.textContent()
        
    }
    
}
module.exports={TransferFundsPage}