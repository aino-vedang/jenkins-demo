import { browser, by, element } from 'protractor';

export class AppPage {

  /**
   * Get the button for draw.
   */
  getDrawLabelButton() {
    return element(by.css('.drawLabel'));
  }

  /**
   * Get the div to draw the label.
   */
  getImageAboveDiv(){
    return element(by.css('.image-above-div'));
  }

  /**
   * Get property box.   
   */
  getPropertyBox(){
    return element(by.css('.example-radio-button'));
  }

}
