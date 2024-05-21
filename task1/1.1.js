const assert = require("assert");
const { Builder, Browser, By } = require("selenium-webdriver");

let driver = new Builder().forBrowser(Browser.FIREFOX).build();

const ITEM_XPATH = (i) => `//input[@name='li${i}']/following-sibling::span`;
const ITEM_NAME = (i) => `li${i}`;
const REMAINING_TEXT = "//span[@class='ng-binding']";
const TODO_TEXT_FIELD = By.id('sampletodotext');
const ADD_BUTTON = By.id('addbutton');

let totalItems = 5;
let itemsRemaining = 5;

async function lambdaTest() {
    try {
        await driver.get("https://lambdatest.github.io/sample-todo-app/");
        await driver.manage().window().maximize();
        await driver.sleep(1000);

        for (let i = 1; i <= totalItems; i++) {
            await checkRemainingCount();
            await verifyAndToggleItem(i);
            itemsRemaining--;
        }

        await addNewItem("ItemSadikova");
        await checkNewItem(6, "ItemSadikova");

        await takeScreenshot("ok_screen.png");

        console.log("Все тесты пройдены!");
    } catch (error) {
        console.error(`Тест упал по причине ошибки: ${error}`);
        await takeScreenshot("error_screen.png");
    } finally {
        await driver.quit();
    }
}

async function checkRemainingCount() {
    let remainingElem = await driver.findElement(By.xpath(REMAINING_TEXT));
    let text = await remainingElem.getText();
    assert.strictEqual(text, `${itemsRemaining} of ${totalItems} remaining`);
}

async function verifyAndToggleItem(index) {
    let item = await driver.findElement(By.xpath(ITEM_XPATH(index)));
    let itemClass = await item.getAttribute("class");
    assert.strictEqual(itemClass, "done-false", `Item ${index} initial class should be 'done-false'.`);

    await driver.findElement(By.name(ITEM_NAME(index))).click();
    await driver.sleep(1000);

    itemClass = await item.getAttribute("class");
    assert.strictEqual(itemClass, "done-true", `Item ${index} toggled class should be 'done-true'.`);
}

async function addNewItem(text) {
    await driver.findElement(TODO_TEXT_FIELD).sendKeys(text);
    await driver.findElement(ADD_BUTTON).click();
    await driver.sleep(1000);

    totalItems++;
    itemsRemaining++;
}

async function checkNewItem(index, expectedText) {
    let newItem = await driver.findElement(By.xpath(ITEM_XPATH(index)));
    let newItemClass = await newItem.getAttribute("class");
    let newItemText = await newItem.findElement(By.xpath("..")).getText();
    
    assert.strictEqual(newItemText, expectedText, "New item text does not match.");
    assert.strictEqual(newItemClass, "done-false", "New item class should be 'done-false'.");
}

async function takeScreenshot(filename) {
    let image = await driver.takeScreenshot();
    require("fs").writeFileSync(`${filename}`, image, 'base64');
}

lambdaTest();

