import { AppPage } from './app.po';
import { browser, element, logging, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.driver.get('http://localhost:4200');
  });

  it('Check Draw button and draw label', async () => {
    page.getDrawLabelButton().click();

    for (let i = 0; i < 2; i++) {
      browser.actions().mouseDown(page.getImageAboveDiv()).perform();
      browser.actions().mouseMove(page.getImageAboveDiv()).mouseMove({ x: 100 + i, y: 100 + i }).perform();
      browser.actions().mouseUp().perform();
      //browser.sleep(1000);
      element.all(by.css('.example-radio-button')).first().click();

    }



    browser.sleep(5000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
