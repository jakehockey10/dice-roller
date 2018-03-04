import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root > clr-main-container > clr-header > div.branding > a > span.title')).getText();
  }
}
