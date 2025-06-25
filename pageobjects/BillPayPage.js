const { expect } = require('@playwright/test')
class BillPayPage {

    constructor(page) {
        this.page=page
        this.billpay=page.locator("a[href='billpay.htm']")
        this.billpayheader=page.locator("//h1[normalize-space()='Bill Payment Service']") 
        this.billpayform=page.locator("#billpayForm")
        this.payeename=page.locator("input[name='payee.name']")
        this.payeeaddressstreet=page.locator("input[name='payee.address.street']")
        this.payeeaddresscity=page.locator("input[name='payee.address.city']")
        this.payeeaddressstate=page.locator("input[name='payee.address.state']")
        this.payeeaddresszipcode=page.locator("input[name='payee.address.zipCode']")
        this.payeephonenumber=page.locator("input[name='payee.phoneNumber']")
        this.payeeaccountnumber =page.locator("input[name='payee.accountNumber']")
        this.verifyaccount =page.locator("input[name='verifyAccount']")
        this.billamt=page.locator("input[name='amount']")
        this.frmaccountid =page.locator("select[name='fromAccountId']")
        this.sendpayment=page.locator("input[value='Send Payment']")
        this.billpayresult=page.locator("#billpayResult")
        this.billpayresulttxt=page.locator("#billpayResult h1")

    }
     
    async clickBillPay() {               
       await this.billpay.click()        
    }

    async verifyBillPayHeader(){        
        await expect(this.billpayheader).toHaveText("Bill Payment Service")
    }

    async billPayFormLoad(){
        await this.billpayform.waitFor({ state: 'visible', timeout: 2000 });

    }
    async payBill(page,username,address,city,state,code, displayedacctnumber,amount_to_be_paid,newacctnumber){
          await this.payeename.fill(username)
          await this.payeeaddressstreet.fill(address)
          await this.payeeaddresscity.fill(city)
          await this.payeeaddressstate.fill(state)
          await this.payeeaddresszipcode.fill(code.toString())
          await this.payeephonenumber.fill(code.toString())
          await page.evaluate(() => {
                     window.scrollTo(0, document.body.scrollHeight);
            });
          await page.waitForTimeout(3000);
          await this.payeeaccountnumber.fill(displayedacctnumber)
          await this.verifyaccount.fill(displayedacctnumber)
          await this.billamt.fill(amount_to_be_paid.toString())
          await this.frmaccountid.selectOption(newacctnumber);
          await this.sendpayment.click()
          await this.billpayresult.waitFor({ state: 'visible', timeout: 3000 });
          await expect(this.billpayresulttxt).toHaveText("Bill Payment Complete")

    }
    
}
module.exports={BillPayPage}