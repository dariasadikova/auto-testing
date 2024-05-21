const { Builder, Browser } = require("selenium-webdriver");

class WebPage {
    constructor() {
        this.driver = new Builder().forBrowser(Browser.CHROME).build();
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
        require("fs").writeFileSync(filename, image, 'base64');
    }

    async shutdown() {
        await this.driver.quit();
    }
}

module.exports = WebPage;
