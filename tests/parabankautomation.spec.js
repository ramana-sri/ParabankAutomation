const { test, expect } = require('@playwright/test')
const { UserRegistrationPage } = require('../pageobjects/UserRegistrationPage')
const { LoginPage } = require('../pageobjects/LoginPage')
const { OpenNewAccountPage } = require('../pageobjects/OpenNewAccountPage')
const { AccountsOverviewPage } = require('../pageobjects/AccountsOverviewPage')
const { TransferFundsPage } = require("../pageobjects/TransferFundsPage")
const { BillPayPage } = require("../pageobjects/BillPayPage")
const { FindTransactionsPage } = require("../pageobjects/FindTransactionsPage")
const { UpdateContactInfoPage } = require("../pageobjects/UpdateContactInfoPage")
const { RequestLoanPage } = require("../pageobjects/RequestLoanPage")
const { LogoutPage } = require("../pageobjects/LogoutPage")
const testdata = JSON.parse(JSON.stringify(require('../testdata/dataset.json')))
let amount_to_be_paid,displayedacctnumber,username,password,url,newacctnumber;


test('Parabank WebUI test', async ({ page}) => {
    let x = Math.floor((Math.random() * 10000000) + 1);
    let y = Math.floor((Math.random() * 1000) + 1);
    username = testdata.username + y.toString()
    console.log("username:" + username)
    password = testdata.password + y.toString()
    console.log("password:" + password)
    const userRegistrationPage = new UserRegistrationPage(page)
    await userRegistrationPage.navigateToApplication(page,testdata.baseURL)
    await userRegistrationPage.valid_user_registration(page,testdata.firstname, testdata.lastname, testdata.address, testdata.city, testdata.state, testdata.code, username, password)
    await userRegistrationPage.logout()
    const loginPage = new LoginPage(page)
    await loginPage.login(username, password)
    const openNewAccountPage = new OpenNewAccountPage(page)
    await openNewAccountPage.clickOpenNewAccount()
    await openNewAccountPage.verifyNewAccountHeader()
    const accountsOverviewPage = new AccountsOverviewPage(page)
    await accountsOverviewPage.clickAccountsOverview()
    await accountsOverviewPage.verifyAccountsOverviewHeader()
    const transferFundsPage = new TransferFundsPage(page)
    await transferFundsPage.clickTransferFunds()
    await transferFundsPage.verifyTransferFundsHeader()
    const billPayPage = new BillPayPage(page)
    await billPayPage.clickBillPay()
    await billPayPage.verifyBillPayHeader()
    const findTransactionsPage = new FindTransactionsPage(page)
    await findTransactionsPage.clickFindTransactions()
    await findTransactionsPage.verifyFindTransactionsHeader()
    const updateContactInfoPage = new UpdateContactInfoPage(page)
    await updateContactInfoPage.clickUpdateContactInfo()
    await updateContactInfoPage.verifyUpdateContactInfoHeader()
    const requestLoanPage = new RequestLoanPage(page)
    await requestLoanPage.clickRequestLoan()
    await requestLoanPage.verifyRequestLoanHeader()
    const logoutPage = new LogoutPage(page)
    await logoutPage.clickLogoutBtn()
    await logoutPage.verifyLogoutHeader()
    //  Create a Savings account from “Open New Account Page” and capture the account number
    // Login to the application with the user created in step 2.
    await loginPage.login(username, password)
    await openNewAccountPage.clickOpenNewAccount()
    let displayedtext = await openNewAccountPage.verifyOpenNewAccountText()
    console.log("Displayed text on the Open Account Page: " + displayedtext)
    const dollarIndex = displayedtext.indexOf('$');
    const decimalIndex = displayedtext.indexOf('.');
    let expectedamt = displayedtext.substring(dollarIndex, decimalIndex + 3)
    console.log("Expected Amount:", expectedamt)
    displayedacctnumber = await openNewAccountPage.verifyFromAccountID()
    console.log("Displayed Account Number:", displayedacctnumber)
    await openNewAccountPage.clickOpenNewAccountBtn()
    await openNewAccountPage.verifyNewAccountNumberText()
    await openNewAccountPage.verifyNewAccountNumberTextForComparison()
    newacctnumber = await openNewAccountPage.getNewAccountID()
    console.log("New Account Number:", newacctnumber)
    expect(newacctnumber).not.toEqual(displayedacctnumber);
    //6.Validate if Accounts overview page is displaying the balance details as expected.
    await accountsOverviewPage.clickAccountsOverview()
    await accountsOverviewPage.verifyAccountsOverviewHeader()
    const displayedacctnumberbalance = await accountsOverviewPage.displayedAcctBalance()
    const balance = await accountsOverviewPage.currentAcctBalance()
    console.log("Previous Account Number: " + displayedacctnumber + "  Balance: " + displayedacctnumberbalance)
    console.log("New Account Number: " + newacctnumber + "  Balance: " + balance)
    await page.screenshot({ path: 'account_details.png' });
    expect(balance).toEqual(expectedamt)
    //7. Transfer funds from account created in step 5 to another account.
    await transferFundsPage.clickTransferFunds()
    await transferFundsPage.verifytransferpageload()
    await transferFundsPage.selectFromAcctId(newacctnumber);
    await transferFundsPage.selectToAcctId(displayedacctnumber)
    await transferFundsPage.enteramount(testdata.amount.toString())
    await page.screenshot({ path: 'amount_transfer_between_accounts.png' });   
    await transferFundsPage.clickTransferBtn()
    await transferFundsPage.verifyTransferCompletion()
    await page.screenshot({ path: 'amount_transfer_complete.png' });
    let displayed_transferamt_text = await transferFundsPage.verifyTransferAmountText()
    console.log("Transfer details:", displayed_transferamt_text.trim())
       if (Number.isInteger(testdata.amount)) {
             var expected_transferamt_text = "$" + testdata.amount + ".00" + " has been transferred from account #" + newacctnumber + " to account #" + displayedacctnumber + ".";
             }
       else {
             var expected_transferamt_text = "$" + testdata.amount + " has been transferred from account #" + newacctnumber + " to account #" + displayedacctnumber + ".";
             }
             console.log("expected_transferamt_text:" + expected_transferamt_text);
             expect(displayed_transferamt_text.trim()).toEqual(expected_transferamt_text)
         //8. Pay the bill with account created in step 5.             
            await billPayPage.clickBillPay()
            await billPayPage.billPayFormLoad()
            amount_to_be_paid = Math.floor((Math.random() * 10) + 1);
            console.log("Amount to be paid via Bill Pay:" + amount_to_be_paid)
            await billPayPage.payBill(page,username,testdata.address,testdata.city,testdata.state,testdata.code, displayedacctnumber,amount_to_be_paid,newacctnumber)
            await page.screenshot({ path: 'bill payment.png' }) 
            await page.waitForTimeout(5000)  
            })
    
    
    
    test('Parabank find transactions API call test', async({request})=>
    {
        url="https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/"+newacctnumber+"/transactions";
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');
        const authHeader = `Basic ${credentials}`;
        const response = await request.get(url, {
        headers: {
          'Authorization': authHeader,
        },
      });

      expect(response.ok()).toBeTruthy(); 
      const jsonResponse = JSON.parse(JSON.stringify(await response.json()))
      console.log(jsonResponse);
      console.log("Bill Payment Json Response Desciption: "+ jsonResponse[2].description)
      console.log("Bill Payment Amount from Json Response: "+ jsonResponse[2].amount)
      expect (jsonResponse[2].description).toBe("Bill Payment to "+username)
      expect (jsonResponse[2].amount).toBe(amount_to_be_paid)      
    });
       