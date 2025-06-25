const { test, expect } = require('@playwright/test')
class LoginPage {

    constructor(page) {
        this.page=page
        this.username=page.locator("input[name='username']")
        this.password= page.locator("input[name='password']")
        this.login_btn= page.locator("input[value='Log In']") 
         
    }
     
    async login(username,password) {
               
        //login-username
        await this.username.fill(username)
        //login-password
        await this.password.fill(password)
        //login button
        await this.login_btn.click()
        
    }
    
}
module.exports={LoginPage}