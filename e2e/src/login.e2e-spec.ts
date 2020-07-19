import { LoginPage } from "./login.po";
import { browser } from 'protractor';
import { timer } from 'rxjs';

const ms = 3000;

describe('signin', () => {

    let loginPage: LoginPage;

    beforeEach(() => {
        loginPage = new LoginPage()
        browser.manage().timeouts().implicitlyWait(1000);
  
    })

    it('should show an error message if user is not found', async () => {

        loginPage.signIn({
            userName: 'bnPjPk7723Ht',
            password: 'isnohype'
        });
        
        let message = loginPage.getMessage()

        expect(message).toEqual('bnPjPk7723Ht has not been registered yet');
    })

})


describe('login', () => {

    let loginPage: LoginPage;

    beforeEach(() => {
        
        loginPage = new LoginPage()})

    it('should show an error message if password is not correct', async () => {

        loginPage.signIn({
            userName: 'tiou',
            password: 'isnohype'
        });
        

        timer(ms).subscribe(x => {  let message = loginPage.getMessage()
            expect(message).toEqual('Wrong password !!!'); })
        
    });

});