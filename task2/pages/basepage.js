import { Builder, Browser } from "selenium-webdriver";

class WebPage {
  constructor() {
    this.driver = new Builder().forBrowser(Browser.EDGE).build();
    this.driver.manage().window().maximize();
  }

  async navigate(url) {
    await this.driver.get(url);
    await this.driver.sleep(1000);
  }

  async typeText(locator, text) {
    const element = await this.driver.findElement(locator);
    await element.sendKeys(text);
  }

  async retrieveText(locator) {
    const element = await this.driver.findElement(locator);
    return await element.getText();
  }

  async clickElement(locator) {
    const element = await this.driver.findElement(locator);
    await element.click();
  }

  async takeScreenshot(filename) {
    const image = await this.driver.takeScreenshot();
    require("fs").writeFileSync(filename, image, "base64");  // Сохранение скриншота
  }

  async shutdown() {
    await this.driver.quit();
  }
}

export default WebPage;
