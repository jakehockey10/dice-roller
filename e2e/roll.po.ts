import { browser } from 'protractor';

export class RollPage {
    navigateTo() {
        return browser.get('/roll');
    }

    //   getParagraphText() {
    //     return element(by.css('app-root > clr-main-container > clr-header > div.branding > a > span.title')).getText();
    //   }
}
