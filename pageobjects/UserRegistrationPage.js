const { expect } = require('@playwright/test')
class UserRegistrationPage {

    constructor(page) {
        this.page=page
        this.registrationlink = page.locator("a[href='register.htm']")
        this.firstName = page.locator("input[id='customer.firstName']")
        this.lastName = page.locator("input[id='customer.lastName']")
        this.address = page.locator("input[id='customer.address.street']")
        this.city = page.locator("input[id='customer.address.city']")
        this.state = page.locator("input[id='customer.address.state']")
        this.zipcode = page.locator("input[id='customer.address.zipCode']")
        this.phonenumber = page.locator("input[id='customer.phoneNumber']")
        this.ssn = page.locator("input[id='customer.ssn']")
        this.username = page.locator("input[id='customer.username']")
        this.password = page.locator("input[id='customer.password']")
        this.repeatpassword = page.locator("#repeatedPassword")
        this.registerbtn = page.locator("input[value='Register']")
        this.successful_registration=page.locator(".title")
        this.successful_registration_msg=page.locator("#rightPanel p")  
        this.logout_btn=page.locator("a[href='logout.htm']")         
    }
     async navigateToApplication(page, baseURL){
         await page.goto(baseURL)
         await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking')
    }
    async valid_user_registration(page,firstname,lastname,address,city,state,code,username,password) {
        //click the registration link
        await this.registrationlink.click()        
        //registration-first name
        await this.firstName.fill(firstname)
        //registration-last name
        await this.lastName.fill(lastname)
        //registration-address
        await this.address.fill(address)
        //registration-city
        await this.city.fill(city)
        //registration-state
        await this.state.fill(state)
        //registration-zipcode
        await this.zipcode.fill(code.toString())
        //registration-phonenumber
        await this.phonenumber.fill(code.toString())
        //registration-ssn
        await this.ssn.fill(code.toString())
         await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        //registration-username
        await this.username.fill(username)
        //registration-password
        await this.password.fill(password)
        //registration-confirm password
        await this.repeatpassword.fill(password)
        //registration-register button
         await this.registerbtn.click()
         const element4 = this.successful_registration
         await element4.waitFor({ state: 'visible', timeout: 2000 });
         await expect(this.successful_registration).toHaveText("Welcome " + username)
         await expect(this.successful_registration_msg).toHaveText("Your account was created successfully. You are now logged in.")
         
        
    }
    async logout(){
        this.logout_btn.click()
    }
}
module.exports={UserRegistrationPage}