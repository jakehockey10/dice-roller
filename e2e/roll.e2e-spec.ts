import { RollPage } from './roll.po';

describe('dice-roller Roll', () => {
    let page: RollPage;

    beforeEach(() => {
        page = new RollPage();
    });

    it('should navigate to roll page', () => {
        page.navigateTo();
        // expect(page.getParagraphText()).toEqual('Dice Roller');
    });
});
