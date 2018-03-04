import { browser } from 'protractor';

import { AppPage } from './app.po';

describe('dice-roller App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Dice Roller');
  });

  it('should redirect to login', () => {
    page.navigateTo();
    const currentUrl = browser.driver.getCurrentUrl();
    expect(currentUrl).toMatch(/(http[s]?:\/\/)?([^\/\s]+\/)(.*)\/login/);
  });
});
