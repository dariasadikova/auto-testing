import WebPage from "./basepage.js";
import { By } from "selenium-webdriver";

const URL = "https://lambdatest.github.io/sample-todo-app/";

class TodoPage extends WebPage {
    constructor() {
        super();
        this.REMAINING_TEXT = By.xpath("//span[@class='ng-binding']");
        this.TODO_TEXT_FIELD = By.id('sampletodotext');
        this.ADD_BUTTON = By.id('addbutton');
    }

    async load() {
        await this.navigate(URL);
    }

    async checkRemainingCount(expected) {
        const text = await this.retrieveText(this.REMAINING_TEXT);
        assert.strictEqual(text, expected, "Remaining count does not match.");
    }

    async toggleItem(index) {
        const xpath = `//input[@name='li${index}']/following-sibling::span`;
        await this.clickElement(By.name(`li${index}`));
        await this.driver.sleep(1000);
        const item = await this.driver.findElement(By.xpath(xpath));
        const itemClass = await item.getAttribute("class");
        return itemClass === "done-true";
    }

    async addNewItem(text) {
        await this.typeText(this.TODO_TEXT_FIELD, text);
        await this.clickElement(this.ADD_BUTTON);
        await this.driver.sleep(1000);
    }
}

export default TodoPage;
