import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/login') as Promise<unknown>;
  }

  getMessage(): Promise<string> {
    return element(by.id('message')).getText() as Promise<string>;
  }

  

  signIn({userName, password}) {
     element(by.name('username')).sendKeys(userName);
     element(by.name('password')).sendKeys(password);
     element(by.id('signIn')).click();
}
}
