const TodoPage = require("../pages/1-1page");
const { describe, before, after, it } = require('mocha');
let assert;

const handleErrors = (action, handler) => {
    return async () => {
        try {
            await action();
        } catch (error) {
            console.error(error);
            if (handler) {
                await handler();
            }
        }
    };
};

describe("Todo App Tests", function() {
    let todoPage;
    let totalItems = 5;
    let itemsRemaining = 5;

    before(async () => {
        todoPage = new TodoPage();
        ({ assert } = await import('chai'));
        await todoPage.load();
    });

    after(async () => {
        if (todoPage) {
            await todoPage.shutdown();
        }
    });
    

    it("Validates remaining tasks", handleErrors(async () => {
        for (let i = 1; i <= totalItems; i++) {
            const expectedText = `${itemsRemaining} of ${totalItems} remaining`;
            assert.strictEqual(await todoPage.checkRemainingCount(expectedText), true, "Remaining tasks mismatch expected value");
            const active = await todoPage.toggleItem(i);
            assert.isTrue(active, `Item ${i} should be active.`);
            itemsRemaining--;
        }
    }, async () => await todoPage.takeScreenshot('error')));

    it("Adds and validates a new item", handleErrors(async () => {
        const newItemText = "Item Sadikova";
        await todoPage.addNewItem(newItemText);
        totalItems++;
        itemsRemaining++;
        const expectedText = `${itemsRemaining} of ${totalItems} remaining`;
        assert.strictEqual(await todoPage.checkRemainingCount(expectedText), true, "Remaining tasks did not update as expected");
    }, async () => await todoPage.takeScreenshot('error')));
});



